import React from 'react';
import "./ChatBody.css";
import ChatList from "./ChatList/ChatList";
import SendBar from "./SendBar/SendBar";
import Button from "@material-ui/core/Button";
import {IconButton} from "@material-ui/core";
import {store} from "../../../Redux/redux";

import socketIOClient from 'socket.io-client'
const ENDPOINT = 'https://sageapp.tech:8000/'

class ChatBody extends React.Component {
    constructor(props) {
        super(props)
        this.socket = undefined;
    }

    componentDidMount() {
        this.socket = socketIOClient(ENDPOINT)
    }
    

    render() {
        let overallStyle = {display: "none", flexDirection: "column", height: '100%'}
        if(props.displayed){
            overallStyle.display = "flex"
        }
        let buttonStyle = {color: 'black', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderColor: 'black', fontFamily: 'Cabin', fontWeight: 'bold', width: '183px', margin: '15px 0 0 10px', justifyContent: 'left', padding: '5px 10px 5px 25px'}
        return (
            <div style={overallStyle}>
                <div id={'topBar'}>
                    <div id={'textButton'}>
                        <Button
                            style={buttonStyle}
                            startIcon={<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.0707 4.53H16.2407V13.035H4.3457V14.925C4.3457 15.4448 4.75745 15.87 5.2607 15.87H15.3257L18.9857 19.65V5.475C18.9857 4.95525 18.574 4.53 18.0707 4.53ZM14.4107 10.2V1.695C14.4107 1.17525 13.999 0.75 13.4957 0.75H1.6007C1.09745 0.75 0.685699 1.17525 0.685699 1.695V14.925L4.3457 11.145H13.4957C13.999 11.145 14.4107 10.7197 14.4107 10.2Z" fill="#3F4148"/>
                            </svg>
                            }
                            disabled
                        >
                            Text
                        </Button>
                    </div>
                    <div style={{margin: '3px 7px 0 0'}}>
                        <IconButton>
                            <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="36.6501" height="36.6501" rx="18.3251" fill="#DFDFDF"/>
                                <path d="M26.2396 19.5156C26.2812 19.1823 26.3125 18.8438 26.3125 18.5C26.3125 18.1563 26.2812 17.8177 26.2396 17.4844L28.4427 15.7604C28.6406 15.6042 28.6979 15.3229 28.5677 15.0938L26.4844 11.4844C26.3541 11.2604 26.0833 11.1667 25.8489 11.2604L23.2552 12.3073C22.7187 11.8958 22.1302 11.5469 21.4948 11.2813L21.1041 8.52084C21.0573 8.27605 20.8437 8.08334 20.5833 8.08334H16.4166C16.1562 8.08334 15.9427 8.27605 15.901 8.52084L15.5104 11.2813C14.875 11.5469 14.2864 11.8906 13.75 12.3073L11.1562 11.2604C10.9218 11.1719 10.651 11.2604 10.5208 11.4844L8.43747 15.0938C8.30726 15.3177 8.36456 15.599 8.56247 15.7604L10.7604 17.4844C10.7187 17.8177 10.6875 18.1563 10.6875 18.5C10.6875 18.8438 10.7187 19.1823 10.7604 19.5156L8.56247 21.2396C8.36456 21.3958 8.30726 21.6771 8.43747 21.9063L10.5208 25.5156C10.651 25.7396 10.9218 25.8333 11.1562 25.7396L13.75 24.6927C14.2864 25.1042 14.875 25.4531 15.5104 25.7188L15.901 28.4792C15.9427 28.724 16.1562 28.9167 16.4166 28.9167H20.5833C20.8437 28.9167 21.0573 28.724 21.0989 28.4792L21.4896 25.7188C22.125 25.4531 22.7135 25.1094 23.25 24.6927L25.8437 25.7396C26.0781 25.8281 26.3489 25.7396 26.4791 25.5156L28.5625 21.9063C28.6927 21.6823 28.6354 21.4011 28.4375 21.2396L26.2396 19.5156ZM18.5 22.1458C16.4843 22.1458 14.8541 20.5156 14.8541 18.5C14.8541 16.4844 16.4843 14.8542 18.5 14.8542C20.5156 14.8542 22.1458 16.4844 22.1458 18.5C22.1458 20.5156 20.5156 22.1458 18.5 22.1458Z" fill="black"/>
                            </svg>
                            {/*<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                            {/*    <path d="M20.2396 13.5156C20.2812 13.1823 20.3125 12.8438 20.3125 12.5C20.3125 12.1563 20.2812 11.8177 20.2396 11.4844L22.4427 9.76043C22.6406 9.60418 22.6979 9.32293 22.5677 9.09376L20.4844 5.48439C20.3541 5.26043 20.0833 5.16668 19.8489 5.26043L17.2552 6.3073C16.7187 5.89584 16.1302 5.54689 15.4948 5.28126L15.1041 2.52084C15.0573 2.27605 14.8437 2.08334 14.5833 2.08334H10.4166C10.1562 2.08334 9.94268 2.27605 9.90102 2.52084L9.51039 5.28126C8.87497 5.54689 8.28643 5.89064 7.74997 6.3073L5.15622 5.26043C4.92185 5.17189 4.65102 5.26043 4.52081 5.48439L2.43747 9.09376C2.30726 9.31772 2.36456 9.59897 2.56247 9.76043L4.76039 11.4844C4.71872 11.8177 4.68747 12.1563 4.68747 12.5C4.68747 12.8438 4.71872 13.1823 4.76039 13.5156L2.56247 15.2396C2.36456 15.3958 2.30726 15.6771 2.43747 15.9063L4.52081 19.5156C4.65102 19.7396 4.92185 19.8333 5.15622 19.7396L7.74997 18.6927C8.28643 19.1042 8.87497 19.4531 9.51039 19.7188L9.90102 22.4792C9.94268 22.724 10.1562 22.9167 10.4166 22.9167H14.5833C14.8437 22.9167 15.0573 22.724 15.0989 22.4792L15.4896 19.7188C16.125 19.4531 16.7135 19.1094 17.25 18.6927L19.8437 19.7396C20.0781 19.8281 20.3489 19.7396 20.4791 19.5156L22.5625 15.9063C22.6927 15.6823 22.6354 15.4011 22.4375 15.2396L20.2396 13.5156ZM12.5 16.1458C10.4843 16.1458 8.85414 14.5156 8.85414 12.5C8.85414 10.4844 10.4843 8.85418 12.5 8.85418C14.5156 8.85418 16.1458 10.4844 16.1458 12.5C16.1458 14.5156 14.5156 16.1458 12.5 16.1458Z" fill="black"/>*/}
                            {/*</svg>*/}
                        </IconButton>
                    </div>
                </div>
                <div style={{padding: '10px 15px 0 15px', height: '100%'}}>
                    <ChatList socket={this.socket} currentStore={props.currentStore} currentRoom={props.currentRoom}/>
                </div>
                <SendBar socket={this.socket}/>
            </div>
        );
    }
};

export default ChatBody;
