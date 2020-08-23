import React, { Component } from 'react'
import './DiscussionListBody.css'
import TagsBody from './TagsBody/TagsBody'
import DiscussionsNavBar from './DiscussionsNavBar/DiscussionsNavBar'
import DiscussionsList from './DiscussionsList/DiscussionsList'

export default class DiscussionListBody extends Component {
    render() {
        return (
            <div id="discussion-list-body">
                <DiscussionsNavBar></DiscussionsNavBar>
                <div style={{height: "1px", width: "100%", backgroundColor: "#EAECF3"}}></div>
                <TagsBody></TagsBody>
                <div style={{marginTop: "3px", height: "1px", width: "100%", backgroundColor: "#EAECF3"}}></div>
                <DiscussionsList></DiscussionsList>
            </div>
        )
    }
}
