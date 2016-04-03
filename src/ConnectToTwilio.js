import React, { Component } from 'React';
import { API } from './api';

export var ConnectToTwilio = ComposedComponent => class extends Component {
  static propTypes = {
    idToken: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { worker: null };
  }

  updateWorker = (worker) => {
    this.setState({ worker: worker });
  }

  setupWorker = (token) => {
    var worker = new Twilio.TaskRouter.Worker(token)
    worker.on('ready', this.updateWorker);
    worker.on('activity.update', this.updateWorker);
    worker.on('attributes.update', this.updateWorker);
    worker.on('token.expired', (worker) => {
      API.getTokens(this.props.idToken).then((tokens) => {
        worker.updateToken(tokens.taskRouter);
      })
    })
  }

  setupTwilioClient = (token) => {

  }

  componentDidMount() {
    API.getTokens(this.props.idToken).then((tokens) => {
      this.setupWorker(tokens.taskRouter);
      this.setupTwilioClient(tokens.twilioClient);
    });
  }

  render() {
    if (this.state.worker) {
      return <ComposedComponent {...this.props} taskWorker={this.state.worker} />;
    } else {
      return ( <span>Connecting to Twilio... </span> );
    }
  }
};
