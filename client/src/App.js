import React, { Component } from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import LoginComponent from './components/facebooklogin';
import RouterComponent from './containers/RouterComponent'
import NavBar from './containers/NavBar'
import Auth from './components/Auth/AuthAdapter'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
const {fetchEvents, allUsers, currentUser} = actions

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      auth: {
        loggedIn: false,
        user: {}
      }
    }
  }

  componentWillMount() {
    this.props.fetchEvents()
    this.props.allUsers()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <RouterComponent loggedIn={this.state.auth.loggedIn}/>
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps (state) {
  return {events: state.events.events, currentUser: state.usersReducer.currentUser}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents: fetchEvents, allUsers: allUsers, currentUser: currentUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
