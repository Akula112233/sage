import React, {Component} from 'react';
import SideBar from "./SideBar/SideBar";
import ChatBody from "./ChatBody/ChatBody";
import VideoVoiceBody from "./VideoVoiceBody/VideoVoiceBody";
import WhiteboardBody from "./WhiteboardBody/WhiteboardBody";
import './DiscussionRoomBody.css'
import {store} from "../../Redux/redux";
import $ from 'jquery'
import {Dialog} from "@material-ui/core";

class DiscussionRoomBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoomId: 1,
            selectedView: 0,
            messages: [],
            currentRoom: {
                id: "",
                moderatorUID: "",
                description: "",
                discussionName: "",
                currentNumMembers: 0,
                memberLimit: 20,
                expirationTime: 20,
                lastActiveTime: 0,
                type: 0,
                password: null,
                tagList: []
            },
            open: false,
            message: 'error or success message',
            password: "",
            showPasswordField: true
        }
        this.unsubscribe = undefined
    }

    storeChanger = () => {
        if(this.state.currentRoomId !== store.getState().currentRoom.id){
            console.log('this was clicked. new id is', store.getState().currentRoom.id)
            console.log('the room itself', store.getState().currentRoom)
            this.authenticateUserForRoom()
        }
    }

    authenticateUserForRoom =  () => {
        if(store.getState().currentRoom.type == 0){
            console.log('this is if authenticate user for room wihtout password is called')
            $.ajax({
                type: "POST",
                url: "https://sageapp.tech/api/v1/joinroom.php/",
                dataType: 'json',
                beforeSend: function (xhr) {
                    console.log(store.getState().loginCred.authResponse.accessToken)
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(store.getState().loginCred.authResponse.accessToken + ":" + ""));
                },
                data: {
                    'id': store.getState().currentRoom.id,
                },
                success: (response) => {
                    console.log(response, 'successfully joined room')
                    if(response.success){
                        this.setState({
                            currentRoomId: store.getState().currentRoom.id,
                            currentRoom: store.getState().currentRoom
                        })
                    }
                    else{
                        console.log(response, 'this is the error catcher')
                        this.setState({
                            message: response.error_message,
                            open: true
                        })
                    }
                },
                error: (response) => {
                    console.log(response, 'this is the error catcher')
                    this.setState({
                        message: response.error_message,
                        open: true
                    })
                }
            })
        }
        else{
            this.setState({open: true, message: 'Enter Password to join this room.', showPasswordField: true})
        }
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(this.storeChanger)
        this.setState({
            currentRoom: store.getState().currentRoom
        })
        this.authenticateUserForRoom()
    }

    selectedViewSettingHandler = (newSelectedView) => {
        this.setState({
            selectedView: newSelectedView
        })
    }

    handleClose = () => {
        this.setState({open: false})
    }

    handleChange = (event) => {
        this.setState({password: event.target.value})
    }

    clickEnterHandler = () => {
        $.ajax({
            type: "POST",
            url: "https://sageapp.tech/api/v1/joinroom.php/",
            dataType: 'json',
            beforeSend: function (xhr) {
                console.log(store.getState().loginCred.authResponse.accessToken)
                xhr.setRequestHeader("Authorization", "Basic " + btoa(store.getState().loginCred.authResponse.accessToken + ":" + ""));
            },
            data: {
                'id': store.getState().currentRoom.id,
                'password': this.state.password
            },
            success: (response) => {
                console.log(response, 'successfully joined room')
                if(response.success){
                    this.setState({
                        currentRoomId: store.getState().currentRoom.id,
                        currentRoom: store.getState().currentRoom
                    },() => {
                        console.log(this.state.currentRoom, this.state.currentRoomId)
                    })
                }
                else{
                    console.log(response, 'this is the error catcher')
                    this.setState({
                        message: response.error_message,
                        open: true,
                        showPasswordField: false
                    })
                }
            },
            error: (response) => {
                console.log(response, 'this is the error catcher')
                this.setState({
                    message: response.error_message,
                    open: true
                })
            }
        })
        this.setState({password: "", open: false})
    }

    render(){
        let dialog = (
            <Dialog open={this.state.open} onClose={this.handleClose}>
                {this.state.message}
            </Dialog>
        )
        if(store.getState().currentRoom.type == 2 && this.state.showPasswordField){
            dialog = (
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <div>
                        {this.state.message}
                        <input value={this.state.password} onChange={this.handleChange} onKeyDown={(event) => {if(event.key === "Enter"){this.clickEnterHandler()}}} type="password"/>
                    </div>
                </Dialog>
            )
        }

        return (
            <div id={'discussionRoomBodyContainer'}>
                <SideBar currentRoom={this.state.currentRoom} buttonHandler={this.selectedViewSettingHandler}/>
                <div id={'discussionRoomActualBody'}>
                    {dialog}
                    <ChatBody currentStore={store.getState()} currentRoom={this.state.currentRoom} currentRoomId={this.state.currentRoomId} displayed={this.state.selectedView === 0}/>
                    <VideoVoiceBody currentStore={store.getState()} currentRoom={this.state.currentRoom} currentRoomId={this.state.currentRoomId} displayed={this.state.selectedView === 1}/>
                    <WhiteboardBody currentStore={store.getState()} currentRoom={this.state.currentRoom} currentRoomId={this.state.currentRoomId} displayed={this.state.selectedView === 2}/>
                </div>
            </div>
        );
    }
}

export default DiscussionRoomBody;