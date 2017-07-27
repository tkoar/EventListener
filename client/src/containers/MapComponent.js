import React from 'react'
import GoogleMapReact from 'google-map-react'
import MapAvatars from '../components/MapAvatars'
import { connect } from 'react-redux'

class MapComponent extends React.Component {
  state = {
    events: []
  }
  static defaultProps = {
    center: {lat: 40.705163, lng: -74.014049},
    zoom: 13
  };


  render() {
    console.log(this.props)
    // const myAvatars = this.props.currentUser.events.map((el, i) => {
    //   debugger
    //   let location = el.locations[0]
    //   return ( <MapAvatars key={i} {...el} {...location} lat={parseFloat(location.latitude)} lng={parseFloat(location.longitude)} /> )
    // })
    const avatars = this.props.events.map((el, i) => {
      let location = el.location
      return ( <MapAvatars key={i} users={el.users} {...el} {...location} lat={parseFloat(location.latitude)} lng={parseFloat(location.longitude)} /> )
    })
    const key = process.env.GOOGLE_API
    return (
        <GoogleMapReact
         key='AIzaSyDXPH2k0zPWnw86gLR7DKbWGN9873fp308'
         defaultCenter={this.props.center}
         defaultZoom={this.props.zoom}
       >
         {avatars}
       </GoogleMapReact>

    );
  }
}

function mapStateToProps (state) {
  return {users: state.usersReducer.users, events: state.events.events}
}


export default connect(mapStateToProps)(MapComponent)
