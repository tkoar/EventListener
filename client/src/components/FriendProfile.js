import React from 'react'
import '../App.css'
import Loader from '../components/Loader'
import Auth from './Auth/AuthAdapter'
import { Redirect, Link } from 'react-router-dom'
import {Button, Card, List, Grid, Image, Icon, Segment, Label} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
const {allUsers, currentUser, addFriendFrontEnd, addFriendBackEnd} = actions

class FriendProfile extends React.Component {

  state = {
    eventsList: true,
    friendList: false,
    editBio: false,
  }

  handleAddFriend = (event) => {
    let user = this.props.users.filter(u => u.id === parseInt(this.props.match.params.userId))[0]
    let friendObj = {currentUser: this.props.currentUser, newFriend: user}
    event.preventDefault()
    this.props.addFriendFrontEnd(friendObj)
    this.props.addFriendBackEnd(friendObj)
  }

  renderEditBioButton = () => {
    
  }

  makeEventList = () => {
    let user = this.props.users.filter(u => u.id === parseInt(this.props.match.params.userId))[0]
    return (user.events.map((el, i) =>  <List.Item key={i}>
      <List.Icon name='calendar' size='huge' verticalAlign='middle' color='teal' />
      <List.Content>
        <Link to={`events/${el.id}`}>
        <List.Header as='a'><strong>Name:</strong> {el.name}</List.Header></Link>
        <List.Description as='a'><strong>RSVP Staus:</strong> {el.rsvp_status}</List.Description>
        <List.Description as='a'><strong>Description:</strong> {el.description}</List.Description>
      </List.Content>
    </List.Item>)
    )
  }

  makeFriendList = () => {
    let user = this.props.users.filter(u => u.id === parseInt(this.props.match.params.userId))[0]
    return (user.friends.map((el, i) =>  <List.Item key={i}>
      <List.Icon size='big' verticalAlign='middle'><Image src={el.icon} avatar /></List.Icon>
      <List.Content>
        <Link to={`events/${el.id}`}>
        <List.Header as='a'><strong>Name:</strong> {el.name}</List.Header></Link>
        <List.Description as='a'><strong>Email:</strong> {el.email}</List.Description>
      </List.Content>
    </List.Item>)
    )
  }

  showEventsFriends = (event) => {
    if (event.target.name === 'events') {
      this.setState({eventsList: true, friendList: false})
    } else if (event.target.name === 'users') {
      this.setState({eventsList: false, friendList: true})
    }
  }

  renderFriendsListButton = () => {
    let user = this.props.users.filter(u => u.id === parseInt(this.props.match.params.userId))[0]
    return (
      <Button onClick={this.showEventsFriends} name="users" fluid color="teal">
        <Icon name="users"/>Show {user.name}'s Friends
      </Button>
    )
  }

  renderEventsListButton = () => {
    let user = this.props.users.filter(u => u.id === parseInt(this.props.match.params.userId))[0]
    return (
      <Button onClick={this.showEventsFriends} name="events" fluid color="blue">
        <Icon name="events"></Icon>Show {user.name}'s events
      </Button>
    )
  }

  renderAddFriendButton = () => {
    const userPageId = parseInt(this.props.match.params.userId)
    let alreadyFriends
    let ownProfile
    let user = this.props.users.filter(u => u.id === userPageId)[0]
    if (user) {
      alreadyFriends = (user.friends.filter(u => u.id === this.props.currentUser.id).length > 0) ? true : false
      ownProfile = (userPageId === this.props.currentUser.id) ? true : false
    }
    if (!alreadyFriends && !ownProfile) {
      return (<Card.Content extra><Button fluid color="blue" onClick={this.handleAddFriend}><Icon name="add user"></Icon>Add {user.name} to your Friends</Button></Card.Content>)
    }
  }

  render() {
    const userPageId = parseInt(this.props.match.params.userId)
    let alreadyFriends
    let ownProfile
    let user = this.props.users.filter(u => u.id === userPageId)[0]
    if (user) {
      alreadyFriends = (user.friends.includes(this.props.userProfile)) ? true : false
      ownProfile = (userPageId === user.id) ? true : false
    }

    console.log(this.props.users, user);
    return (
      <div className="scrolling-page">
        {!user ? <Loader /> :
          <div>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Card fluid>
                    <br></br>
                    <Image src={`${user.icon}`}></Image>
                    <Card.Content>
                      <Card.Header>{user.name}</Card.Header>
                      <Card.Meta>{user.email}</Card.Meta>
                      <Card.Description>{user.bio}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <a name="users" onClick={this.showEventsFriends}>
                        <Icon name='users'/>
                         {user.friends.length} Friends
                      </a>
                    </Card.Content>
                      {this.renderAddFriendButton()}
                      {this.renderEditBioButton()}
                  </Card>
                </Grid.Column>
                <Grid.Column width={12}>
                  {this.state.eventsList ? this.renderFriendsListButton() : this.renderEventsListButton()}
                  <List divided relaxed>{this.state.eventsList ? this.makeEventList() : this.makeFriendList()}</List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>}
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {users: state.usersReducer.users, userProfile: state.usersReducer.userProfile, currentUser: state.usersReducer.currentUser}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({addFriendFrontEnd: addFriendFrontEnd, addFriendBackEnd: addFriendBackEnd}, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile)
