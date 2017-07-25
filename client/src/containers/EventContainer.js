import React from 'react'
import '../semantic/dist/semantic.css'
import Loader from '../components/Loader'
import {Card} from 'semantic-ui-react'
import { connect } from 'react-redux'

class EventContainer extends React.Component {

  render() {
    const event = this.props.events.filter(el => el.id.toString() === this.props.match.params.eventId)
    const currentEvent = event[0]
    console.log(currentEvent, this.props)
    return (
      !currentEvent ? <Card><Card.Content><Loader active/></Card.Content></Card> :
      <Card>
        <Card.Header>{currentEvent.name}</Card.Header>
        <Card.Content text>
          <Card.Description>
            <p>RSVP Status: {currentEvent.rsvp_status}</p>
            <p>Description:</p>
            <p>{currentEvent.description}</p>
          </Card.Description>
        </Card.Content>
     </Card>
    )
  }

}

function mapStateToProps (state) {
  return { loading: state.events.loading, events: state.events.events }
}

export default connect(mapStateToProps)(EventContainer)
