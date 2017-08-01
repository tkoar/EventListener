import React from 'react'
import GoogleMapReact from 'google-map-react'
import MapAvatars from '../components/MapAvatars'
import Loader from '../components/Loader'
import { connect } from 'react-redux'

class MapComponent extends React.Component {

  pertinentEvents = (relevantIds) => {
    let events = []
    this.props.events.forEach((el, i) => {
      if (relevantIds.includes(el.owner_id)) {
        events.push(el)
      }
    })
    return events
  }

  relevantEvents = () => {
    let relevantIds = []
    if (this.props.friendIds.length > 0) {
      relevantIds = this.props.friendIds
      relevantIds.push(this.props.currentUser.id)
    } else {
      relevantIds = this.props.currentUser.friends.map(el => el.id) || []
      relevantIds.push(this.props.currentUser.id)
    }

    let filteredEvents = this.pertinentEvents(relevantIds)
    let calendarStartDate = this.props.eventsRange.startDate
    let calendarEndDate = this.props.eventsRange.endDate

    if (calendarStartDate !== calendarEndDate) {
      filteredEvents = filteredEvents.filter(el => {
        let start = new Date(el.start_time)
        if (start > calendarStartDate && start < calendarEndDate) {
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
    const user = this.props.currentUser
    const myFriendsAvatars = this.relevantEvents() || []
    let lng = parseFloat(user.current_city_lng)
    let lat = parseFloat(user.current_city_lat)
    let realCenter = isNaN(lat) ? [40.705163, -74.014049] : [lat, lng]
    return (
      isNaN(lat) ? <Loader/> :
      <GoogleMapReact
        key='AIzaSyDXPH2k0zPWnw86gLR7DKbWGN9873fp308'
        center={realCenter}
        defaultZoom={13}>
          {myFriendsAvatars}
      </GoogleMapReact>
    )
  }
}

function mapStateToProps (state) {
  return {users: state.usersReducer.users, events: state.events.events, currentUser: state.usersReducer.currentUser, friendIds: state.usersReducer.relevantFriendIds, eventsRange: state.events.eventsRange}
}


export default connect(mapStateToProps)(MapComponent)
