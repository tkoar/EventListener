import React from 'react'
import { Button, Form } from 'semantic-ui-react'

class EditIconForm extends React.Component {

  state = {
    url: ''
  }

  handleChange = (e) => this.setState({url: e.target.value})

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.updateIcon(this.state.url)
    this.setState({url: ''})
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <Button fluid style={{backgroundColor: '#383F51', color: '#fff'}} type='submit'>Paste Link To Update Your Icon</Button>
          <input onChange={this.handleChange} value={this.state.url} placeholder='link goes here...'></input>
        </Form.Field>
      </Form>
    )
  }

}

  export default EditIconForm
