import React, { Component } from 'react';

class Task extends Component {
  static propTypes = {
    sid: React.PropTypes.string.isRequired,
    attributes: React.PropTypes.object.isRequired
  }

  render() {
    console.log(this.props.attributes);
    return(
      <div>
        <p>Working on task {this.props.sid}</p>
      </div>
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
      return(<div/>);
    }
  }
}
