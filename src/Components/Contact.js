import React from "react";
import { connect } from "react-redux"

class Contact extends React.Component {

  state = {
    hover: false
  }

  getName = () => {
    return this.props.contact.first_name + ' ' + this.props.contact.last_name
  }

  toggleHover = (e) => {
    this.setState({
      hover: !this.state.hover
    })
  }

  hoverStyle = () => {
    var linkStyle;
    if (this.state.hover) {
      linkStyle = {backgroundColor: 'rgba(232, 232, 232, 0.221666)'}
    } else {
      linkStyle = {backgroundColor: 'initial'}
    }
    return linkStyle
  }

  render() {
    return (
      <div className="contact" style={this.hoverStyle()} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <p className="contactName">{this.getName()}</p>
        <p>{this.props.contact.email}</p>
      </div>
    )
  }
}

// function mapStateToProps(state){
//   return {
//     currentUser: state.currentUser,
//     currentTeam: state.currentTeam,
//     team: state.team
//   }
// }
// export default connect(mapStateToProps)(Contact)
export default Contact
