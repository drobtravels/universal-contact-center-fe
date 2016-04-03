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

  setupWorker = (token) => {
    this.setState({
      worker: new Twilio.TaskRouter.Worker(token)
    });
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
