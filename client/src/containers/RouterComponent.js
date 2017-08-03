import React, { Component } from 'react'
import LoginComponent from '../components/facebooklogin';
import NavBar from './NavBar'
import { Switch, Route, BrowserRouter, Redirect, withRouter } from 'react-router-dom'
import Auth from '../components/Auth/AuthAdapter'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
const {fetchEvents, allUsers, currentUser} = actions

class RouterComponent extends React.Component {

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
          this.props.history.push('/events')
          window.location.reload()
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

  getLocation = () => {
     if (this.state.auth.loggedIn) {
       if (!this.props.history)
         return <Redirect to={'/events'}/>
       return <Redirect to={this.props.history.location.pathname}/>
     } else {
       <Redirect to={'/login'}/>
     }
   }

  render() {
    return (
      <div>
        {this.getLocation()}
        <Switch>
          <Route exact path='/login' render={() => <div className='scrolling-background' ><LoginComponent response={this.responseFacebook}/></div>} />
          <div className='parallax'><Route path='/' render={() => <NavBar logout={this.logout} user={this.props.currentUser} loggedIn={this.state.loggedIn}/>}></Route></div>
        </Switch>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents: fetchEvents, allUsers: allUsers, currentUser: currentUser}, dispatch)
}

function mapStateToProps (state) {
  return {currentUser: state.usersReducer.currentUser}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouterComponent))
