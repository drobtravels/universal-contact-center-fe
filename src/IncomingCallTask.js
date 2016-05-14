import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class IncomingCallTask extends Component {
  static propTypes = {
    caller_name: React.PropTypes.string,
    from: React.PropTypes.string.isRequired,
    completeTask: React.PropTypes.func.isRequired
  }

  render() {
    return(
      <div>
        <h5>{ 'On Call With ' + ( this.props.caller_name || this.props.from) }</h5>
        <Button bsStyle='success' onClick={this.props.completeTask} >
          Complete and End Call
        </Button>
      </div>
    )
  }
}
