import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown } from 'semantic-ui-react'
import * as actions from '../actions'
const {relevantFriendIds, deleteIdFilter} = actions

class SelectFriendComponent extends React.Component {

  setFriendIds = (event, data) => {
    let friends = this.props.currentUser.friends
    let ids = this.getIds(friends, data.value)
    this.props.relevantFriendIds(ids)
  }

  getIds = (friendsArr, namesArr) => {
    let ids = []
    friendsArr.map(friend => {
      for (let i = 0; i < namesArr.length; i++)
        if (friend.name === namesArr[i]) {
          ids.push(friend.id)
        }
    })
    return ids
  }

  render() {
    this.props.currentUser.friends = this.props.currentUser.friends || []
    const friendOptions = this.props.currentUser.friends.map(u => ({id: u.id, text: u.name, value: u.name, image: {avatar: true, src: u.icon} })) || []
    return(
      <Dropdown
        onChange={this.setFriendIds}
        placeholder='Select Friend'
        fluid
        multiple
        selection
        search
        allowAdditions
        options={friendOptions}
      />
    )
  }

}

function mapStateToProps (state) {
  return {currentUser: state.usersReducer.currentUser, events: state.events.events, friendIds: state.usersReducer.relevantFriendIds}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({relevantFriendIds: relevantFriendIds, deleteIdFilter: deleteIdFilter}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFriendComponent)
