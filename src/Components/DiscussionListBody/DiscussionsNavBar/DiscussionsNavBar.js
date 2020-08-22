import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import './DiscussionsNavBar.css'

export default class DiscussionsNavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            width: "",
            top: ""
        }
    }

    componentDidMount() {
        this.setState({
            width: document.getElementsByClassName("discussions-nav-item")[0].offsetWidth,
            top: document.getElementsByClassName("discussions-nav-item")[0].offsetHeight/2
        })
    }

    handleClick = (type) => {
        this.setState({
            page: type,
            width: type === 0 ? document.getElementsByClassName("discussions-nav-item")[0].offsetWidth : document.getElementsByClassName("discussions-nav-item")[1].offsetWidth,
            top: type === 0 ? document.getElementsByClassName("discussions-nav-item")[0].offsetHeight/2 : document.getElementsByClassName("discussions-nav-item")[1].offsetHeight/2
        })
    }

    render() {
        return (
            <div id="discussions-nav-bar">
                <h4 onClick={() => this.handleClick(0)} style={{marginLeft: "25%"}} className="discussions-nav-item">Recommended</h4>
                <h4 onClick={() => this.handleClick(1)} style={{marginRight: "25%"}} className="discussions-nav-item">Trending</h4>
                <IconButton style={{position: "absolute", left: "87.5%"}}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 0C4.9225 0 0 4.9225 0 11C0 17.0775 4.9225 22 11 22C17.0775 22 22 17.0775 22 11C22 4.9225 17.0775 0 11 0ZM16.5 12.1H12.1V16.5H9.9V12.1H5.5V9.9H9.9V5.5H12.1V9.9H16.5V12.1Z" fill="#48B1BF"/>
                    </svg>
                </IconButton>
                <div style={{position: "absolute", right: this.state.page === 1 ? "25%" : "", left: this.state.page === 0 ? "25%" : "", top: "calc(50% + " + this.state.top + "px)", height: "2px", width: this.state.width, backgroundColor: "black"}}></div>
            </div>
        )
    }
}
