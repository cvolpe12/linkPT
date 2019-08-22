import React from "react"
import Contact from "../components/Contact"
import { connect } from "react-redux"
import { List, Image } from 'semantic-ui-react'


class ContactContainer extends React.Component {

  componentDidMount(){
    // call backend to get all contacts
    fetch('https://contact-list-link-pt-api.herokuapp.com/')
    .then(res => res.json())
    .then(contacts => {
      // store contacts using Redux store
      this.props.addContacts(contacts)
    })
  }

  renderContacts = () => {
    let contacts = this.props.allContacts
    // sort contacts because edit causes database to reorder
    let sortedContacts = contacts.sort(function(a, b) {
      return a.id - b.id
    });
    // render individual contact components
    return sortedContacts.map(contact => {
        return <Contact key={contact.id} contact={contact}/>
      })
  }

  render() {
    return (
        <List divided relaxed className="contactContainer">
          {this.renderContacts()}
        </List>
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
