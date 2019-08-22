import React, { Fragment }  from "react";
import { connect } from "react-redux"
import { List, Image, Button } from 'semantic-ui-react'
import editImage from '../edit.png'
import EditForm from './EditForm'



class Contact extends React.Component {

  state = {
    hover: false,
    editting: false
  }

  getName = () => {
    // method to concat first and last name of contact
    return this.props.contact.first_name + ' ' + this.props.contact.last_name
  }

  getInitials = () => {
    return this.props.contact.first_name[0].toUpperCase() + ' ' + this.props.contact.last_name[0].toUpperCase()
  }

  toggleHover = (e) => {
    // method to determine if the contact is being hovered
    this.setState({
      hover: !this.state.hover
    })
  }

  hoverStyle = () => {
    // method to alter the styling of the component
    var linkStyle;
    if (this.state.hover) {
      linkStyle = {backgroundColor: 'rgba(232, 232, 232, 0.221666)'}
    } else {
      linkStyle = {backgroundColor: 'initial'}
    }
    return linkStyle
  }

  showFeatures = () => {
    // will show phone number of contact
    if (this.state.hover) {
      return {display: 'block'}
    }
    else {
      return {display: 'none'}
    }
    // <List.Description className="contactDescription" style={this.showFeatures()}>
    //   {this.props.contact.phone}
    // </List.Description>
  }

  editContact = () => {
    // will render the EditForm component
    this.setState({
      editting: !this.state.editting
    })
  }

  removeIndex = (array, index) => {
    // concats array to remove element at index
    // used this method because splice does not render properly
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
    fetch(`https://contact-list-link-pt-api.herokuapp.com/${contactId}`, {
      method: "DELETE"
    })
    this.props.addContacts(newContacts)
  }

  renderPhoto = () => {
    let contact = this.props.contact
    if (contact.photo) {
      return <Image className="contactPhoto column" src={contact.photo}/>
    } else {
      return (
        <div className="avatar-circle column">
          <span className="initials">{this.getInitials()}</span>
        </div>
      )
    }

  }


  render() {
    return (
      <Fragment>
      <List.Item className="contact row" style={this.hoverStyle()} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <br/>
        {this.renderPhoto()}
        <List.Content className="contactContent column">
          <List.Header as='a' className="contactName">{this.getName()}</List.Header>
          <br/>
          <List.Description className="contactDescription" >
            {this.props.contact.email}
          </List.Description>

        </List.Content>
        <List.Content floated='right' className="column">
          <div style={this.showFeatures()}>
            <div className="delete" onClick={this.deleteContact}>X</div>
            <img className="edit" src={editImage} alt="edit-symbol" onClick={this.editContact}/>
            <div className="background-overlay" style={{display: this.state.editting ? 'block' : 'none'}}>
              <div className="overlay" style={{display: this.state.editting ? 'block' : 'none'}}>
                <EditForm id={this.props.contact.id} contact={this.props.contact} overlayStatus={this.editContact}/>
              </div>
            </div>
          </div>
        </List.Content>
      </List.Item>
      </Fragment>
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
// <List.Item className="contact" style={this.hoverStyle()} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
//   <Image avatar src={this.props.contact.photo} />
//   <List.Content>
//     <List.Header as='a' className="contactName">{this.getName()}</List.Header>
//     <List.Description classname="contactDescription" >
//       {this.props.contact.email}
//     </List.Description>
//     <List.Description classname="contactDescription" style={this.showFeatures()}>
//       {this.props.contact.phone}
//     </List.Description>
//     <List.Content floated='right'>
//       <div style={this.showFeatures()}>
//         <img className="edit" src={editImage} alt="edit-symbol" onClick={this.editContact}/>
//         <div className="background-overlay" style={{display: this.state.editting ? 'block' : 'none'}}>
//           <div className="overlay" style={{display: this.state.editting ? 'block' : 'none'}}>
//             <EditForm id={this.props.contact.id} contact={this.props.contact} overlayStatus={this.editContact}/>
//           </div>
//         </div>
//         <div className="delete" onClick={this.deleteContact}>X</div>
//       </div>
//     </List.Content>
//   </List.Content>
// </List.Item>
