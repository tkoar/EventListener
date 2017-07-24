import React from 'react'
import '../semantic/dist/semantic.css'
import Loader from '../components/Loader'
import {Card} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

class EventContainer extends React.Component {

  componentWillMount() {
    this.props.fetchEvents()
  }

  render() {
    console.log(this.props)
    return (
      (this.props.loading && <Loader/>) ||
      <Card>
        <Card.Header>{this.props.title}</Card.Header>
        <Card.Content text>
          <Card.Description>
            <p>Description:</p>
            <p>{this.props.description}</p>
          </Card.Description>
        </Card.Content>
     </Card>
   )
  }

}

function mapStateToProps (state) {
  return { loading: state.events.loading, events: state.events.events }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, actions)(EventContainer)

// export default connect(mapStateToProps, actions)(EventContainer)
// this is where the redux state will help out so right now the props are null but once redux is set up, i will be able to fetch the event data and mappropstosate
