import React from 'react'
import { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Signin from './auth/signin'
import Signout from './auth/signout'
import Signup from './auth/signup'
import Feature from './feature'
import RequireAuth from './auth/require_auth'
import Header from './header'

export default class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route path='/' component={Header} />
          <Route path='/signin' component={Signin} />
          <Route path='/signout' component={Signout} />
          <Route path='/signup' component={Signup} />
          <Route path='/feature' component={RequireAuth(Feature)} />
        </div>
      </Router>
    )
  }
}
