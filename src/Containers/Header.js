import React from "react"
import ContactForm from "../components/ContactForm"

class Header extends React.Component {

  state = {
    showOverlay: false
  }

  handleOverlay = e => {
    console.log(this.state.showOverlay);
    e.preventDefault()
    this.setState({
      showOverlay: !this.state.showOverlay
    })
  }

  render() {
    return (
      <div className="top">
        <div className="header">
          <p className="contactHeader">My Contacts</p>
          <button className="addContact" type="button" onClick={this.handleOverlay}>+</button>
          <div className="background-overlay" style={{display: this.state.showOverlay === true ? 'block' : 'none'}}>
            <div className="overlay" style={{display: this.state.showOverlay === true ? 'block' : 'none'}}>
              <ContactForm overlayStatus={this.handleOverlay}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


// function mapStateToProps(state){
//   return {
//     showOverlay: state.showOverlay
//   }
// }
//
// function mapDispatchToProps(dispatch){
//   return {
//     showOverlay: (overlay) => {dispatch({type: "SHOW_OVERLAY", payload: overlay })}
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Header)

export default Header
