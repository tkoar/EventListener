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
  }

  relevantEvents = () => {
    let relevantIds = this.props.currentUser.friends.map(el => el.id) || []
    relevantIds.push(this.props.currentUser.id)

    if (this.props.friendIds > 0) {
      relevantIds = this.props.friendIds
      relevantIds.push(this.props.currentUser.id)
    }

    let pertinentEvents = this.props.events.filter((el, i) => relevantIds.includes(el.owner_id)) || []
    let filteredEvents = pertinentEvents
    if (this.props.eventsRange.reset === 'reset') {
      filteredEvents = pertinentEvents
    } else if (this.props.eventsRange.startDate !== this.props.eventsRange.endDate) {
      filteredEvents = pertinentEvents.filter(el => {
        let start = new Date(el.start_time)
        if (start > this.props.eventsRange.startDate && start < this.props.eventsRange.endDate) {
          return el
        }
      })
    }
    let avatars = filteredEvents.map((el, i) => {
      let location = el.location
      return ( <MapAvatars key={i} users={el.users} {...el} {...location} lat={parseFloat(location.latitude)} lng={parseFloat(location.longitude)} /> )
    })
    return avatars
  }


  render() {
    const myFriendsAvatars = this.relevantEvents() || []
    const center = this.props.center || this.props.currentUser.location
    return (
      <GoogleMapReact
        key='AIzaSyDXPH2k0zPWnw86gLR7DKbWGN9873fp308'
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}>
          {myFriendsAvatars}
      </GoogleMapReact>

    );
  }
}

function mapStateToProps (state) {
  return {users: state.usersReducer.users, events: state.events.events, currentUser: state.usersReducer.currentUser, friendIds: state.usersReducer.relevantFriendIds, eventsRange: state.events.eventsRange}
}


export default connect(mapStateToProps)(MapComponent)
