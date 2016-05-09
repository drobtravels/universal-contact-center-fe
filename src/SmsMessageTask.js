import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Glyphicon, Button, ButtonGroup } from 'react-bootstrap';

class ReplyForm extends Component {

  constructor(props) {
    super(props);
    this.state = { replyText: '' }
  }

  setText = (event) => {
    this.setState({ replyText: event.target.value })
  }

  onSend = () => {
    this.props.completeTask({ reply: this.state.replyText })
  }

  render() {
    return(<div>
      <FormGroup>
        <ControlLabel>Reply</ControlLabel>
        <FormControl componentClass="textarea" onChange={this.setText} />
      </FormGroup>
      <Button onClick={this.onSend}>
        <Glyphicon glyph="send"> Send & Complete</Glyphicon>
      </Button>
    </div>)
  }
}

export class SmsMessageTask extends Component {
  static propTypes = {
    From: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    completeTask: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { showReplyForm: false }
  }

  onToggleReply = () => {
    this.setState({ showReplyForm: !this.state.showReplyForm })
  }

  onCall = () => {
    // TODO
  }

  render() {
    var replyForm
    var replyToggleText = 'Reply'
    if (this.state.showReplyForm) {
      replyForm = <ReplyForm completeTask={this.props.completeTask} />
      replyToggleText = 'Hide'
    }

    return(<form>
      <FormGroup>
        <ControlLabel>From</ControlLabel>
        <FormControl.Static>{this.props.From}</FormControl.Static>
      </FormGroup>
      <FormGroup controlId="formControlsEmail">
        <ControlLabel>Message</ControlLabel>
        <FormControl.Static
          componentClass="textarea"
          value={this.props.message}
          readOnly />
      </FormGroup>
      <ButtonGroup>
        <Button bsStyle="primary" onClick={this.onToggleReply}>
          <Glyphicon glyph="comment"> {replyToggleText}</Glyphicon>
        </Button>
        <Button bsStyle="info" onClick={this.onCall}>
          <Glyphicon glyph="earphone"> Call</Glyphicon>
        </Button>
      </ButtonGroup>
      { replyForm }
    </form>)
  }
}
