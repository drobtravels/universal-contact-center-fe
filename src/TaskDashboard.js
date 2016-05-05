import React, { Component } from 'react';
import { Panel, Button, Col, Row } from 'react-bootstrap';

class Task extends Component {
  static propTypes = {
    sid: React.PropTypes.string.isRequired,
    attributes: React.PropTypes.object.isRequired,
    completeTask: React.PropTypes.func.isRequired
  }

  render() {
    console.log(this.props.attributes);
    return(
      <Panel header={<h3>{this.props.attributes.type}</h3>}>
        <Row>
          <span>Working on task {this.props.sid}</span>
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

  completeTask = () => {

  }

  render() {
    if(this.props.task) {
      return(<Task {...this.props.task} completeTask={this.props.completeTask} />);
    } else {
      return(null);
    }
  }
}
