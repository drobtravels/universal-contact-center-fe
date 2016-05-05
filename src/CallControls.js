import React, { Component } from 'react';
import { Panel, Button, Glyphicon, Row } from 'react-bootstrap';

export class CallControls extends Component {
  static propTypes = {
    phone: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = { muted: false }
  }

  muteToggle = () => {
    var newMuteStatus = !this.state.muted
    this.props.phone.mute(newMuteStatus)
    this.setState({ muted: newMuteStatus})
  }

  hangnup = () => {
    this.props.phone.disconnect()
  }
  render() {
    if(this.props.phone) {
      var muteButtonText
      if(this.state.muted) {
        muteButtonText = 'Unmute'
      } else {
        muteButtonText = 'Mute'
      }
      return(
        <Panel header="On Call">
          <Button
            bsStyle='danger'
            onClick={this.hangnup}
            block>
              <Glyphicon glyph='phone-alt'>
                Hangup
              </Glyphicon>
          </Button>
          <Button
            bsStyle='warning'
            onClick={this.muteToggle}
            block>
              {muteButtonText}
          </Button>
        </Panel>
      );
    } else {
      return(null);
    }
  }
}
