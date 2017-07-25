import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import EventContainer from './containers/EventContainer'
import LoginComponent from './components/facebooklogin';
import NavBar from './containers/NavBar'
import Auth from './components/Auth/AuthAdapter'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
const {fetchEvents} = actions

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
    this.authorize()
    this.props.fetchEvents()
  }

  authorize() {
    Auth.currentUser().then(res => {
      if (!res.error) {
        console.log(res)
        this.setState({
          auth: {
            loggedIn: true,
            user: res
          }
        })
      }
    })
  }

  responseFacebook = (response) => {
    console.log(response)
    let createUser = {user: response}
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(createUser)
    })
    this.login(response.userID)
  }

  login = (loginParams) => {
      Auth.login(loginParams)
      .then(user => {
        if (!user.error) {
          this.setState({
            auth: {loggedIn: true, user: user}
          })
          localStorage.setItem("jwt", user.jwt)
          console.log('loggedin')
        }
      })
    }

    logout = () => {

    localStorage.removeItem("jwt")
    this.setState({
      auth: {loggedIn: false, user: {}}
    })
    console.log(this.state.auth)
  }

  render() {
    return (
      <BrowserRouter>
        <div className='parallax'>
          <Route exact path='/' render={() => <LoginComponent response={this.responseFacebook}/>} />
          <Route path='/events' render={() => <NavBar logout={this.logout} />} />
        </div>
      </BrowserRouter>

    );
  }
}

function mapStateToProps (state) {
  return state.events
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents: fetchEvents}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
