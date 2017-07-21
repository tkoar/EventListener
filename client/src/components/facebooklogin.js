import React from 'react';
import style from '../App.css'
import FacebookLogin from 'react-facebook-login';

export default class LoginComponent extends React.Component {
  responseFacebook(response) {
    //gotta set the state/store here as well as create user, which is potentially something i do in the reducer on the way to setting the storestate (thunk middleware solves the async issue)
    console.log(response);
  }

  render() {
    return (
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
    )
  }
}
