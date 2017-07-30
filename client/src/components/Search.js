import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
    if (event.target.childElementCount > 0) {
      this.context.router.history.push(`/users/${event.target.id}`)
    } else {
      let userId = event.target.parentElement.id
      this.context.router.history.push(`/users/${userId}`)
    }
  }

  render(){
    const opts = this.props.users.map(u => ({id: u.id, text: u.name}))
    return (
      <div>
        { !this.props.users ? <Loader /> :
        <div>
          <Dropdown placeholder='Search Users' searchInput='name' onChange={this.getId} search selection options={opts} />
        </div>
        }
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
