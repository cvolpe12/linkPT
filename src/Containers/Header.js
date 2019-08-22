import React from "react"
import ContactForm from "../components/ContactForm"

class Header extends React.Component {

  state = {
    showOverlay: false
  }

  handleOverlay = () => {
    // will determine if the overlay will be shown or not
    this.setState({
      showOverlay: !this.state.showOverlay
    })
  }

  render() {
    return (
      <div className="contactHeader">
          <p className="contactTitle">My Contacts</p>
          <button className="addContact" type="button" onClick={this.handleOverlay}>+</button>
          <div className="headerBar"></div>
          <div className="background-overlay" style={{display: this.state.showOverlay === true ? 'block' : 'none'}}>
            <div className="overlay" style={{display: this.state.showOverlay === true ? 'block' : 'none'}}>
              <ContactForm overlayStatus={this.handleOverlay}/>
            </div>
          </div>
      </div>
    )
  }
}

export default Header
