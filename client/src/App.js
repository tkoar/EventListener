import React, { Component } from 'react'
import connect from 'react-redux'
import { Switch, Route } from 'react-router'
import MapAvatars from './components/MapAvatars'
import Login from './containers/Login'
import FacebookLogin from 'react-facebook-login';
import NavBar from './containers/NavBar'

class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedIn: false
    }
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
    this.setState({loggedIn: true})
  }

  render() {
    return (
      <div className='parallax'>
        {this.state.loggedIn ?
          <NavBar /> :
          <FacebookLogin
          textButton="Login with Facebook"
          //need to set appId to be an environment variable
          appId="301958890275001"
          autoLoad={true}
          fields="name,email,picture,events"
          scope="public_profile,user_events,rsvp_event,email"
          callback={this.responseFacebook}
          cssClass='button'
          />
        }
      </div>
    );
  }
}

export const fetchEvents = () => {
  const events = fetch('http://localhost:3000/api/v1/events')

}

export default App;

{/* Object {name: "Terrance Koar", email: "terrancekoar@gmail.com", picture: Object, events: Object, id: "10155705649364155"…}
accessToken
:
"EAAESoUhkQLkBAP9dXWMZBGbNtDtDj6iFP8aZAlgpaFzK5LtmIcyW2xYCbW16niwec1OxdS54R8LurJdutrF9kHqx1L168mTrQ74MvSqNhhNJ1hTd0NmtYjMx6zFxIDqKfC4UYriyTZCBQvWK2VNi1UUJvRZCmzMvvcYM2qSh7zkNJ52HA6eDhuPYgrNDVl8ZD"
email
:
"terrancekoar@gmail.com"
events
:
Object
data
:
Array(25)
paging
:
Object
__proto__
:
Object
expiresIn : 6931
id: "10155705649364155"
name: "Terrance Koar"
picture : Object
signedRequest: "BxEjrRfPr1sIvV36rVv698KCNf20SOTjBjPsHDjf-Ik.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUURESkE0ajRnZkx3M3lvMzNKcEhVX25DYVlnRXJCdDR1Si1ac0ladWg4VmItUXZnRG9nREYwbTh4dmZCR2E2VjdQN1NJMVZHd1ZRS1RTX25mUS1WUGIteG5FT0NFZFVnNUxyalNHSjVaXzFsVks4TXEzNkk5Y2M1MkRWWG5tOGJCVXZQRmdYX3dyUDBaMUxjUzRab3UxOWs4MThNM2lVVjBOQ0ZPbFdrOWJhcF9xZVRRay1saXo0RVM2YkZIS0lRczA3X0NrUDRSd0tTSnQtZk1pOUFNLXhTcDlxOU1TdDVraW9wZ3pqcjBYTVFnUm5iWDhnd21ESmphbjZrckFUMFUyQUZCcWxhQi1IbGV3V0l4amJwejl6MDdrdUR2b2U3Tm0xSFRoTjMtcjZ6c1hMM0dMaUpweWswb3I2M0F4YnN0WUxvVW1yeHAzckJIanRCTlJZVEJoSyIsImlzc3VlZF9hdCI6MTUwMDU4NDY2OSwidXNlcl9pZCI6IjEwMTU1NzA1NjQ5MzY0MTU1In0"
userID : "10155705649364155"*/}
