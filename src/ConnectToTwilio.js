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
    if (this.state.workerData) {
      return <ComposedComponent {...this.props} workerData={this.state.workerData} workerAPI={this.state.workerAPI} />;
    } else {
      return ( <span>Connecting to Twilio... </span> );
    }
  }
};
