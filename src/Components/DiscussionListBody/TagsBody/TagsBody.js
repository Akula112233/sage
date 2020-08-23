import React, { Component } from 'react'
import './TagsBody.css'
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Chip from '@material-ui/core/Chip';
import { store, tagStore, setNewState } from '../../../Redux/redux'
import $ from 'jquery'


export default class TagsBody extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currentChips : [],
            popoverOpen: false,
            anchorEl: null,
            popoverValue: ""
        }
    }

    componentDidMount() {
        // make api call here to get chips on first render
        $.ajax({
            type: "GET",
            url: "https://sageapp.tech/api/v1/user.php",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(store.getState().loginCred.authResponse.accessToken + ":"));
            },
            data: {
              id: store.getState().loginCred.authResponse.userID
            },      
            success: (response) => {
              console.log("got user data! ", response)
              tagStore.dispatch(setNewState(JSON.parse(response.user.interests)))
              this.setState({
                currentChips: tagStore.getState()
              })
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            popoverValue: e.target.value
        })
    }

    addItem = () => {
        let temp = this.state.currentChips
        if (!this.state.popoverValue) {
            return false
        }
        temp.push(this.state.popoverValue)
        this.setState({
            currentChips: temp,
            popoverValue: ""
        }, () => {
            tagStore.dispatch(setNewState(this.state.currentChips))
        })
    }

    handleDelete = (chipName) => {
        let temp = [...this.state.currentChips]
        this.setState({
            currentChips: temp.filter((chip) => chip !== chipName)
        }, () => {
            tagStore.dispatch(setNewState(this.state.currentChips))
        })
    }

    handleIconButtonClick = (event) =>{
        this.setState({
            popoverOpen: true,
            anchorEl: event.currentTarget
        })
    }

    handleIconButtonClose = () => {
        this.setState({
            anchorEl: null,
            popoverOpen: false
        })
    }
    
    render() {
        return (
                <div id ="tags-body">
                    <div id="actual-tags">
                        {
                            this.state.currentChips.map(chipName => {
                                return <Chip onDelete={() => this.handleDelete(chipName)} key={Math.random()} className="tag-chips" label={"#" + chipName}></Chip>
                            })
                        }
                    </div>
                    <Popover id="test" anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} transformOrigin={{vertical: 'top', horizontal: 'left'}} open={this.state.popoverOpen} anchorEl={this.state.anchorEl} onClose={this.handleIconButtonClose}>
                        <div id="tag-popover">
                            <input placeholder="Enter a tag here..." id="tag-input" value={this.state.popoverValue} onChange={this.handleChange}></input>
                            <button id="tag-add" onClick={this.addItem}>+</button>
                        </div>
                    </Popover>
                    <IconButton onClick={this.handleIconButtonClick}>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5.5H9V9.5H5V11.5H9V15.5H11V11.5H15V9.5H11V5.5ZM10 0.5C4.475 0.5 0 4.975 0 10.5C0 16.025 4.475 20.5 10 20.5C15.525 20.5 20 16.025 20 10.5C20 4.975 15.525 0.5 10 0.5ZM10 18.5C5.59 18.5 2 14.91 2 10.5C2 6.09 5.59 2.5 10 2.5C14.41 2.5 18 6.09 18 10.5C18 14.91 14.41 18.5 10 18.5Z" fill="#48B1BF"/>
                        </svg>
                    </IconButton>
                </div>

        )
    }
}
