import React, {Component} from 'react';
import SideBar from "./SideBar/SideBar";
import ChatBody from "./ChatBody/ChatBody";
import VideoVoiceBody from "./VideoVoiceBody/VideoVoiceBody";
import WhiteboardBody from "./WhiteboardBody/WhiteboardBody";
import './DiscussionRoomBody.css'
import {store} from "../../Redux/redux";

class DiscussionRoomBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoomId: 1,
            selectedView: 0,
        }
        this.unsubscribe = undefined
    }

    storeChanger = () => {
        console.log(store.getState())
    }

    componentDidMount() {
        console.log(store.getState(), ";lksjg;lkdj;lghwjlghfkg")
        this.unsubscribe = store.subscribe(this.storeChanger)
    }


    selectedViewSettingHandler = (newSelectedView) => {
        this.setState({
            selectedView: newSelectedView
        })
    }

    render(){
        return (
            <div id={'discussionRoomBodyContainer'}>
                <SideBar buttonHandler={this.selectedViewSettingHandler}/>
                <div id={'discussionRoomActualBody'}>
                    <ChatBody currentRoomId={this.state.currentRoomId} displayed={this.state.selectedView === 0}/>
                    <VideoVoiceBody currentRoomId={this.state.currentRoomId} displayed={this.state.selectedView === 1}/>
                    <WhiteboardBody currentRoomId={this.state.currentRoomId} displayed={this.state.selectedView === 2}/>
                </div>
            </div>
        );
    }
}

export default DiscussionRoomBody;