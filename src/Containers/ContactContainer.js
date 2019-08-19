import React from "react"
import Contact from "../components/Contact"
import { connect } from "react-redux"

class ContactContainer extends React.Component {

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/contacts')
    .then(res => res.json())
    .then(contacts => {
      this.props.addContacts(contacts)
    })
  }

  renderContacts = () => {
    console.log(this.props.allContacts);
    return this.props.allContacts.map(contact => {
        return <Contact key={contact.id} contact={contact}/>
      })
  }

  render() {
    return (
      <div className="contactContainer">

        {this.renderContacts()}
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
    addContacts: (contacts) => {dispatch({type: "GET_CONTACTS", payload: contacts })}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer)
