import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Link , Route , withRouter} from 'react-router-dom'
import Search from '../components/Search'
import MapComponent from './MapComponent'
import Profile from '../components/Profile'
import FriendProfile from '../components/FriendProfile'
import EventContainer from './EventContainer'
import SelectFriendComponent from '../components/SelectFriendComponent'
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react'

class NavBar extends Component {
  state = {
    visible: false,
    loggedIn: ''
  }

  componentWillMount() {
    localStorage.getItem('jwt') ? this.setState({loggedIn: true}) : this.setState({loggedIn: false})
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    console.log(this.props);
    const { visible } = this.state
    return (
      <div>
        <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='wide' visible={visible} icon='labeled' vertical inverted>
            <Link to='/events'>
              <Menu.Item name='home'>
                <Icon name='home' />
                Home
              </Menu.Item>
            </Link>
            <Menu.Item name='find'>
              <Icon name='find' />
              Search
              <div className='text-margin' >
                <Search />
              </div>
            </Menu.Item>
            <Link to='/myprofile'>
              <Menu.Item name='drivers license'>
                <Icon name='drivers license' size='massive' />
                My Profile
              </Menu.Item>
            </Link>
            <Menu.Item name='filter'>
              <Icon name='filter' />
              <SelectFriendComponent/>
            </Menu.Item>
            {this.state.loggedIn &&
            <Link to='/' onClick={this.props.logout}>
              <Menu.Item name='id badge'>
                <Icon name='id badge' />
                Logout
              </Menu.Item>
            </Link>}
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <div className="map-alignment">
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
  console.log(state)
  return {currentUser: state.usersReducer.currentUser, users: state.usersReducer.users}
}

export default withRouter(connect(mapStateToProps)(NavBar))
// export default NavBar
