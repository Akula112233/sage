import React from 'react';
import './App.css';
import DiscussionListBody from '../Components/DiscussionListBody/DiscussionListBody'
import Topbar from '../Components/Topbar/topbar'


function App() {
  return (
    <div className="App">
      <Topbar></Topbar>
      <div id="discussion-container">
        <DiscussionListBody></DiscussionListBody>
      </div>
    </div>
  );
}

export default App;
