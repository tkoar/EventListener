import React from 'react'
import '../App.css'
import Loader from '../components/Loader'
import Auth from './Auth/AuthAdapter'
import { Redirect, Link } from 'react-router-dom'
import { Card, List, Image, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
const {fetchEvents, allUsers, currentUser} = actions

class Profile extends React.Component {
//list of events is not working!!
  // makeEventList = () => {
  //   this.props.currentUser.events.map(el => <List.Item>{el.name}</List.Item>)
  // }

  render() {
    return (
      <div>
        {!this.props.currentUser || !this.props.currentUser.friends ? <Loader /> :
          <div>
            <Card>
              <Image src={`${this.props.currentUser.icon}`}></Image>
              <Card.Content>
                <Card.Header>{this.props.currentUser.name}</Card.Header>
                <Card.Meta>{this.props.currentUser.email}</Card.Meta>
                <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                   {this.props.friends.length} Friends
                </a>
              </Card.Content>
            </Card>
            {/* <List divided relaxed>{this.makeEventList()}</List> */}
          </div>}
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {currentUser: state.usersReducer.currentUser, friends: state.usersReducer.currentUser.friends}
}

export default connect(mapStateToProps)(Profile)
