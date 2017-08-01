import React from 'react';
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import '../App.css'

export default class LoginComponent extends React.Component {

  render() {
    const key = process.env.FACEBOOK_API
    return (
      <div className="login-div ">
        <Link to='/events'>
          <FacebookLogin
            cssClass='button-login'
            icon="fa-facebook"
            textButton="  Login"
            //need to set appId to be an environment variable
            appId='301958890275001'
            // autoLoad={true}
            fields="name,email,picture,events,location"
            scope="public_profile,user_events,rsvp_event,email,user_location"
            callback={this.props.response}
          />
        </Link>
      </div>
    )
  }
}
