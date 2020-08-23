import React, {Component} from 'react';
import './ChatList.css'

class ChatList extends Component {
    constructor(props) {
        super(props);
    }

    userId = 1//need to get from REDUX

    //messages Array below would normally be something like Api.getMessagesByRoomId(this.props.currentRoomId)
    messagesArray = [
        {
            sender_uid: 1,
            message: "Hello everyone! My name is sender_uid 1!",
            time_stamp: '7:48 PM',

        },
        {
            sender_uid: 2,
            message: "Hey12345",
            time_stamp: '7:48 PM',

        },
        {
            sender_uid: 2,
            message: "Hey12345",
            time_stamp: '7:48 PM',

        },
        {
            sender_uid: 2,
            message: "Hey12345",
            time_stamp: '7:48 PM',

        },
        {
            sender_uid: 2,
            message: "Hey12345",
            time_stamp: '7:48 PM',

        },
        {
            sender_uid: 3,
            message: "Hello hello! You're so coool!",
            time_stamp: '7:48 PM',

        },
        {
            sender_uid: 1,
            message: "Hello again everyone! My name is sender_uid 1!",
            time_stamp: '7:48 PM',

        },
    ]//Api.getMessagesByRoomId(this.props.currentRoomId)

    messageComponentsArray = this.messagesArray.map(message => {
            let innerMessageStyle = {backgroundColor: '#48B1BF'};
            if(message.sender_uid === this.userId) {
                innerMessageStyle.backgroundColor = '#c0e9ef'
            }
            return(
                <div id={'outerMessage'}>
                    <p style={{margin: 0}}>{"Margaret" + message.sender_uid + " " + message.time_stamp}</p>  {/* This would normally have the actual user, given probably in a database call */}
                    <div id={'innerMessage'} style={innerMessageStyle}>
                        <p style={{margin: 0, padding: 0}}>{message.message}</p>
                    </div>
                </div>
            )
        }
    )

    render() {
        return (
            <div>
                {this.messageComponentsArray}
            </div>
        );
    }
}

export default ChatList;