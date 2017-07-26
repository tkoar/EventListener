import React from 'react'
import '../App.css'
import Loader from '../components/Loader'
import Auth from './Auth/AuthAdapter'
import { Redirect } from 'react-router-dom'
import {Card} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
const {fetchEvents, allUsers, currentUser} = actions

class FriendProfile extends React.Component {
//***may not need to put the redirect here because it is in the navbar which renders the profile component****
  componentWillReceiveProps(nextProps) {
    console.log("profile", nextProps.currentUser);
    if (nextProps.currentUser.error) {
      nextProps.history.push(`/`)
    }
  }

  render() {
    return (
      <div>
        {!this.props.currentUser ? <Loader fluid /> :
        <Card fluid className='profile'>
          <Card.Header>{this.props.currentUser.name}</Card.Header>
          <Card.Content text>
            <Card.Description>
            </Card.Description>
          </Card.Content>
       </Card>}
       <div>
         {/* {allEvents} */}
       </div>
      </div>

    )
  }

}

function mapStateToProps (state) {
  return {currentUser: state.usersReducer.currentUser}
}

export default connect(mapStateToProps)(FriendProfile)
