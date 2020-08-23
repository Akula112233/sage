import React, {Component} from 'react';
import MemberVideoComponent from "./MemberVideoComponent/MemberVideoComponent";
import "./MemberVideoGrid.css"

class MemberVideoGrid extends Component {
    render() {
        return (
            <div id={'outlineGrid'}>
                <MemberVideoComponent/>
                <MemberVideoComponent/>
                <MemberVideoComponent/>
                <MemberVideoComponent/>
                <MemberVideoComponent/>
                <MemberVideoComponent/>
                <MemberVideoComponent/>
                <MemberVideoComponent/>
                <MemberVideoComponent/>
            </div>
        );
    }
}

export default MemberVideoGrid;