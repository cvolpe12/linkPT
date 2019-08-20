import React from "react";
import { connect } from "react-redux"
import { List, Image } from 'semantic-ui-react'


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
        <List.Item>
          <Image avatar src={this.props.contact.photo} />
          <List.Content>
            <List.Header as='a'>{this.getName()}</List.Header>
            <List.Description>
              {this.props.contact.email}
            </List.Description>
          </List.Content>
        </List.Item>
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
