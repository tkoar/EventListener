import React, { Component } from 'react'
import { Switch, Link , Route } from 'react-router-dom'
import Search from '../components/Search'
import MapComponent from './MapComponent'
import EventContainer from './EventContainer'
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react'

class SidebarLeftPush extends Component {
  state = {
    visible: false,
    loggedIn: ''
  }

  componentWillMount() {
    localStorage.getItem('jwt') ? this.setState({loggedIn: true}) : this.setState({loggedIn: false})
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    console.log(this.state);
    const { visible } = this.state
    return (
      <div>
        <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='wide' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              <Link to='/events'><Button>Events</Button></Link>
            </Menu.Item>
            <Menu.Item name='find'>
              <Icon name='find' />
              Search
              <div className='text-margin' >
                <Search />
              </div>
            </Menu.Item>
            <Menu.Item name='id badge'>
              <Icon name='id badge' />
              My Profile
              {/* User Profile Component goes here */}
            </Menu.Item>
            {this.state.loggedIn && <Menu.Item name='id badge'>
              <Icon name='id badge' />
              <Link to='/'><Button onClick={this.props.logout}>Logout</Button></Link>
            </Menu.Item>}
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <div className="map-alignment">
                <Switch>
                  <Route exact path='/events' component={MapComponent} />
                  <Route path='/events/:eventId' component={EventContainer} />
                </Switch>
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      </div>
    )
  }
}


export default SidebarLeftPush
