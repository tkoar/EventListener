import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown } from 'semantic-ui-react'
import * as actions from '../actions'
const {relevantFriendIds} = actions

class SelectFriendComponent extends React.Component {

  setFriendIds = (event, data) => {
    let friendId = parseInt(event.target.id)
    // if (friendId && !this.props.friendIds.includes(friendId)) {
    //   let arrFriendIds = [friendId]
    //   this.props.relevantFriendIds(arrFriendIds)
    // }
    this.props.relevantFriendIds([friendId])
  }


  render() {
    this.props.currentUser.friends = this.props.currentUser.friends || []
    const friendOptions = this.props.currentUser.friends.map(u => ({id: u.id, text: u.name, value: u.name, image: {avatar: true, src: u.icon} })) || []
    return(
      <Dropdown onChange={this.setFriendIds} placeholder='Select Friend' fluid selection options={friendOptions} />
    )
  }

}

function mapStateToProps (state) {
  console.log(state)
  return {currentUser: state.usersReducer.currentUser, events: state.events.events, friendIds: state.usersReducer.relevantFriendIds}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({relevantFriendIds: relevantFriendIds}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFriendComponent)
