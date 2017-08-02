import React from 'react';
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import '../App.css'
var google_geocoding = require('google-geocoding')


export default class LoginComponent extends React.Component {

  geocodeUserLocation = (response) => {
      let location = response.location.name
      google_geocoding.geocode(location, (err, location) => {
      if( err ) {
        console.log('Error: ' + err)
      } else if( !location ) {
        console.log('No result.')
      } else {
        this.props.response({lat: `${location.lat}`, lng: `${location.lng}`}, response)
      }
    })
  }

  render() {
    return (
      <div className="login-div ">
        <Link to='/events'>
          <FacebookLogin
            cssClass='button-login'
            icon="fa-facebook"
            textButton="  Login"
            //need to set appId to be an environment variable
            appId='301958890275001'
            fields="name,email,picture,events,location"
            scope="public_profile,user_events,rsvp_event,email,user_location"
            callback={this.geocodeUserLocation}
          />
        </Link>
      </div>
    )
  }
}
