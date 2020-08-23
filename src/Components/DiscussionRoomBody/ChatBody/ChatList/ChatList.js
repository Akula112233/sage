import React, {Component} from 'react';
import './ChatList.css'
import {store} from "../../../../Redux/redux";
import $ from 'jquery'

class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagesArray: [
                {
                    sender_uid: 1,
                    content: "Hello everyone! My name is author_id 1!",
                    time_send: '7:48 PM',

                },
                {
                    author_id: 2,
                    content: "Hey12345",
                    time_send: '7:48 PM',

                },
                {
                    author_id: 2,
                    content: "Hey12345",
                    time_send: '7:48 PM',

                },
                {
                    author_id: 2,
                    content: "Hey12345",
                    time_send: '7:48 PM',

                },
                {
                    author_id: 2,
                    content: "Hey12345",
                    time_send: '7:48 PM',

                },
                {
                    author_id: 3,
                    content: "Hello hello! You're so coool!",
                    time_send: '7:48 PM',

                },
                {
                    author_id: 1,
                    content: "Hello again everyone! My name is author_id 1!",
                    time_send: '7:48 PM',

                },
            ]
        }
    }

    userId = 0//this.props.currentStore.userInfo.userID//need to get from REDUX

    //messages Array below would normally be something like Api.getMessagesByRoomId(this.props.currentRoomId)
    //messagesArray = //Api.getMessagesByRoomId(this.props.currentRoomId)

    componentDidMount() {
        this.props.socket.on('new message', (msg) => {
            console.log(msg)
            let temp = [...this.state.messagesArray]
            temp.push({
                sender_uid: msg.author,
                content: msg.message,
                time_send: ""
            })
            this.setState({
                messagesArray: temp
            })
        })




        $.ajax({
            type: "GET",
            url: "https://sageapp.tech/api/v1/messages.php?room=" + this.props.currentRoom.id,
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(store.getState().loginCred.authResponse.accessToken + ":" + ""));
            },
            success: (response) => {
                console.log(response)
                this.setState({
                    messagesArray: response.messages
                })
            },
            error: (response) => {
                console.log(response, 'if messages error')
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.currentRoom.id !== this.props.currentRoom.id){
            $.ajax({
                type: "GET",
                url: "https://sageapp.tech/api/v1/messages.php?room=" + this.props.currentRoom.id,
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(store.getState().loginCred.authResponse.accessToken + ":" + ""));
                },
                success: (response) => {
                    console.log(response)
                    this.setState({
                        messagesArray: response.messages
                    })
                },
                error: (response) => {
                    console.log(response, 'if messages error')
                }
            })
        }
    }


    render() {
        console.log(this.state.messagesArray)
        let messageComponentsArray = this.state.messagesArray.map(message => {
                let innerMessageStyle = {backgroundColor: '#48B1BF'};
                if(message.author_id !== store.getState().loginCred.authResponse.userID) {
                    innerMessageStyle.backgroundColor = '#c0e9ef'
                }
                return(
                    <div id={'outerMessage'}>
                        <p style={{margin: 0}}>{message.author_id + " "}</p>  {/* This would normally have the actual user, given probably in a database call */}
                        <div id={'innerMessage'} style={innerMessageStyle}>
                            <p style={{margin: 0, padding: 0}}>{message.content}</p>
                        </div>
                    </div>
                )
            }
        )
        console.log('whole store', this.props.currentStore)

        return (
            <div>
                {messageComponentsArray}
            </div>
        );
    }
}

export default ChatList;