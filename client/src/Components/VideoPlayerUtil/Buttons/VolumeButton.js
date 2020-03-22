import React from 'react';
import "./button.css"
import "../PorgressBar/ProgressBar.css"
export default class VolumeButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            volume: 1
        }

        this.muted = this.props.muted;
        this.selectRef = React.createRef();
        this.handleMuted = this.props.handleMuted;
        this.handleVolumeBar = this.props.handleVolumeBar;
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.updateVolume = this.updateVolume.bind(this);
    }

    updateVolume(event) {
        let progressBar = document.getElementById("progress-bar-volume")
        let progressPoint = document.getElementById("draggable-point-volume")
        let pos = this.selectRef.current.getBoundingClientRect();

        let x = Math.floor(pos.x);
        console.log(x)

        let width = pos.width;
        console.log(width)

        let cursorX = event.clientX;
        let progress = parseFloat((cursorX - x) / width);
        console.log(progress);
        //add position boundary condition
        if (progress <= 1 && progress >= 0) {
            //move the bar and point
            progressBar.style.width = (cursorX - x) + "px";
            progressPoint.style.left = (cursorX - x) + "px";
            this.setState({ volume: progress })
            this.handleVolumeBar(progress);
        }
        //update the video
        //if (shouldUpdate) {
        //}
    }

    handleMouseMove(event) {
        if (this.isMouseDown) {
            this.updateVolume(event);
        }
    }

    handleMouseDown(event) {
        this.updateVolume(event);
        this.isMouseDown = true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.muted != this.muted) {
            this.muted = nextProps.muted;
            this.setState({ volume: 0 })
            return true;
        }
        if (nextState.volume == 0) {
            return true;
        }
        if (nextState.volume > 0){
            this.muted = true;
            return true;
        }
        return false;
    }



    render() {
        const volume = this.state.volume;
        const volumeContainerStyle = {
            display: 'flex',
            alignItems: 'center',
        }
        const progressBarContainerStyle = {
            width: "50px",
            height: "5px",
            backgroundColor: "#e1e1e1",
            borderRadius: "20px",
        }
        const progressBarStyle = {
            display: "block",
            width: (volume * 100) + "%",
            height: "5px",
            background: "rgb(255, 0, 0)",
            borderRadius: "20px",
        }
        return (
            <div style={volumeContainerStyle} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove}
                onMouseUp={() => this.isMouseDown = false}
                onMouseLeave={() => this.isMouseDown = false}>
                <span onClick={this.handleMuted} className="button">{
                    !this.muted ?
                        <i className="material-icons" style={{ color: "white", fontSize: "30px", userSelect: "none" }}>volume_off</i>
                        :
                        <i className="material-icons" style={{ color: "white", fontSize: "30px", userSelect: "none" }}>volume_up</i>

                }
                </span>
                <div ref={this.selectRef}
                    style={progressBarContainerStyle}
                    id="progress-bar-container-volume"
                >
                    <div id="draggable-point-volume" style={{ left: (volume * 100) + "%", position: "relative", draggable: "false" }} className="draggable ui-widget-content">
                        <div id="audio-progress-handle-volume"></div>
                    </div>
                    <span id="progress-bar-volume" style={progressBarStyle}></span>
                </div>
            </div>

        )
    }

}