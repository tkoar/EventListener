import React from 'react'
import '../App.css'
import Loader from '../components/Loader'
import EditIconForm from './EditIconForm'
import EditBioForm from './EditBioForm'
import { Link } from 'react-router-dom'
import { Card, List, Image, Icon, Grid, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
const { updateUserIconBackEnd, updateUserIconFrontEnd, updateEventIconFrontEnd, updateEventIconBackEnd, updateUserBioFrontEnd, updateUserBioBackEnd} = actions

class Profile extends React.Component {

  state = {
    eventsList: true,
    friendList: false
  }

  updateIcon = (newUrl) => {
    let updateObj = {
      url: newUrl,
      userId: this.props.currentUser.id,
      events: this.props.events
    }
    this.props.updateUserIconFrontEnd(updateObj)
    this.props.updateUserIconBackEnd(updateObj)
    this.props.updateEventIconFrontEnd(updateObj)
    this.props.updateEventIconBackEnd(updateObj)
  }

  updateBio = (newBio) => {
    let updatedBio = {
      bio: newBio,
      userId: this.props.currentUser.id,
    }
    this.props.updateUserBioFrontEnd(updatedBio)
    this.props.updateUserBioBackEnd(updatedBio)
  }

  makeFriendList = () => {
    let user = this.props.currentUser
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

  makeEventList = () => {
    if (this.props.currentUser.events){
      return (
        this.props.currentUser.events.map(el =>  <List.Item>
        <List.Icon name='calendar' size='huge' verticalAlign='middle' style={{color: '#383F51'}} />
        <List.Content>
          <Link to={`events/${el.id}`}>
          <List.Header as='a'><strong>Name:</strong> {el.name}</List.Header></Link>
          <List.Description as='a'><strong>RSVP Staus:</strong> {el.rsvp_status}</List.Description>
          <List.Description as='a'><strong>Description:</strong> {el.description}</List.Description>
        </List.Content>
      </List.Item>)
      )
    }
  }

  showEventsFriends = (event) => {
    if (event.target.name === 'events') {
      this.setState({eventsList: true, friendList: false})
    } else if (event.target.name === 'users') {
      this.setState({eventsList: false, friendList: true})
    }
  }

  renderFriendsListButton = () => {
    let user = this.props.currentUser
    return (
      <Button onClick={this.showEventsFriends} name="users" fluid style={{backgroundColor: '#383F51', color: '#fff'}}>
        <Icon name="users"/>Show {user.name}'s Friends
      </Button>
    )
  }

  renderEventsListButton = () => {
    let user = this.props.currentUser
    return (
      <Button onClick={this.showEventsFriends} name="events" fluid style={{backgroundColor: '#89BD9E', color: '#fff'}}>
        <Icon name="events"></Icon>Show {user.name}'s events
      </Button>
    )
  }

  render() {
    return (
      <div>
        {!this.props.currentUser || !this.props.currentUser.friends ? <Loader /> :
          <div>
            <Grid>
              <Grid.Row>
                <Grid.Column className="scrolling-page" width={4}>
                  <Card fluid color={'#5C0029'}>
                    <Card.Content extra>
                      <EditIconForm updateIcon={this.updateIcon}/>
                    </Card.Content>
                    <br></br>
                    <Image src={`${this.props.currentUser.icon}`}></Image>
                    <Card.Content>
                      <Card.Header>{this.props.currentUser.name}</Card.Header>
                      <Card.Meta>{this.props.currentUser.current_city}</Card.Meta>
                      <Card.Meta>{this.props.currentUser.email}</Card.Meta>
                      <Card.Description>{this.props.currentUser.bio}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <a name="users" onClick={this.showEventsFriends}>
                        <Icon name='users'/>
                         {this.props.currentUser.friends.length} Friends
                      </a>
                    </Card.Content>
                    <Card.Content extra>
                      <EditBioForm updateBio={this.updateBio}/>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column className="scrolling-page" width={12}>
                  <div>
                    {this.state.eventsList ? this.renderFriendsListButton() : this.renderEventsListButton()}
                    <List divided relaxed>{this.state.eventsList ? this.makeEventList() : this.makeFriendList()}</List>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>}
      </div>
    )
  }

}

function mapStateToProps (state) {
  console.log("Profile", state.usersReducer.currentUser, state);
  return {currentUser: state.usersReducer.currentUser, events: state.events.events}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({updateUserIconBackEnd: updateUserIconBackEnd, updateUserIconFrontEnd: updateUserIconFrontEnd, updateEventIconFrontEnd: updateEventIconFrontEnd, updateEventIconBackEnd: updateEventIconBackEnd, updateUserBioBackEnd: updateUserBioBackEnd, updateUserBioFrontEnd: updateUserBioFrontEnd,}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
