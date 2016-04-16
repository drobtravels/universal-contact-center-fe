import React, { Component } from 'React';
import { API } from './api';

export var ConnectToTwilio = ComposedComponent => class extends Component {
  static propTypes = {
    idToken: React.PropTypes.string.isRequired,
    signOut: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { worker: null, task: null };
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
  }

  setupTwilioClient = (token) => {
    Twilio.Device.ready( () => console.log('connected to Twilio Client'));
    Twilio.Device.incoming( (connection) => {
      console.log('Receiving incoming call from Twilio Client');
    });
    Twilio.Device.connect( (connection) => this.setState({connection: connection }))
    Twilio.Device.setup(token)
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

  render() {
    if (this.state.workerData) {
      return (
        <ComposedComponent {...this.props}
          workerData={this.state.workerData}
          workerAPI={this.state.workerAPI}
          task={this.state.task}
          connection={this.state.connection} />
      );
    } else {
      return ( <span>Connecting to Twilio... </span> );
    }
  }
};
