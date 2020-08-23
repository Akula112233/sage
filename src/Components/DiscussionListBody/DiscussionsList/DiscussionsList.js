import React, { Component } from 'react'
import './DiscussionList.css'
import DiscussionItems from './DiscussionItems/DiscussionItems'
import { store } from '../../../Redux/redux'
import $ from 'jquery'

export default class DiscussionsList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            rooms: []
        }
    }
    

    componentDidMount() {
        // make database call here, map to discussion items
        $.ajax({
            type: "GET",
            url: "https://sageapp.tech/api/v1/rooms.php",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(store.getState().loginCred.authResponse.accessToken + ":" + ""));
            },
            success: (response) => {
                this.setState({
                    rooms: response.rooms  
                })
            }
        })
    }

    render() {
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
            </div>
        )
    }
}
