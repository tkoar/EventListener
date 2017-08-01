import React from 'react'
import '../semantic/dist/semantic.css'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import {Card, Image as ImageComponent, Item, Icon, List, Popup} from 'semantic-ui-react'
import { connect } from 'react-redux'

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
    console.log(event.target)
  }

  makeEventList = () => {
    const event = this.props.events.filter(el => el.id.toString() === this.props.match.params.eventId)
    const currentEvent = event[0]
    return (
      !currentEvent ? <Card fluid><Card.Content><div style={{height: '800px'}}><Loader active/></div></Card.Content></Card> :
      <List.Item>
        <Popup
          trigger={<List.Icon id={event.id} onClick={this.addThisEvent} className='list-map-icon' name='add to calendar' size='huge' verticalAlign='middle' color='teal'></List.Icon>}
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
    </List.Item>
    )
  }

  render() {

    return (
      <List relaxed divided>
        {this.makeEventList()}
      </List>
    )
  }

}

function mapStateToProps (state) {
  return { loading: state.events.loading, events: state.events.events }
}

export default connect(mapStateToProps)(EventContainer)
