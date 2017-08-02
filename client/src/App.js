import React, { Component } from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import LoginComponent from './components/facebooklogin';
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

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.fetchEvents()
    this.props.allUsers()
    this.authorize()
  }

  authorize() {
    Auth.currentUser().then(res => {
      this.props.currentUser(res)
      if (!res.error) {
        this.setState({
          auth: {
            loggedIn: true,
            user: res
          }
        })
      }
    })
  }


  responseFacebook = (location, response) => {
    let createUser = {user: response, location: location}
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(createUser)
    })
    this.login(response)
  }

  login = (loginParams) => {
      Auth.login(loginParams)
      .then(user => {
        if (!user.error) {
          this.setState({
            loggedIn: true,
            auth: {loggedIn: true, user: user}
          })
          localStorage.setItem("jwt", user.jwt)
        }
      })
    }

  logout = () => {
    localStorage.removeItem("jwt")
    this.setState({
      loggedIn: true,
      auth: {loggedIn: false, user: {}}
    })
  }

  render() {
    console.log(this.props.currentUser, this.props.events)
    return (
      <BrowserRouter>
        <div>
          <div>{this.state.auth.loggedIn && <Redirect to='/events'/>}</div>
          <Switch>
            <Route exact path='/' render={() => <div className='scrolling-background' ><LoginComponent response={this.responseFacebook}/></div>} />
            <div className='parallax'><Route path='/' render={() => <NavBar logout={this.logout} user={this.props.currentUser} />}></Route></div>
          </Switch>
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
