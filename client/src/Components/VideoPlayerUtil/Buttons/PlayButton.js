import React from 'react';
import "./button.css"
export default class PlayButton extends React.Component {

    constructor(props) {
        super(props);
        this.handlePlayState = this.props.handlePlayState
        this.playing = this.props.playing
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.playing != this.playing) {
            this.playing = nextProps.playing;
            return true;
        }
        return false;
    }

    render() {


        return (
            <span onClick={this.handlePlayState} className="button">{
                this.playing ?
                    <i className="material-icons" style={{color: "white", fontSize: "30px", userSelect: "none"}}>pause</i>
                    :
                    <i className="material-icons" style={{color: "white", fontSize: "30px", userSelect: "none"}}>play_arrow</i>

            }
            </span>
        )
    }

}