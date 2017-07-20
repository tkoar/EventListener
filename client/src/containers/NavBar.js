import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import Login from './Login'
import Search from '../components/Search'
import MapComponent from './MapComponent'
import { Grid, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

class SidebarLeftPush extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    return (
      <div>
        <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='wide' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
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
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <div style={{width: '80%', height: '700px'}}>
                <MapComponent>
                </MapComponent>
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftPush
