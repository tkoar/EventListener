import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'

class Search extends React.Component {

  componentWillReceiveProps(nextProps) {
    nextProps.users.map((el, i) => el["text"] = el.name)
  }

  render(){
    return (
      <Dropdown placeholder='Search Users' searchInput={'name'} search selection options={this.props.users} />
    )
  }

}


function mapStateToProps (state) {
  return {users: state.usersReducer.users}
}

export default connect(mapStateToProps)(Search)
