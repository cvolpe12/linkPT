import React from "react";
import { connect } from "react-redux"
import { Image } from 'semantic-ui-react'


class EditForm extends React.Component {

  state = {
    first_name: this.props.contact.first_name,
    last_name: this.props.contact.last_name,
    phone: this.props.contact.phone,
    email: this.props.contact.email,
    photo: this.props.contact.photo
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    // clone redux store of all contacts in order to edit location without mutating original store
    let contacts = [...this.props.allContacts]
    let index = contacts.indexOf(this.props.contact)
    fetch(`https://contact-list-link-pt-api.herokuapp.com/${this.props.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
			body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone: this.state.phone,
        email: this.state.email,
        photo: this.state.photo
      })
		})
		.then(res => res.json())
		.then((response) => {
      contacts[index] = response
      this.props.addContacts(contacts)
      this.props.overlayStatus()
    })
  }

  renderPhoto = () => {
    let contact = this.props.contact
    if (contact.photo) {
      return <Image className="contactPhoto column" src={contact.photo}/>
    } else {
      return (
        <div className="photo-circle column">
          <span className="addPhoto">Edit Photo</span>
        </div>
      )
    }

  }

  render() {
    return (
      <div>
        <p className="cancel" onClick={this.props.overlayStatus}>Cancel</p>
        <form onSubmit={this.handleSubmit}>
          <input className="btn" type="submit" value="Save" />
          <br/>
          <br/>
          <br/>
          <br/>
          {this.renderPhoto()}
          <div className="inputAttributes">
            <br/>
            <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} placeholder='First Name'/>
            <br/>
            <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} placeholder='Last Name'/>
          </div>
          <br/>
          <div className="inputAttributes">
            <label className="label">phone: </label>
            <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder='+1 XXX XXX XXX'/>
          </div>
          <br/>
          <div className="inputAttributes">
            <label className="label">e-mail: </label>
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder='example@gmail.com'/>
          </div>
        </form>

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

export default connect(mapStateToProps, mapDispatchToProps)(EditForm)


// export default ContactForm
