import React from 'react';
import "./button.css"
export default class FullsizeButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleFullScreen = this.props.handleFullScreen
        this.isFullScreen = this.props.isFullScreen
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.isFullScreen != this.isFullScreen){
            this.isFullScreen = nextProps.isFullScreen
            console.log(nextProps.isFullScreen)
            return true;
        }
        return false;
    }


    render() {


        return (
            <span className="button" onClick={this.handleFullScreen}>{
                !this.isFullScreen ? 
                <i className="material-icons" style={{ color: "white", fontSize: "30px", userSelect: "none" }}>fullscreen</i>
                :
                <i className="material-icons" style={{ color: "white", fontSize: "30px", userSelect: "none" }}>fullscreen_exit</i>

            }
            </span>
        )
    }

}