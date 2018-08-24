import React from 'react'
import '../App.css'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import {Button, Card, List, Grid, Image, Icon, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
const {addFriendFrontEnd, addFriendBackEnd, addEventFrontEnd, addEventBackEnd, removeEventBackEnd, removeEventFrontEnd, removeFriendFrontEnd, removeFriendBackEnd} = actions

class FriendProfile extends React.Component {

  state = {
    eventsList: true,
    friendList: false
  }

  handleAddFriend = (event) => {
    let user = this.props.users.filter(u => u.id === parseInt(this.props.match.params.userId, 10))[0]
    let friendObj = {currentUser: this.props.currentUser, newFriend: user}
    event.preventDefault()
    this.props.addFriendFrontEnd(friendObj)
    this.props.addFriendBackEnd(friendObj)
  }

  handleDeleteFriend = (event) => {
    let user = this.props.users.filter(u => u.id === parseInt(this.props.match.params.userId, 10))[0]
    let friendObj = {currentUser: this.props.currentUser, removeFriend: user}
    event.preventDefault()
    this.props.removeFriendBackEnd(friendObj)
    // this.props.removeFriendFrontEnd(friendObj)
  }

  addThisEvent = (event) => {
    let user = this.props.users.filter(u => u.id === parseInt(this.props.match.params.userId, 10))[0]
    let newEvent = user.events.filter(e => e.id === parseInt(event.target.id, 10))[0]
    newEvent.owner_id = this.props.currentUser.id
    this.props.addEventFrontEnd(newEvent)
    this.props.addEventBackEnd(newEvent)
  }

  rsvpStats = (event) => {
    switch (event.rsvp_status) {
      case 'attending':
        return <div>{event.rsvp_status}<Icon color='green' name='check' /></div>
      default:
        return <div>{event.rsvp_status}</div>
    }
  }

  makeEventList = () => {
    let user = this.props.users.filter(u => u.id === parseInt(this.props.match.params.userId, 10))[0]
    return (user.events.map((el, i) => <List.Item key={i}>
        <Popup
          trigger={<List.Icon id={el.id} onClick={this.addThisEvent} className='list-map-icon' name='add to calendar' size='huge' verticalAlign='middle' style={{color: '#383F51'}}></List.Icon>}
          content='Click to add this event to your events!'
        />
        <List.Content>
          <Link to={`/events/${el.id}`}>
          <List.Header as='a'><strong>Name:</strong> {el.name}</List.Header></Link>
          <List.Description>
            <strong>RSVP Staus:</strong>{this.rsvpStats(el)}
          </List.Description>
          <List.Description><strong>Description:</strong> {el.description}</List.Description>
        </List.Content>
      </List.Item>)
    )
  }

  makeFriendList = () => {
    let user = this.props.users.filter(u => u.id === parseInt(this.props.match.params.userId, 10))[0]
    return (user.friends.map((el, i) =>  <List.Item key={i}>
      <List.Icon size='big' verticalAlign='middle'><Image src={el.icon} avatar /></List.Icon>
      <List.Content>
        <Link to={`/users/${el.id}`}>
          <List.Header as='a'><strong>Name:</strong> {el.name}</List.Header>
        </Link>
        <List.Description>City: {el.current_city}</List.Description>
        <List.Description>Email: {el.email}</List.Description>
        <List.Description>Bio: {el.bio}</List.Description>
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
    let user = this.props.users.filter(u => u.id === parseInt(this.props.match.params.userId, 10))[0]
    return (
      <Button onClick={this.showEventsFriends} name="users" fluid style={{backgroundColor: '#383F51', color: '#fff'}}>
        <Icon name="users"/>Show {user.name}'s Friends
      </Button>
    )
  }

  renderEventsListButton = () => {
    let user = this.props.users.filter(u => u.id === parseInt(this.props.match.params.userId, 10))[0]
    return (
      <Button onClick={this.showEventsFriends} name="events" fluid style={{backgroundColor: '#89BD9E', color: '#fff'}}>
        <Icon name="events"></Icon>Show {user.name}'s events
      </Button>
    )
  }

  renderAddFriendButton = () => {
    const userPageId = parseInt(this.props.match.params.userId, 10)
    let alreadyFriends
    let ownProfile
    let user = this.props.users.filter(u => u.id === userPageId)[0]
    if (user) {
      alreadyFriends = (user.friends.filter(u => u.id === this.props.currentUser.id).length > 0) ? true : false
      ownProfile = (userPageId === this.props.currentUser.id) ? true : false
    }
    if (!alreadyFriends && !ownProfile) {
      return (<Card.Content extra><Button fluid style={{backgroundColor: '#383F51', color: '#fff'}} onClick={this.handleAddFriend}><Icon name="add friend"></Icon>Add {user.name} to your Friends</Button></Card.Content>)
    } else if (alreadyFriends && !ownProfile) {
      return (<Card.Content extra><Button fluid style={{backgroundColor: '#383F51', color: '#fff'}} onClick={this.handleDeleteFriend}><Icon name="remove friend"></Icon>Remove {user.name} from your Friends</Button></Card.Content>)
    }
  }

  render() {
    const userPageId = parseInt(this.props.match.params.userId, 10)
    let user = this.props.users.filter(u => u.id === userPageId)[0]
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
                      <Card.Meta>{user.current_city}</Card.Meta>
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
  return bindActionCreators({addFriendFrontEnd: addFriendFrontEnd, addFriendBackEnd: addFriendBackEnd, addEventFrontEnd: addEventFrontEnd, addEventBackEnd: addEventBackEnd, removeFriendFrontEnd: removeFriendFrontEnd, removeFriendBackEnd: removeFriendBackEnd}, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile)
