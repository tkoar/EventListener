import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown } from 'semantic-ui-react'
import Loader from './Loader'
import PropTypes from 'prop-types'
import * as actions from '../actions'
const {getUserProfile} = actions


class Search extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  getId = (event, data) => {
    let user = this.props.users.filter(u => u.name === data.value)[0]
    this.context.router.history.push(`/users/${user.id}`)
  }

  render(){
    const opts = this.props.users.map(u => ({id: u.id, text: u.name, value: u.name, image: {avatar: true, src: u.icon} }))
    return (
      !this.props.users ? <Loader /> :
      <div>
        <Dropdown placeholder='Search Users' searchInput='name' onChange={this.getId} fluid search selection options={opts} />
      </div>
    )
  }
}


function mapStateToProps (state) {
  return {users: state.usersReducer.users}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getUserProfile: getUserProfile}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
