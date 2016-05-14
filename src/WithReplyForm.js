import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap'

class ReplyForm extends Component {
  static propTypes = {
    completeTask: React.PropTypes.func.isRequired
  }

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

let ReplyFormWrapper = (props) => {
  if(props.show) {
    return(<ReplyForm {...props}/>)
  } else {
    return(null)
  }
}

let ReplyButton = (props) => {
  return(
    <Button onClick={props.onClick} bsStyle="primary">
      <Glyphicon glyph="comment">
        { props.show ? ' Hide' : ' Reply' }
      </Glyphicon>
    </Button>
  )
}

export var WithReplyForm = (ComposedComponent) => class extends Component {
  static displayName = 'WithReplyFormWrapper'
  static propTypes = {
    completeTask: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { showReplyForm: false }
  }

  onToggle = () => {
    this.setState({ showReplyForm: !this.state.showReplyForm })
  }

  render() {
    return(
      <ComposedComponent {...this.props}
        replyButton={<ReplyButton onClick={this.onToggle} show={this.state.showReplyForm} />}
        replyForm={<ReplyFormWrapper show={this.state.showReplyForm} {...this.props}/>}
        />
    )
  }
}
