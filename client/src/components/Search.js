import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import Loader from './Loader'
import PropTypes from 'prop-types'


class Search extends React.Component {

  state = {
    redirect: false
  }
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users) {
      nextProps.users.map((el, i) => el["text"] = el.name)
    }
  }

  getId = (event, data) => {
    this.context.router.history.push(`/users/${event.target.id}`)

  }

  redirectToFriend(id) {
    if (this.state.redirect) {
      console.log("redirect", id)
      return (<Redirect to={`/users/${id}`}/>)
    }
  }

  render(){
    console.log("search", this.context)
    return (
      <div>
        { !this.props.users ? <Loader /> :
        <div>
          <Dropdown placeholder='Search Users' searchInput={'name'} onChange={this.getId} search selection options={this.props.users} />
        </div>
        }
      </div>


    )
  }

}


function mapStateToProps (state) {
  return {users: state.usersReducer.users}
}

export default connect(mapStateToProps)(Search)
