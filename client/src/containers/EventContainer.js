import React from 'react'
import '../semantic/dist/semantic.css'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import {Card, Image as ImageComponent, Grid, Item, Icon, List, Popup, Button} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
const {addFriendFrontEnd, addFriendBackEnd, addEventFrontEnd, addEventBackEnd, removeEventFrontEnd, removeEventBackEnd} = actions
class EventContainer extends React.Component {

  rsvpStats = (currentEvent) => {
    switch (currentEvent.rsvp_status) {
      case 'attending':
        return <div>{currentEvent.rsvp_status}<Icon color='green' name='check' /></div>
      default:
        return <div>{currentEvent.rsvp_status}</div>
    }
  }

  addThisEvent = (event) => {
    let newEvent = this.props.events.filter(e => e.id === parseInt(event.target.id))[0]
    newEvent.owner_id = this.props.currentUser.id
    this.props.addEventFrontEnd(newEvent)
    this.props.addEventBackEnd(newEvent)
  }

  handleDeleteEvent = (event) => {
    let deleteEvent = this.props.events.filter(e => e.id === parseInt(event.target.id))[0]
    this.props.removeEventFrontEnd(deleteEvent)
    this.props.removeEventBackEnd(deleteEvent)
    this.props.history.push(`/users/${deleteEvent.owner_id}`)
  }


  makeEventList = () => {
    const event = this.props.events.filter(el => el.id.toString() === this.props.match.params.eventId)
    const currentEvent = event[0]
    return (
      !currentEvent ? <Loader /> :
      <List.Item>
        <Popup
          trigger={<List.Icon id={currentEvent.id} onClick={this.addThisEvent.bind(this)} className='list-map-icon' name='add to calendar' size='huge' verticalAlign='middle' color='teal'></List.Icon>}
          content='Click to add this event to your events!'
        />
        <List.Content>
          <Link to={`/events/${currentEvent.id}`}>
            <List.Header as='a' ><strong>Name:</strong> {currentEvent.name}</List.Header>
          </Link>
          <List.Description>
            <strong>RSVP Staus:</strong>{this.rsvpStats(currentEvent)}
          </List.Description>
          <List.Description>
            <strong>Description:</strong> {currentEvent.description}
          </List.Description>
        </List.Content>
        <List.Content className='list-padding'>
          {this.props.currentUser.id === currentEvent.owner_id ? <Button fluid color='red' id={currentEvent.id} onClick={this.handleDeleteEvent}><Icon name="remove from calendar"></Icon>Remove {currentEvent.name}</Button> : <div></div>}
        </List.Content>
    </List.Item>
    )
  }

  render() {

    return (
      <Grid>
        <Grid.Column width={12}>
          <List relaxed divided>
            {this.makeEventList()}
          </List>
        </Grid.Column>
      </Grid>
    )
  }

}

function mapStateToProps (state) {
  return { loading: state.events.loading, events: state.events.events, currentUser: state.usersReducer.currentUser, addEventFrontEnd: state.events.addEventFrontEnd, addEventBackEnd: state.events.addEventBackEnd }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addEventFrontEnd: addEventFrontEnd, addEventBackEnd: addEventBackEnd, removeEventFrontEnd: removeEventFrontEnd, removeEventBackEnd: removeEventBackEnd}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(EventContainer)
