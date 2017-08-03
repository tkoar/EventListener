import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Link , Route , withRouter} from 'react-router-dom'
import Search from '../components/Search'
import MapComponent from './MapComponent'
import Auth from '../components/Auth/AuthAdapter'
import Profile from '../components/Profile'
import FriendProfile from '../components/FriendProfile'
import EventContainer from './EventContainer'
import Calendar from '../components/CalendarComponent'
import SelectFriendComponent from '../components/SelectFriendComponent'
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react'

class NavBar extends Component {
  state = {
    visible: false,
    loggedIn: '',
  }

  componentWillReceiveProps(nextProps) {
    Auth.currentUser().then(res => {
      if (res.error) {
        nextProps.history.push(`/`)
      } else {
        this.setState({loggedIn: true})
      }
    })
  }



  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    return (
      <div>
        <Icon
          style={{color: '#648A73'}}
          className='menu-button'
          size='huge'
          name='add circle'
          onMouseOver={this.toggleVisibility}
          onClick={this.toggleVisibility}>
        </Icon>
        <Sidebar.Pushable as={Segment}>
          <Sidebar style={{backgroundColor: '#383F51'}} as={Menu} animation='uncover' width='wide' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='find'>
              <Icon name='find' style={{color: '#AFBDDB'}} />
              Search
              <div className='text-margin' >
                <Search />
              </div>
            </Menu.Item>
            <Link to='/events'>
              <Menu.Item name='home'>
                <Icon name='map' style={{color: '#AFBDDB'}} />
                Map
              </Menu.Item>
            </Link>
            <Link to='/myprofile'>
              <Menu.Item name='drivers license'>
                <Icon name='drivers license' size='massive' style={{color: '#AFBDDB'}} />
                My Profile
              </Menu.Item>
            </Link>
            <Menu.Item name='filter'>
              <Icon name='filter' style={{color: '#AFBDDB'}} />
              Filter by Friend
              <div className='text-margin'>
                <SelectFriendComponent />
              </div>
            </Menu.Item>
            <Menu.Item name='filter'>
              <Icon name='calendar' style={{color: '#AFBDDB'}} />
              Filter by Date
              <div className='text-margin'>
                <Calendar />
              </div>
            </Menu.Item>
            {this.state.loggedIn &&
            <Link to='/' onClick={this.props.logout}>
              <Menu.Item name='id badge'>
                <Icon name='id badge' style={{color: '#AFBDDB'}} />
                Logout
              </Menu.Item>
            </Link>}
          </Sidebar>
          <Sidebar.Pusher style={{backgroundColor: '#EFFEFF'}}>
            <Segment basic >
              <div className="map-alignment" >
                <Switch>
                  <Route exact path='/events' component={MapComponent} />
                  <Route path='/events/:eventId' component={EventContainer} />
                  <Route path='/myprofile' render={() => <Profile />} />
                  <Route path='/users/:userId' component={FriendProfile} />
                </Switch>
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      </div>
    )
  }
}

function mapStateToProps (state) {
  return {currentUser: state.usersReducer.currentUser, users: state.usersReducer.users, friendIds: state.usersReducer.relevantFriendIds}
}


export default withRouter(connect(mapStateToProps)(NavBar))
