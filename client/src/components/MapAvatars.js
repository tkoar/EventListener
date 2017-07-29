import React from 'react'
import { Link } from 'react-router-dom'
import { Popup, Icon, Header } from 'semantic-ui-react'
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
    // eventUser does not work for some reason!!
    // if (this.props.users) {
    //   var eventUser = this.props.users.filter(el => el.id === this.props.owner_id)[0]
    // }
    const startDate = new Date(this.props.start_time).toDateString()
    return (
      <div>
        <Link to={`/events/${this.props.id}`}>
          <div style={{position: 'relative', top: -20, left: -30}}>
            <Popup
              key={this.props.id}
              trigger={<img alt="piggo" className="piggo" style={{ height: 'auto', width: '50px'}} src={this.props.owner_icon}></img>}
              header={this.props.name}
              hoverable
              inverted>
              <Header>{`${this.props.name}`}</Header>
              {/* <Icon color='olive' name='user circle outline'></Icon>{eventUser.name} */}
              <Icon color='blue' name='map pin'></Icon>{this.props.city}
              <br></br>
              <Icon color='blue' name='calendar'></Icon>{startDate}
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
