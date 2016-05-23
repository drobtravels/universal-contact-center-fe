import React, { Component } from 'react';
import { API } from './api';

export var ConnectToTwilio = ComposedComponent => class extends Component {
  static displayName = 'ConnectToTwilioWrapper'
  static propTypes = {
    idToken: React.PropTypes.string.isRequired,
    signOut: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { worker: null, task: null, activitySids: {} };
  }

  updateWorkerData = (worker) => {
    this.setState({ workerData: worker });
  }

  setupWorker = (token) => {
    var worker = new Twilio.TaskRouter.Worker(token)
    this.setState({workerAPI: worker });
    worker.on('ready', this.updateWorkerData);
    worker.on('activity.update', this.updateWorkerData);
    worker.on('attributes.update', this.updateWorkerData);
    worker.on('token.expired', (worker) => {
      API.getTokens(this.props.idToken).then((tokens) => {
        worker.updateToken(tokens.taskRouter);
      })
    })
    worker.on('reservation.accepted', (reservation) => {
      console.log('reservation accepted');
      this.setState({task: reservation.task});
    })
    this.loadActivitySids(worker);
  }

  loadActivitySids = (worker) => {
    worker.activities.fetch( (error, activities) => {
      if(error) {
        console.log(err);
      }
      else {
        this.setState({ activitySids: activities.data.reduce((sids, activity) => {
            sids[activity.friendlyName] = activity.sid
            return(sids)
          }, {})
        });
      }
    })
  }

  setupTwilioClient = (token) => {
    Twilio.Device.ready( () => console.log('connected to Twilio Client'));
    Twilio.Device.incoming( (connection) => {
      console.log('Receiving incoming call from Twilio Client');
      connection.accept();
    });
    Twilio.Device.connect( (connection) => this.setState({connection: connection }))
    Twilio.Device.disconnect( (connection) => this.setState({connection: null }))
    Twilio.Device.setup(token, {debug: true})
  }

  componentDidMount() {
    API.getTokens(this.props.idToken)
    .then((tokens) => {
      this.setupWorker(tokens.taskRouter);
      this.setupTwilioClient(tokens.twilioClient);
    }, (error) => {
      if(error.response.status === 401) {
        this.props.signOut();
      }
    });
  }

  sendReply = (reply) => {
    console.log('replying to task with ', reply)
    if (this.state.task.attributes.type === 'sms_message') {
      API.postSMS({
        phone: this.state.task.attributes.fromPhone,
        message: reply
      }, this.props.idToken)
    } else if (this.state.task.attributes.type === 'email') {
      API.postEmail({
        email: this.state.task.attributes.fromEmail,
        subject: 'RE: ' + this.state.task.attributes.subject,
        message: reply
      }, this.props.idToken)
    } else {
      console.warn('Attempted to reply to an unspported task type', this.state.task.attributes.type)
    }

  }

  completeTask = (params) => {
    // hangup any current calls
    if(this.state.connection) {
      this.state.connection.disconnect()
    }

    // send a reply if desired
    if(params && params.reply) {
      this.sendReply(params.reply)
    }

    // clear current task
    this.setState({ task: null })

    // update task router activity
    this.state.workerAPI.update({ ActivitySid: this.state.activitySids['Idle']}, (error, worker) => {
      if(error) {
        console.error(error)
      } else {
        console.log('Updated worker activity to Idle')
      }
    })
  }

  makeOutgoingCall = () => {
    var attributes = this.state.task.attributes
    if ( attributes.type !== 'sms_message' ) {
      console.error('Cannot callback type of task ' + attributes.type)
      return;
    }
    console.log('dialing out to ', attributes.fromPhone)
    Twilio.Device.connect({ phone: attributes.fromPhone })
  }

  render() {
    if (this.state.workerData) {
      return (
        <ComposedComponent {...this.props}
          workerData={this.state.workerData}
          workerAPI={this.state.workerAPI}
          task={this.state.task}
          phone={this.state.connection}
          completeTask={this.completeTask}
          makeOutgoingCall={this.makeOutgoingCall}
          activitySids={this.state.activitySids} />
      );
    } else {
      return ( <span>Connecting to Twilio... </span> );
    }
  }
};
