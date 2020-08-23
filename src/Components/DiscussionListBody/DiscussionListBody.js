import React, { Component } from 'react'
import './DiscussionListBody.css'
import TagsBody from './TagsBody/TagsBody'
import DiscussionsNavBar from './DiscussionsNavBar/DiscussionsNavBar'
import DiscussionsList from './DiscussionsList/DiscussionsList'


export default class DiscussionListBody extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            page: 0
        }
    }

    changePage = (num) => {
        this.setState({
            page: num
        })
    }
    
    render() {
        if (this.state.page === 0) {
            return (
                <div id="discussion-list-body">
                    <DiscussionsNavBar setPage={(num) => this.changePage(num)} ></DiscussionsNavBar>
                    <div style={{height: "1px", width: "100%", backgroundColor: "#EAECF3"}}></div>
                    <TagsBody></TagsBody>
                    <div style={{marginTop: "3px", height: "1px", width: "100%", backgroundColor: "#EAECF3"}}></div>
                    <DiscussionsList></DiscussionsList>
                </div>
            )
        } 
        return (
            <div id="discussion-list-body">
                <DiscussionsNavBar setPage={(num) => this.changePage(num)}></DiscussionsNavBar>
                <div style={{height: "1px", width: "100%", backgroundColor: "#EAECF3"}}></div>
                <DiscussionsList returnAll={true}></DiscussionsList>
            </div>
        )
       
    }
}
