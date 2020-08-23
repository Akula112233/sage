import React, { Component } from 'react'
import './DiscussionList.css'
import DiscussionItems from './DiscussionItems/DiscussionItems'
import { store, tagStore } from '../../../Redux/redux'
import $ from 'jquery'
import Dialog from '@material-ui/core/Dialog';


export default class DiscussionsList extends Component {
    constructor(props) {
        super(props)
        this.unsubscribeTagStore = undefined

        this.state = {
            rooms: [],
            openModal: false
        }
    }

    handleClick = () => {
        this.setState({
            openModal: true
        })
    }

    handleClose = () => {
        this.setState({
            openModal: false
        })
    }

    
    renderNewRooms = () => {
        $.ajax({
            type: "GET",
            url: "https://sageapp.tech/api/v1/roomsearch.php",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(store.getState().loginCred.authResponse.accessToken + ":"));
            },
            data: {
                tags: tagStore.getState()
            },      
            success: (response) => {
                this.setState({
                    rooms: response.rooms  
                })
            }
        })

        $.ajax({
            type: "POST",
            url: "https://sageapp.tech/api/v1/updateuserinterests.php",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(store.getState().loginCred.authResponse.accessToken + ":"));
            },
            data: {
                interests: tagStore.getState()
            },
            success: (response) => {
                console.log('updates db with new tags!', response)
            }
        })
    }

    componentDidMount() {
        this.unsubscribeTagStore = tagStore.subscribe(this.renderNewRooms)

        $.ajax({
            type: "GET",
            url: "https://sageapp.tech/api/v1/roomsearch.php",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(store.getState().loginCred.authResponse.accessToken + ":"));
            },
            data: {
                tags: tagStore.getState()
            },      
            success: (response) => {
                this.setState({
                    rooms: response.rooms  
                })
            }
        })

        if (this.props.returnAll) {
            $.ajax({
                type: "GET",
                url: "https://sageapp.tech/api/v1/rooms.php",
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(store.getState().loginCred.authResponse.accessToken + ":"));
                },
                data: {
                    tags: tagStore.getState()
                },      
                success: (response) => {
                    this.setState({
                        rooms: response.rooms  
                    })
                }
            })
        }
    }

    render() {
        if (this.props.returnAll) {
            return (
                <div id="discussion-list">
                    {
                        this.state.rooms.map(roomItem => {
                            return <DiscussionItems 
                                profileLink={["https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80", "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"]} 
                                id={roomItem.id}
                                discussionName={roomItem.discussion_name}
                                type={roomItem.type}
                                moderatorUID={roomItem.creator_id}
                                description={roomItem.description}
                                currentNumMembers={roomItem.member_count}
                                memberLimit={roomItem.member_limit}
                                expirationTime={roomItem.expiration_time}
                                tagList={roomItem.tags}
                            />
                        })
                    }
                    <Dialog onClose={this.handleClose} open={this.state.openModal}>Test</Dialog>
                    <button onClick={this.handleClick} id="add-discussion-button">Create New Room</button>
                </div>
            )
        }

        if(this.state.rooms) {
            return (
                <div id="discussion-list">
                    {
                        this.state.rooms.map(roomItem => {
                            return <DiscussionItems 
                                profileLink={["https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80", "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"]} 
                                id={roomItem.id}
                                discussionName={roomItem.discussion_name}
                                type={roomItem.type}
                                moderatorUID={roomItem.creator_id}
                                description={roomItem.description}
                                currentNumMembers={roomItem.member_count}
                                memberLimit={roomItem.member_limit}
                                expirationTime={roomItem.expiration_time}
                                tagList={roomItem.tags}
                            />
                        })
                    }
                    <Dialog onClose={this.handleClose} open={this.state.openModal}>Test</Dialog>
                    <button onClick={this.handleClick} id="add-discussion-button">Create New Room</button>
                </div>
            )
        } else {
            return (
                <div id="discussion-list">

                </div>
            )
        }
        
    }
}
