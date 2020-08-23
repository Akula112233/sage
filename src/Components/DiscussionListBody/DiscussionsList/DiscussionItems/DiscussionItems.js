import React, { Component } from 'react'
import './DiscussionItems.css'
import './DiscussionItems.css'
import { store, changeCurrentRoom } from '../../../../Redux/redux.js'

export default class DiscussionItems extends Component {
    constructor(props) {
        super(props)
        this.unsusbscribe = undefined

        this.state = {
            selected: false
        }
    }

    onReduxChange = () => {
        this.setState({
            selected: this.props.id === store.getState().currentRoom.id
        })
    }

    componentDidMount() {
        // subscripe to redux store, pass the above function
        this.unsusbscribe = store.subscribe(this.onReduxChange)
    }

    handleClick = () => {
        // Update redux
        let currentRoom = {
            id: this.props.id,
            moderatorUID: this.props.moderatorUID,
            description: this.props.description,
            discussionName: this.props.discussionName,
            currentNumMembers: this.props.currentNumMembers,
            memberLimit: this.props.memberLimit,
            expirationTime: this.props.expirationTime,
            type: this.props.type,
            password: this.props.password,
            tagList: this.props.tagList
        }
        store.dispatch(changeCurrentRoom(currentRoom))
    }
    
    render() {
        if (this.props.type !== 0) {
            if (this.state.selected) {
                return (
                    <div className="item-container">
                        <div onClick={this.handleClick} className="item-guts-container">
                            <div id="selected-indicator"></div>
                            <div className="item-profilepic">
                                <img style={{left: "27%", bottom: "25%"}} className="profilepic-stack" height="30" width="30" src={this.props.profileLink[0]} alt="!"></img>
                                <img style={{left: "45%", bottom: "45%"}} className="profilepic-stack" height="30" width="30" src={this.props.profileLink[1]} alt="!"></img>
                            </div>
                            <div className="item-info">
                                <h3 className="item-title">{this.props.discussionName}
                                    <svg style={{marginLeft: "5px"}} width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.375 5.66667H10.5625V4.04762C10.5625 1.81333 8.7425 0 6.5 0C4.2575 0 2.4375 1.81333 2.4375 4.04762V5.66667H1.625C0.727188 5.66667 0 6.39119 0 7.28571V15.381C0 16.2755 0.727188 17 1.625 17H11.375C12.2728 17 13 16.2755 13 15.381V7.28571C13 6.39119 12.2728 5.66667 11.375 5.66667ZM6.5 12.9524C5.60219 12.9524 4.875 12.2279 4.875 11.3333C4.875 10.4388 5.60219 9.71429 6.5 9.71429C7.39781 9.71429 8.125 10.4388 8.125 11.3333C8.125 12.2279 7.39781 12.9524 6.5 12.9524ZM9.01875 5.66667H3.98125V4.04762C3.98125 2.66333 5.11063 1.5381 6.5 1.5381C7.88937 1.5381 9.01875 2.66333 9.01875 4.04762V5.66667Z" fill="#3F4148"/>
                                    </svg>
                                </h3>
                                <p className="item-desc">{this.props.description}</p>
                                <p className="item-nummembers">{this.props.currentNumMembers + "/" + this.props.memberLimit +" Members Online"}</p>
                            </div>
                        </div>
                        <div style={{height: "1px", width: "100%", backgroundColor: "#EAECF3"}}></div>
                    </div>
                )
            } else {
                return (
                    <div className="item-container">
                        <div onClick={this.handleClick} className="item-guts-container">
                            <div className="item-profilepic">
                                <img style={{left: "27%", bottom: "25%"}} className="profilepic-stack" height="30" width="30" src={this.props.profileLink[0]} alt="!"></img>
                                <img style={{left: "45%", bottom: "45%"}} className="profilepic-stack" height="30" width="30" src={this.props.profileLink[1]} alt="!"></img>                            </div>
                            <div className="item-info">
                                <h3 className="item-title">{this.props.discussionName}
                                    <svg style={{marginLeft: "5px"}} width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.375 5.66667H10.5625V4.04762C10.5625 1.81333 8.7425 0 6.5 0C4.2575 0 2.4375 1.81333 2.4375 4.04762V5.66667H1.625C0.727188 5.66667 0 6.39119 0 7.28571V15.381C0 16.2755 0.727188 17 1.625 17H11.375C12.2728 17 13 16.2755 13 15.381V7.28571C13 6.39119 12.2728 5.66667 11.375 5.66667ZM6.5 12.9524C5.60219 12.9524 4.875 12.2279 4.875 11.3333C4.875 10.4388 5.60219 9.71429 6.5 9.71429C7.39781 9.71429 8.125 10.4388 8.125 11.3333C8.125 12.2279 7.39781 12.9524 6.5 12.9524ZM9.01875 5.66667H3.98125V4.04762C3.98125 2.66333 5.11063 1.5381 6.5 1.5381C7.88937 1.5381 9.01875 2.66333 9.01875 4.04762V5.66667Z" fill="#3F4148"/>
                                    </svg>
                                </h3>
                                <p className="item-desc">{this.props.description}</p>
                                <p className="item-nummembers">{this.props.currentNumMembers + "/" + this.props.memberLimit +" Members Online"}</p>
                            </div>
                        </div>
                        <div style={{height: "1px", width: "100%", backgroundColor: "#EAECF3"}}></div>
                    </div>
                )
            }
        }

        if (this.state.selected) {
            return (
                <div className="item-container">
                    <div onClick={this.handleClick} className="item-guts-container">
                        <div id="selected-indicator"></div>
                        <div className="item-profilepic">
                            <img style={{left: "27%", bottom: "25%"}} className="profilepic-stack" height="30" width="30" src={this.props.profileLink[0]} alt="!"></img>
                            <img style={{left: "45%", bottom: "45%"}} className="profilepic-stack" height="30" width="30" src={this.props.profileLink[1]} alt="!"></img>                        </div>
                        <div className="item-info">
                            <h3 className="item-title">{this.props.discussionName}</h3>
                            <p className="item-desc">{this.props.description}</p>
                            <p className="item-nummembers">{this.props.currentNumMembers + "/" + this.props.memberLimit +" Members Online"}</p>
                        </div>
                    </div>
                    <div style={{height: "1px", width: "100%", backgroundColor: "#EAECF3"}}></div>
                </div>
            )
        }
        return (
            <div className="item-container">
                <div onClick={this.handleClick} className="item-guts-container">
                    <div className="item-profilepic">
                        <img style={{left: "27%", bottom: "25%"}} className="profilepic-stack" height="30" width="30" src={this.props.profileLink[0]} alt="!"></img>
                        <img style={{left: "45%", bottom: "45%"}} className="profilepic-stack" height="30" width="30" src={this.props.profileLink[1]} alt="!"></img>                    </div>
                    <div className="item-info">
                        <h3 className="item-title">{this.props.discussionName}</h3>
                        <p className="item-desc">{this.props.description}</p>
                        <p className="item-nummembers">{this.props.currentNumMembers + "/" + this.props.memberLimit +" Members Online"}</p>
                    </div>
                </div>
                <div style={{height: "1px", width: "100%", backgroundColor: "#EAECF3"}}></div>
            </div>
        )
    }
}
