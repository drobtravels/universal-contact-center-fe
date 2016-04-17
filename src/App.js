import React, { Component } from 'react';
import { Dashboard } from './Dashboard';
import { Grid } from 'react-bootstrap';
import { AppNavbar } from './AppNavbar';


export class App extends Component {

  render() {
    return (
      <div>
        <Grid>
          <Dashboard />
        </Grid>
      </div>
    );
  }
}
