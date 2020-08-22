import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import './SideBar.css'
import Chip from "@material-ui/core/Chip";


class SideBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedView: 0
        }
    }

    ///Stuff that I need to replace with props***********************
    numMembersActive = 12//this.props.numMembersActive
    maxNumMembers = 20//this.props.maxNumMembers
    tagNames = ['tag1', 'tag2', 'tag3', 'tag4', "tag1", "tag1"]//this.props.tagNames,
    roomTitle = 'Test Room 1' //this.props.roomTitle,
    roomDescription = 'This is a test room 1 with multiple tags in it for testing.' //this.props.roomDescription


    tagComponents = this.tagNames.map(tagName => {
        return <Chip
            label={'#' + tagName}
            style={{backgroundColor: '#48B1BF', color: 'white', margin: '2px 1px 2px 1px', fontSize: '13px'}}
        />
    })
    buttonStyle = (buttonNum) => {
        let buttonStyle = {backgroundColor: 'rgba(255, 255, 255, 0.4)', borderColor: 'black', fontFamily: 'Cabin', fontWeight: 'bold', width: '183px', margin: '10px 0 0 0', justifyContent: 'left', padding: '5px 10px 5px 15px'}
        if(buttonNum === this.state.selectedView){
            return buttonStyle = {backgroundColor: 'rgba(0, 0,0, 0.1)', borderColor: 'black', fontFamily: 'Cabin', fontWeight: 'bold', width: '183px', margin: '10px 0 0 0', justifyContent: 'left', padding: '5px 10px 5px 15px'}
        }
        return buttonStyle
    }
    buttons = [
        {
            buttonTitle: Text,

        },
    ]

    render(){
        return (
            <div id={'sidebar'}>
                <div style={{margin: '20px 0px 3px 20px', fontSize: '17px'}}>
                    <h2 style={{margin: '0'}}>{this.roomTitle}</h2>
                </div>
                <div id={'tagComponents'} style={{margin: '0px 10px 0 21px'}}>
                    {this.tagComponents}
                </div>
                <div style={{margin: '0 20px 0 20px', fontStyle: 'italic', color: '#3F4148', fontSize: '14px'}}>
                    <p style={{marginBottom: 0, paddingBottom: 0}}>
                        {this.numMembersActive + '/' + this.maxNumMembers + ' Members Online'}
                    </p>
                    <p style={{marginTop: '0px'}}>
                        {this.roomDescription}
                    </p>
                </div>
                <div id={'ViewPicker'} style={{margin: '0 0 0 20px'}}>
                    <Button
                        style={this.buttonStyle(0)}
                        startIcon={<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.0707 4.53H16.2407V13.035H4.3457V14.925C4.3457 15.4448 4.75745 15.87 5.2607 15.87H15.3257L18.9857 19.65V5.475C18.9857 4.95525 18.574 4.53 18.0707 4.53ZM14.4107 10.2V1.695C14.4107 1.17525 13.999 0.75 13.4957 0.75H1.6007C1.09745 0.75 0.685699 1.17525 0.685699 1.695V14.925L4.3457 11.145H13.4957C13.999 11.145 14.4107 10.7197 14.4107 10.2Z" fill="#3F4148"/>
                        </svg>
                        }
                        onClick={() => {this.setState({selectedView: 0}); this.props.buttonHandler(0)}}
                    >
                        Text
                    </Button>
                    <Button
                        style={this.buttonStyle(1)}
                        startIcon={<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5451 4.5V1C13.5451 0.45 13.1154 0 12.5902 0H1.13167C0.606484 0 0.176788 0.45 0.176788 1V11C0.176788 11.55 0.606484 12 1.13167 12H12.5902C13.1154 12 13.5451 11.55 13.5451 11V7.5L17.3646 11.5V0.5L13.5451 4.5Z" fill="#3F4148"/>
                        </svg>
                        }
                        onClick={() => {this.setState({selectedView: 1}); this.props.buttonHandler(1)}}
                    >
                        Video
                    </Button>
                    <Button
                        style={this.buttonStyle(2)}
                        startIcon={<svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 12.8245V16.2H2.97958L11.7713 6.24012L8.79175 2.86465L0 12.8245ZM14.0676 3.63876C14.3775 3.28771 14.3775 2.71613 14.0676 2.36508L12.2123 0.263287C11.9024 -0.0877622 11.3979 -0.0877622 11.088 0.263287L9.63398 1.91052L12.6136 5.28598L14.0676 3.63876Z" fill="#3F4148"/>
                        </svg>
                        }
                        onClick={() => {this.setState({selectedView: 2}); this.props.buttonHandler(2)}}
                    >
                        Draw
                    </Button>
                </div>
            </div>
        );
    }

};

export default SideBar;
