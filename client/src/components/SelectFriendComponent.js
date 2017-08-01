import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown } from 'semantic-ui-react'
import * as actions from '../actions'
const {relevantFriendIds, deleteIdFilter} = actions

class SelectFriendComponent extends React.Component {

  // setFriendIds = (event, data) => {
  //   let friendId = parseInt(event.target.id)
  //   // if (friendId && !this.props.friendIds.includes(friendId)) {
  //   //   let arrFriendIds = [friendId]
  //   //   this.props.relevantFriendIds(arrFriendIds)
  //   // }
  //   this.props.relevantFriendIds([friendId])
  // }

//have to figure out multi-person filtering and unfiltering
  setFriendIds = (event, data) => {
    let friends = this.props.currentUser.friends
    let ids = this.getIds(friends, data.value)
    // for (i = 0; i < data.value.length; i++) {
    //   friend = friends.filter(f => f.name === data.value[i])
    //   var id = friend.id || this.props.currentUser.id
    //   ids.push(id)
    // }
    debugger
    console.log("select friend", this.props.friendIds, ids, event.target)
    this.props.relevantFriendIds(ids)
    // if (event.target.class === 'delete icon') {
    //   ids = this.getIds(friends, data.value)
    //   this.props.deleteIdFilter(ids)
    // } else if (friendId[0] && !this.props.friendIds.includes(id) {
    //   this.props.relevantFriendIds(ids)
    // }
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
        allowAdditions
        options={friendOptions}
      />
    )
  }

}

function mapStateToProps (state) {
  console.log(state)
  return {currentUser: state.usersReducer.currentUser, events: state.events.events, friendIds: state.usersReducer.relevantFriendIds}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({relevantFriendIds: relevantFriendIds, deleteIdFilter: deleteIdFilter}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFriendComponent)
