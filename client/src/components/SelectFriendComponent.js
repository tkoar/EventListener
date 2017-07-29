import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { Dropdown } from 'semantic-ui-react'
const {filterEvents} = actions

class SelectFriendComponent extends React.Component {

  // componentWillReceiveProps(nextProps) {
  //   nextProps.friends.map((el, i) => el["text"] = el.name)
  // }

  handleSelectFriend = (event, data) => {
    // data.options is the array of choices
  }

  render() {
    const options = this.props.currentUser.friends
    return(
      <Dropdown placeholder='Select Friends' searchInput={'name'} multiple selection onChange={this.handleSelectFriend} options={options} />
    )
  }

}

function mapStateToProps (state) {
  return {currentUser: state.usersReducer.currentUser, events: state.events.events}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({filterEvents: filterEvents}, dispatch)
}

export default connect(mapStateToProps)(SelectFriendComponent)
