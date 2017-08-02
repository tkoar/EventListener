import React from 'react'
import '../semantic/dist/semantic.css'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { Grid, Icon, List, Popup, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
const {addEventFrontEnd, addEventBackEnd, removeEventFrontEnd, removeEventBackEnd} = actions
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
    let newEvent = this.props.events.filter(e => e.id === parseInt(event.target.id, 10))[0]
    newEvent.owner_id = this.props.currentUser.id
    this.props.addEventFrontEnd(newEvent)
    this.props.addEventBackEnd(newEvent)
  }

  handleDeleteEvent = (event) => {
    let deleteEvent = this.props.events.filter(e => e.id === parseInt(event.target.id, 10))[0]
    this.props.removeEventFrontEnd(deleteEvent)
    this.props.removeEventBackEnd(deleteEvent)
    this.props.history.push(`/users/${deleteEvent.owner_id}`)
  }


  makeEventList = () => {
    const event = this.props.events.filter(el => el.id.toString() === this.props.match.params.eventId)
    const currentEvent = event[0]
    let date
    if (currentEvent) {
      date = new Date(currentEvent.start_time)
    }
    return (
      !currentEvent ? <Loader /> :
      <List.Item>
        <Popup
          trigger={<List.Icon id={currentEvent.id} onClick={this.addThisEvent.bind(this)} className='list-map-icon' name='add to calendar' size='huge' verticalAlign='middle' style={{color: '#383F51'}}></List.Icon>}
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
            <strong>Date: </strong>{date.toDateString()}
          </List.Description>
          <List.Description>
            <strong>Time: </strong>{`${date.getHours()}:${date.getMinutes()}`}
          </List.Description>
          <List.Description>
            <strong>Description: </strong>{currentEvent.description}
          </List.Description>
        </List.Content>
        <List.Content className='list-padding'>
          {this.props.currentUser.id === currentEvent.owner_id && <Popup
            trigger={<Button fluid style={{backgroundColor: '#931621', color: '#fff'}} id={currentEvent.id} onClick={this.handleDeleteEvent}><Icon name="remove from calendar"></Icon>Remove {currentEvent.name}</Button>}
            content='Click here to remove this event from your events!'
          />}
        </List.Content>
        <List.Content className='list-padding'>
          <div>Comments:</div>
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
