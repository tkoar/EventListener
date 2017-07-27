import React from 'react'
import '../semantic/dist/semantic.css'
import Loader from '../components/Loader'
import {Card, Image as ImageComponent, Item, Icon} from 'semantic-ui-react'
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

  render() {
    const event = this.props.events.filter(el => el.id.toString() === this.props.match.params.eventId)
    const currentEvent = event[0]
    return (
      !currentEvent ? <Card fluid><Card.Content><div style={{height: '800px'}}><Loader active/></div></Card.Content></Card> :
      <Item>
        <Item.Content>
          <Item.Header>{currentEvent.name}</Item.Header>
          <Item.Meta>
          <Item.Description>{currentEvent.description}</Item.Description>
          <Item.Extra>
            {this.rsvpStats(currentEvent)}
          </Item.Extra>
          </Item.Meta>

        </Item.Content>
      </Item>
    )
  }

}

function mapStateToProps (state) {
  return { loading: state.events.loading, events: state.events.events }
}

export default connect(mapStateToProps)(EventContainer)
