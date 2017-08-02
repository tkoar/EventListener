import React from 'react'
import { Link } from 'react-router-dom'
import { Popup, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

class MapAvatars extends React.Component {

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
    const startDate = new Date(this.props.start_time).toDateString()
    return (
      <div style={{zIndex: `${1000 - this.props.id}`}}>
        <Link to={`/events/${this.props.id}`}>
          <div style={{position: 'relative', top: -20, left: -30}}>
            <Popup
              key={this.props.id}
              trigger={<img alt="piggo" className="piggo" style={{ height: 'auto', width: '42px'}} src={this.props.owner_icon}></img>}
              hoverable
              inverted>
              <Icon style={{color: '#84DCCF'}} name='calendar'></Icon>{this.props.name}
              <br></br>
              <Icon color='blue' name='map pin'></Icon>{this.props.city}
              <br></br>
              <Icon color='blue' loading name='time'></Icon>{startDate}
            </Popup>

          </div>
        </Link>
      </div>
    )
  }

}
function mapStateToProps (state) {
  return {currentUser: state.usersReducer.currentUser, users: state.usersReducer.users}
}

export default connect(mapStateToProps)(MapAvatars)
