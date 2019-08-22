import React from "react";
import { connect } from "react-redux"

class ContactForm extends React.Component {

  state = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    photo: null
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch("http://localhost:3000/api/v1/contacts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
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
      // add contact to Redux store for all contacts
      this.props.addContact(response)
      // close overlay
      this.props.overlayStatus()
      // reset form
      this.setState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        photo: null
      })
    })
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
          <div className="photo-circle column">
            <span className="addPhoto">Add Photo</span>
          </div>
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
    addContact: (contact) => {dispatch({type: "ADD_CONTACT", payload: contact })}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)


// export default ContactForm
