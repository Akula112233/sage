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
        return (
            <div id={'discussionRoomBodyContainer'}>
                <SideBar buttonHandler={this.selectedViewSettingHandler}/>
                <div>
                    <ChatBody currentRoomId={this.state.currentRoomId} displayed={this.state.selectedView === 0}/>
                    <VideoVoiceBody currentRoomId={this.state.currentRoomId} displayed={this.state.selectedView === 1}/>
                    <WhiteboardBody currentRoomId={this.state.currentRoomId} displayed={this.state.selectedView === 2}/>
                </div>
            </div>
        );
    }
}

export default DiscussionRoomBody;