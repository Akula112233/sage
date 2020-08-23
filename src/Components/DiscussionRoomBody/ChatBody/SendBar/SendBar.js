import React, {Component} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import './SendBar.css'

class SendBar extends Component {
    state = {
        fieldValue: ""
    }

    sendMessageHandler = () => {
        console.log(this.state.fieldValue)
        this.setState({fieldValue: ""})
    }

    render() {
        return (
            <div id={'sendBar'}>
                <div id={'innerSend'}>
                    <TextField onKeyDown={(event) => {if(event.key === "Enter"){this.sendMessageHandler()}}} value={this.state.fieldValue} onChange={(event) => this.setState({fieldValue: event.target.value})} id={"standard-basic"} label={"Type your message..."}/>
                    <IconButton onClick={this.sendMessageHandler}>
                        <svg width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.00012207" width="39.8102" height="34.44" rx="17.22" fill="#48B1BF"/>
                            <path d="M15.0671 17.22L19.9051 12.4366L24.7432 17.22M19.9051 22.0033V13.12V22.0033Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default SendBar;