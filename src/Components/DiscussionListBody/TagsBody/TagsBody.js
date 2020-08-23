import React, { Component } from 'react'
import './TagsBody.css'
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';


export default class TagsBody extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currentChips : ["123123123123", "Going to the beach!"]         
        }
    }

    handleDelete = (chipName) => {
        let temp = [...this.state.currentChips]
        this.setState({
            currentChips: temp.filter((chip) => chip !== chipName)
        })
    }

    componentDidMount() {
        // make Facebook api call and populate current chips
    }
    
    render() {
        return (
                <div id ="tags-body">
                    <div id="actual-tags">
                        {
                            this.state.currentChips.map(chipName => {
                                return <Chip onDelete={() => this.handleDelete(chipName)} key={Math.random()} className="tag-chips" label={chipName}></Chip>
                            })
                        }
                    </div>
                    <IconButton>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5.5H9V9.5H5V11.5H9V15.5H11V11.5H15V9.5H11V5.5ZM10 0.5C4.475 0.5 0 4.975 0 10.5C0 16.025 4.475 20.5 10 20.5C15.525 20.5 20 16.025 20 10.5C20 4.975 15.525 0.5 10 0.5ZM10 18.5C5.59 18.5 2 14.91 2 10.5C2 6.09 5.59 2.5 10 2.5C14.41 2.5 18 6.09 18 10.5C18 14.91 14.41 18.5 10 18.5Z" fill="#48B1BF"/>
                        </svg>
                    </IconButton>
                </div>

        )
    }
}
