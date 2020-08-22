import React, {Component} from 'react';
import SideBar from "./SideBar/SideBar";
import ChatBody from "./ChatBody/ChatBody";
import VideoVoiceBody from "./VideoVoiceBody/VideoVoiceBody";
import WhiteboardBody from "./WhiteboardBody/WhiteboardBody";
import './DiscussionRoomBody.css'

class DiscussionRoomBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoomId: 1,
            selectedView: 0,
        }
    }

    selectedViewSettingHandler = (selectedView) => {
        this.setState({
            selectedView: selectedView
        })
    }

    render(){
        let currentView = <ChatBody/>
        if(this.state.selectedView === 1){
            currentView = <VideoVoiceBody/>
        }
        else if(this.state.selectedView === 2){
            currentView = <WhiteboardBody/>
        }
        return (
            <div>
                <div>
                    <SideBar buttonHandler={this.selectedViewSettingHandler}/>
                </div>
                <div>
                    {currentView}
                </div>
            </div>
        );
    }
}

export default DiscussionRoomBody;