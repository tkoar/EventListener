import React from 'react'
import { Button, Form } from 'semantic-ui-react'

class EditIconForm extends React.Component {

  state = {
    bio: ''
  }

  handleChange = (e) => this.setState({bio: e.target.value})

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.updateBio(this.state.bio)
    this.setState({bio: ''})
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <Button fluid style={{backgroundColor: '#383F51', color: '#fff'}} type='submit'>Update Your Bio Here</Button>
          <input onChange={this.handleChange} value={this.state.bio} placeholder='Bio goes here...'></input>
        </Form.Field>
      </Form>
    )
  }

}

  export default EditIconForm
