import React from 'react'
import { Form, Button } from 'semantic-ui-react'

export default class Signup extends React.Component {
  constructor() {
    super()

    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      password_confirmation: ""
    }
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name...' />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder='email...' />
        </Form.Field>
        <Form.Field>
          <label>Username</label>
          <input placeholder='username...' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='password...' />
        </Form.Field>
        <Form.Field>
          <label>Password confirmation</label>
          <input placeholder='confirmation...' />
        </Form.Field>
        <Button type='submit'>Signup!</Button>
      </Form>
    )
  }

}
