import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class EditIconForm extends React.Component {

  state = {
    url: ''
  }

  handleChange = (e) => {this.setState({url: e.target.value})}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.updateIcon(this.state.url)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Link to new URL:</label>
          <input onChange={this.handleChange} placeholder='link goes here...'></input>
        </Form.Field>
        <Button type='submit'>Update My Icon</Button>
      </Form>
    )
  }

}

  export default EditIconForm
