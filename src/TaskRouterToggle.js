import React, { Component } from 'react';
import { find } from 'lodash';
import { Button } from 'react-bootstrap';

export class TaskRouterToggle extends Component {

  static propTypes = {
    taskWorker: React.PropTypes.object.isRequired,
    activitySids: React.PropTypes.object.isRequired
  };

  isOffline = () => {
    return(this.props.taskWorker.activityName === 'Offline');
  }

  buttonText = () => {
    if(this.isOffline()) {
      return('Go Online');
    } else {
      return('Go Offline');
    }
  }

  toggle = () => {
    var newActivity;
    if(this.isOffline()) {
      newActivity = 'Idle';
    } else {
      newActivity = 'Offline';
    }
    var activitiySid = this.props.activitySids[newActivity]
    console.log('setting worker to ', newActivity, activitiySid);
    this.props.taskWorker.update('ActivitySid', activitiySid);
  }

  render() {
    if(this.isOffline()) {
      return(
        <Button onClick={this.toggle} bsStyle='primary'>
          Go Online
        </Button>
      );
    } else {
      return(
        <Button onClick={this.toggle} bsStyle='danger'>
          Go Offline
        </Button>
      );
    }
  }
}
