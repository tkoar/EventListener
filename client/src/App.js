import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import connect from 'react-redux'
import MapAvatars from './components/MapAvatars'
import Login from './containers/Login'
import EventContainer from './containers/EventContainer'
import LoginComponent from './components/facebooklogin';
import NavBar from './containers/NavBar'
import Auth from './components/Auth/AuthAdapter'
import * as actions from './actions'

class App extends Component {
  constructor() {
    super()

    this.state = {
      welcome: true,
      loggedIn: false
    }
    actions.fetchEvents()
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
    // work in Auth Login here by sending over the userID
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



//sending down the prop as a callback is what causes the 2 second delay in the beginning when you refresh the app. to fix this move the fb login Component up here
  render() {
    return (
      <div className='parallax'>
        <Switch>
          <Route exact path='/' render={() => <LoginComponent response={this.responseFacebook}/>} />
          <Route path='/home' render={() => <NavBar />} />
        </Switch>
        <Route path='/events/:eventId' render={() => <EventContainer />} />
      </div>
    );
  }
}

export default App;
