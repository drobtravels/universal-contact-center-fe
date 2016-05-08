import React, { Component } from 'react';
import { Panel, Button, Col, Row } from 'react-bootstrap';
import { typeDescriptions } from './typeDescriptions';
import { SmsMessageTask } from './SmsMessageTask';
import { EmailTask } from './EmailTask';

class Task extends Component {
  static propTypes = {
    sid: React.PropTypes.string.isRequired,
    attributes: React.PropTypes.object.isRequired,
    completeTask: React.PropTypes.func.isRequired
  }

  taskSpecificComponents = () => {
    if(this.props.attributes.type === 'sms_message') {
      return(<SmsMessageTask {...this.props.attributes} />)
    } else if (this.props.attributes.type === 'email') {
      return(<EmailTask {...this.props.attributes} />)
    } else {
      return(null)
    }
  }
  render() {
    return(
      <Panel header={<h3>{typeDescriptions[this.props.attributes.type]}</h3>}>
        <Row>
          <span>Working on task {this.props.sid}</span>
        </Row>
        <Row>
          {this.taskSpecificComponents()}
        </Row>
        <Row>
          <Button bsStyle='success' onClick={this.props.completeTask} >
            Complete Task
          </Button>
        </Row>
      </Panel>
    )
  }
}

export class TaskDashboard extends Component {
  static propTypes = {
    completeTask: React.PropTypes.func.isRequired,
    task: React.PropTypes.object
  }

  render() {
    if(this.props.task) {
      return(<Task {...this.props.task} completeTask={this.props.completeTask} />);
    } else {
      return(null);
    }
  }
}
