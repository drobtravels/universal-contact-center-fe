import React, { Component } from 'react';
import { RequireAuthentication } from './RequireAuthentication';
import { ConnectToTwilio } from './ConnectToTwilio';
import { AppNavbar } from './AppNavbar';
import { TaskRouterToggle } from './TaskRouterToggle';
import { ReservationHandler } from './ReservationHandler';
import { TaskDashboard } from './TaskDashboard';
import { IdleSpinner } from './IdleSpinner';
import { Col } from 'react-bootstrap';

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
        <AppNavbar signOut={this.props.signOut} workerData={this.props.workerData} />
        <Col xsOffset={2} xs={8}>
          <ReservationHandler workerAPI={this.props.workerAPI} />
          <TaskDashboard task={this.props.task} />
          <IdleSpinner workerData={this.props.workerData} />
        </Col>
      </div>
    );
  }
}

export var Dashboard = RequireAuthentication(ConnectToTwilio(DashboardComp))
