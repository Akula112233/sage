import React from 'react';
import './App.css';
import DiscussionListBody from '../Components/DiscussionListBody/DiscussionListBody'
import Topbar from '../Components/Topbar/topbar'
import DiscussionRoomBody from "../Components/DiscussionRoomBody/DiscussionRoomBody";

function App() {
    return (
        <div className="App">
            <Topbar></Topbar>

            <div id="discussion-container">
                <DiscussionListBody/>
                <DiscussionRoomBody/>
            </div>
        </div>
    );
}

export default App;
