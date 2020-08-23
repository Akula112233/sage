import React from 'react';
import './App.css';
import DiscussionListBody from '../Components/DiscussionListBody/DiscussionListBody'
import Topbar from '../Components/Topbar/topbar'
import { store, loginUser } from '../Redux/redux'


class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loggedIn: false
    }
  }

  handleClick = () => {
    // open facebook modal
    window.FB.login((response) => {
      if (response.status === "connected") {
        store.dispatch(loginUser(response))
        this.setState({
          loggedIn: true
        })
      } else {
        console.log(response)
      }
    })
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="App">
          <div className="actual-app">
            <Topbar></Topbar>
            <div id="discussion-container">
              <DiscussionListBody></DiscussionListBody>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="temp-screen">
          <div id="login-modal">
            <h1 id="login-header">Welcome to Sage!</h1>
            <p id="login-intro">Sage helps you connect with others and join text, voice, and drawing rooms on specific topics in order to bring us closer together. To begin, sign in with Facebook!</p>
            <button onClick={this.handleClick} id="login-button">Sign in with Facebook
              <svg style={{marginLeft: "2px"}} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83805 10.5667V1.68333M1 5.78333L5.83805 1L10.6761 5.78333" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )
    }
    
  }
  
}

export default App;
