import React from 'react'
import '../App.css'
import Loader from '../components/Loader'
import EditIconForm from './EditIconForm'
import Auth from './Auth/AuthAdapter'
import { Redirect, Link } from 'react-router-dom'
import { Button, Card, List, Image, Icon, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
const {fetchEvents, updateUserIconBackEnd, updateUserIconFrontEnd, currentUser, updateEventIconFrontEnd, updateEventIconBackEnd} = actions

class Profile extends React.Component {

  state = {
    editIcon: false
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

  makeEventList = () => {
    return (this.props.currentUser.events.map(el =>  <List.Item>
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

  render() {
    return (
      <div>
        {!this.props.currentUser || !this.props.currentUser.friends ? <Loader /> :
          <div>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Card fluid>
                    <div>
                      <EditIconForm updateIcon={this.updateIcon}/>
                    </div>
                    <br></br>
                    <Image src={`${this.props.currentUser.icon}`}></Image>
                    <Card.Content>
                      <Card.Header>{this.props.currentUser.name}</Card.Header>
                      <Card.Meta>{this.props.currentUser.email}</Card.Meta>
                      <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name='user' />
                         {this.props.currentUser.friends.length} Friends
                      </a>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column width={12}>
                  <div className="scrolling-page">
                    <List divided relaxed>{this.makeEventList()}</List>
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
  return bindActionCreators({updateUserIconBackEnd: updateUserIconBackEnd, updateUserIconFrontEnd: updateUserIconFrontEnd, updateEventIconFrontEnd: updateEventIconFrontEnd, updateEventIconBackEnd: updateEventIconBackEnd}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
