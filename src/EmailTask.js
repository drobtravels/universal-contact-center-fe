import React, { Component } from 'react'
import { WithReplyForm } from './WithReplyForm'
import { FormGroup, ControlLabel, FormControl, ButtonGroup, Button } from 'react-bootstrap'

class EmailTaskComp extends Component {
  static propTypes = {
    fromEmail: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    subject: React.PropTypes.string.isRequired,
    completeTask: React.PropTypes.func.isRequired,
    replyButton: React.PropTypes.element.isRequired,
    replyForm: React.PropTypes.element
  }

  render() {
    return(<form>
      <FormGroup>
        <ControlLabel>From</ControlLabel>
        <FormControl.Static>{this.props.fromEmail}</FormControl.Static>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Subject</ControlLabel>
        <FormControl.Static>{this.props.subject}</FormControl.Static>
      </FormGroup>
      <FormGroup controlId="formControlsEmail">
        <ControlLabel>Message</ControlLabel>
        <FormControl.Static
          componentClass="textarea"
          value={this.props.message}
          readOnly />
      </FormGroup>
      <ButtonGroup>
        {this.props.replyButton}
        <Button bsStyle='warning' onClick={this.props.completeTask} >
          Complete w/o Reply
        </Button>
      </ButtonGroup>
      { this.props.replyForm }
    </form>)
  }
}

export var EmailTask = WithReplyForm(EmailTaskComp)
