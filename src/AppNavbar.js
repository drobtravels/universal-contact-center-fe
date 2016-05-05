import React, { Component } from 'react';
import { Navbar, Row, NavItem, Nav } from 'react-bootstrap';
import { TaskRouterToggle } from './TaskRouterToggle';

function SignedOutNav(props) {
  return(
    <Navbar.Text pullRight>
      Logged Out
    </Navbar.Text>
  );
}

function SignedInNav(props) {
  return(
    <Nav pullRight>
      <NavItem>
        Task Router Status: {props.workerData.activityName}
      </NavItem>
      <NavItem>
        <TaskRouterToggle taskWorker={props.workerData} workerAPI={props.workerData.workspace} />
      </NavItem>
      <NavItem pullRight onClick={props.signOut}>
        Sign Out
      </NavItem>
    </Nav>
  );
};

export class AppNavbar extends Component {
  static propTypes = {
    signOut: React.PropTypes.func,
    workerData: React.PropTypes.object
  }

  navItems = () => {
    if(this.props.workerData) {
      return <SignedInNav {...this.props} />;
    } else {
      return <SignedOutNav {...this.props} />;
    }
  }
  render() {
    return(
      <Row>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Universal Contact Center
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            { this.navItems() }
          </Navbar.Collapse>
        </Navbar>
      </Row>
    );
  }
}
