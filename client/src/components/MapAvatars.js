import React from 'react'
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
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
    let user = this.props.users.filter(el => el.icon === this.props.icon)
    return (
      <div>
        <Link to={`/events/${this.props.id}`}>
          <div style={{position: 'relative', top: -20, left: -30}}>
            <Popup
              key={this.props.id}
              trigger={<img alt="piggo" className="piggo" style={{ height: 'auto', width: '50px'}} src={this.props.owner_icon}></img>}
              header={this.props.name}
              hoverable
              modal={this.state.modal}
              content={this.props.city}
            />
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
