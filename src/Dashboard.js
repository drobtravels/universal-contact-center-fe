import React, { Component } from 'react';
import { RequireAuthentication } from './RequireAuthentication';
import { ConnectToTwilio } from './ConnectToTwilio';
import { TaskRouterToggle } from './TaskRouterToggle';
import { ReservationHandler } from './ReservationHandler'
import { TaskDashboard } from './TaskDashboard'

class DashboardComp extends Component {
  static propTypes = {
    signOut: React.PropTypes.func.isRequired,
    idToken: React.PropTypes.string.isRequired,
    workerData: React.PropTypes.object.isRequired,
    workerAPI: React.PropTypes.object.isRequired,
    task: React.PropTypes.object
  };

  render() {
    return(
      <div>
        <p>
          <span>Task Router Status: </span>
          <span>{this.props.workerData.activityName}</span>
        </p>
        <ReservationHandler workerAPI={this.props.workerAPI} />
        <TaskDashboard task={this.props.task} />
        <TaskRouterToggle taskWorker={this.props.workerData} />
        <span>  |  </span>
        <a href='' onClick={this.props.signOut}>Sign Out</a>
      </div>
    );
  }
}

export var Dashboard = RequireAuthentication(ConnectToTwilio(DashboardComp))
