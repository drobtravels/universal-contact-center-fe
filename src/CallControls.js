import React, { Component } from 'react';
import { Panel, Button, Glyphicon, Row } from 'react-bootstrap';

export class CallControls extends Component {
  static propTypes = {
    phone: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = { muted: props.phone && props.phone.isMuted() }
  }

  componentWillMount() {
    if(this.props.phone) {
      this.props.phone.mute( (muted) => {
        this.setState({ muted: muted });
      })
    }
  }

  muteToggle = () => {
    this.props.phone.mute(!this.state.muted)
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
            onClick={this.props.phone.disconnect}
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
