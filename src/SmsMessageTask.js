import React, { Component } from 'react'
import { WithReplyForm } from './WithReplyForm'
import { FormGroup, ControlLabel, FormControl, Glyphicon, Button, ButtonGroup } from 'react-bootstrap'

class SmsMessageTaskClass extends Component {
  static propTypes = {
    From: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    completeTask: React.PropTypes.func.isRequired,
    makeOutgoingCall: React.PropTypes.func.isRequired,
    replyButton: React.PropTypes.element.isRequired,
    replyForm: React.PropTypes.element
  }

  render() {
    return(<form>
      <FormGroup>
        <ControlLabel>From</ControlLabel>
        <FormControl.Static>{this.props.From}</FormControl.Static>
      </FormGroup>
      <FormGroup controlId="formControlsEmail">
        <ControlLabel>Message</ControlLabel>
        <FormControl
          componentClass="textarea"
          value={this.props.message}
          readOnly />
      </FormGroup>
      <ButtonGroup>
        {this.props.replyButton}
        <Button bsStyle="info" onClick={this.props.makeOutgoingCall}>
          <Glyphicon glyph="earphone"> Call</Glyphicon>
        </Button>
        <Button bsStyle='warning' onClick={this.props.completeTask} >
          Complete w/o Reply
        </Button>
      </ButtonGroup>
      { this.props.replyForm }
    </form>)
  }
}

export var SmsMessageTask = WithReplyForm(SmsMessageTaskClass)
