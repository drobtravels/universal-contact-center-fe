import React, { Component } from 'react';
import { Panel, Button, Col, Row } from 'react-bootstrap';

class Task extends Component {
  static propTypes = {
    sid: React.PropTypes.string.isRequired,
    attributes: React.PropTypes.object.isRequired
  }

  render() {
    console.log(this.props.attributes);
    return(
      <Panel header={<h3>{this.props.attributes.type}</h3>}>
        Working on task {this.props.sid}
      </Panel>
    )
  }
}

export class TaskDashboard extends Component {
  static propTypes = {
    task: React.PropTypes.object
  }

  render() {
    if(this.props.task) {
      return(<Task {...this.props.task} />);
    } else {
      return(null);
    }
  }
}
