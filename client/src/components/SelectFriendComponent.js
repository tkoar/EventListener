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
    console.log(this.props);
    const options = [{email: "terrancekoar@gmail.com", events: [], friends: [], id: 3, name: "Terrance Koar", text: "Terrance Koar"}]
    return(
      <Dropdown placeholder='Select Friends' multiple selection onChange={this.handleSelectFriend} options={options} />
    )
  }

}

function mapStateToProps (state) {
  return {friends: state.usersReducer.currentUser.friends, events: state.events.events}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({filterEvents: filterEvents}, dispatch)
}

export default connect(mapStateToProps)(SelectFriendComponent)
