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

        this.props.setPage(type)
    }

    render() {
        return (
            <div id="discussions-nav-bar">
                <h3 onClick={() => this.handleClick(0)} style={{marginLeft: "17.5%"}} className="discussions-nav-item">Recommended
                    <svg style={{marginLeft: "5px"}}  width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3333 5.16666C14.7125 5.16666 15.825 4.04582 15.825 2.66666C15.825 1.28749 14.7125 0.166656 13.3333 0.166656C11.9541 0.166656 10.8333 1.28749 10.8333 2.66666C10.8333 4.04582 11.9541 5.16666 13.3333 5.16666ZM6.66665 5.16666C8.04581 5.16666 9.15831 4.04582 9.15831 2.66666C9.15831 1.28749 8.04581 0.166656 6.66665 0.166656C5.28748 0.166656 4.16665 1.28749 4.16665 2.66666C4.16665 4.04582 5.28748 5.16666 6.66665 5.16666ZM6.66665 6.83332C4.72081 6.83332 0.833313 7.80832 0.833313 9.74999V11.8333H12.5V9.74999C12.5 7.80832 8.61248 6.83332 6.66665 6.83332ZM13.3333 6.83332C13.0916 6.83332 12.8208 6.84999 12.5291 6.87916C13.4958 7.57499 14.1666 8.51249 14.1666 9.74999V11.8333H19.1666V9.74999C19.1666 7.80832 15.2791 6.83332 13.3333 6.83332Z" fill="black"/>
                    </svg>
                </h3>
                <h3 onClick={() => this.handleClick(1)} style={{marginRight: "17.5%"}} className="discussions-nav-item">Trending
                    <svg style={{marginLeft: "5px"}}  width="14" height="18" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.25001 0.55835C8.25001 0.55835 8.86668 2.76668 8.86668 4.55835C8.86668 6.27502 7.74168 7.67085 6.02084 7.67085C4.30001 7.67085 3.00001 6.27918 3.00001 4.55835L3.02084 4.25835C1.34584 6.26252 0.333344 8.84585 0.333344 11.6667C0.333344 15.35 3.31668 18.3333 7.00001 18.3333C10.6833 18.3333 13.6667 15.35 13.6667 11.6667C13.6667 7.17085 11.5042 3.16252 8.25001 0.55835ZM6.75834 15.8333C5.27501 15.8333 4.07084 14.6625 4.07084 13.2167C4.07084 11.8625 4.94168 10.9125 6.41668 10.6167C7.89168 10.3208 9.41668 9.61252 10.2625 8.47085C10.5875 9.54585 10.7583 10.6792 10.7583 11.8333C10.7583 14.0375 8.96668 15.8333 6.75834 15.8333Z" fill="black"/>
                    </svg>
                </h3>
                <div style={{position: "absolute", right: this.state.page === 1 ? "17.5%" : "", left: this.state.page === 0 ? "17.5%" : "", top: "calc(50% + " + this.state.top + "px)", height: "2px", width: this.state.width, backgroundColor: "black"}}></div>
            </div>
        )
    }
}
