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

  componentWillMount() {
    // fetch('http://localhost:3000/api/v1/events')
    // .then(res => res.json())
    // .then(res => this.setState({events: res}))
    console.log(this.props)
  }

  render() {
    const avatars = this.props.events.map((el, i) => {
      let location = el.locations[0]
      return ( <MapAvatars key={i} {...el} {...location} lat={parseFloat(location.latitude)} lng={parseFloat(location.longitude)} /> )
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
  return state.events
}

export default connect(mapStateToProps)(MapComponent)
