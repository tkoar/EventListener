import React from 'react'
import GoogleMapReact from 'google-map-react'
import MapAvatars from '../components/MapAvatars'


class MapComponent extends React.Component {
  static defaultProps = {
    center: {lat: 40.705163, lng: -74.014049},
    zoom: 14
  };

  render() {
    return (
       <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <MapAvatars
          lat={40.705163}
          lng={-74.014049}

        />
      </GoogleMapReact>
    );
  }
}

export default MapComponent
