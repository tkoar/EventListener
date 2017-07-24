import React from 'react'
import { Route, Link } from 'react-router-dom'
import EventContainer from '../containers/EventContainer'
import { Image, Icon, Popup, Button } from 'semantic-ui-react'

export default class MapAvatars extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      props: props,
      modal: false
    }
  }

  handleClick = (event) => {
    this.setState({modal: !this.state.modal})
  }
  render() {
    const autoPic = 'http://www.pngall.com/wp-content/uploads/2016/03/Pig-Transparent.png'
    const buttonToEvent = <Button />
    return (
      <div>
        <Link to={`/events/${this.props.id}`}>
          <div onClick={this.handleClick} style={{position: 'relative', top: -20, left: -30}}>
            <Popup
              key={this.props.id}
              trigger={<img className="piggo" style={{ height: 'auto', width: '50px'}} src={autoPic}></img>}
              header={this.props.name}
              hoverable
              modal={this.state.modal}
              content={<EventContainer />}
            />
          </div>
        </Link>
      </div>
    )
  }

}
