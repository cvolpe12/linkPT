import React from "react";
import { connect } from "react-redux"
import { List, Image, Button } from 'semantic-ui-react'
import editImage from '../edit.png'



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

  showFeatures = () => {
    if (this.state.hover) {
      return {display: 'block'}
    }
    else {
      return {display: 'none'}
    }
  }

  editContact = () => {
    console.log("editting contact");
  }

  removeIndex = (array, index) => {
    return [
      ...array.slice(0,index),
      ...array.slice(index +1)
    ];
  };

  deleteContact = () => {
    let arr = this.props.allContacts
    let index = arr.indexOf(this.props.contact)
    let newContacts = this.removeIndex(arr,index)
    let contactId = this.props.contact.id
    fetch(`http://localhost:3000/api/v1/contacts/${contactId}`, {
      method: "DELETE"
    })
    this.props.addContacts(newContacts)
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
          <List.Content floated='right'>
            <div style={this.showFeatures()}>
              <img className="edit" src={editImage} alt="edit-symbol" onClick={this.editContact}/>
              <div className="delete" onClick={this.deleteContact}>X</div>
            </div>
          </List.Content>
        </List.Content>
      </List.Item>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    allContacts: state.allContacts
  }
}

function mapDispatchToProps(dispatch){
  return {
    addContacts: (contacts) => {dispatch({type: "GET_CONTACTS", payload: contacts })},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
// export default Contact
