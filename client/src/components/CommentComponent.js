import React from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

class Comment extends React.Component {

  state = {
    comment: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.submitComment(this.state.comment)
    this.setState({[e.target.id]: ''})
  }

  render() {
    return (
      <Form>
        <Form.Field id='comment' control={TextArea} label='Leave a comment here:' placeholder='Add your comments here...' value={this.state.comment} onChange={this.handleChange}/>
        <Form.Field id='comment' fluid style={{backgroundColor: '#383F51', color: '#fff'}} control={Button} content='Submit Comment' onClick={this.handleSubmit}/>
       </Form>
    )
  }

}

export default Comment
