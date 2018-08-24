import React from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types'
import '../App.css'
var geocoder = require('geocoder')

export default class LoginComponent extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  geocodeUserLocation = (response) => {
      let location = response.location.name
      geocoder.geocode(location, (err, location) => {
      if( err ) {
        console.log('Error: ' + err)
      } else if( !location ) {
        console.log('No result.')
      } else {
        this.props.response({lat: `${location.lat}`, lng: `${location.lng}`}, response)
      }
    })
  }

  flyingPigs = () => {
    let piggies = []
    for (let i=0; i<3; i++) {
      let top = Math.random()*100
      piggies.push(<div className='flying-pig-bottom' style={{top: `${top}%`}}></div>)
    }
    for (let i=0; i<3; i++) {
      let top = Math.random()*100
      piggies.push(<div className='flying-pig-top' style={{top: `${top}%`}}></div>)
    }
    return piggies
  }

  render() {
    return (
      <div>
        <div>
          {/* {this.flyingPigs()} */}
        </div>
        <div className="login-div">
          <FacebookLogin
            cssClass='button-login'
            icon="fa-facebook"
            textButton="  Login"
            //need to set appId to be an environment variable
            autoload={true}
            appId='301958890275001'
            fields="name,email,picture,events,location"
            scope="public_profile,user_events,email,user_location"
            callback={this.geocodeUserLocation}
          />
        </div>
      </div>
    )
  }
}
