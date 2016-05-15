import React, { Component } from 'react';
import { RequireAuthentication } from './RequireAuthentication';
import { ConnectToTwilio } from './ConnectToTwilio';
import { AppNavbar } from './AppNavbar';
import { TaskRouterToggle } from './TaskRouterToggle';
import { ReservationHandler } from './ReservationHandler';
import { TaskDashboard } from './TaskDashboard';
import { IdleSpinner } from './IdleSpinner';
import { CallControls } from './CallControls';
import { Col } from 'react-bootstrap';

class DashboardComp extends Component {
  static propTypes = {
    signOut: React.PropTypes.func.isRequired,
    idToken: React.PropTypes.string.isRequired,
    workerData: React.PropTypes.object.isRequired,
    workerAPI: React.PropTypes.object.isRequired,
    completeTask: React.PropTypes.func.isRequired,
    activitySids: React.PropTypes.object.isRequired,
    makeOutgoingCall: React.PropTypes.func.isRequired,
    phone: React.PropTypes.object,
    task: React.PropTypes.object
  };

  render() {
    return(
      <div>
        <AppNavbar signOut={this.props.signOut} workerData={this.props.workerData} activitySids={this.props.activitySids} />
        <Col xsOffset={2} xs={8}>
          <ReservationHandler workerAPI={this.props.workerAPI} />
          <TaskDashboard task={this.props.task} completeTask={this.props.completeTask} makeOutgoingCall={this.props.makeOutgoingCall} />
          <IdleSpinner workerData={this.props.workerData} />
        </Col>
        <Col xs={2}>
          <CallControls phone={this.props.phone} />
        </Col>
      </div>
    );
  }
}

export var Dashboard = RequireAuthentication(ConnectToTwilio(DashboardComp))
