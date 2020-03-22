import React from 'react';
import './ProgressBar.css';
class ProgressBar extends React.Component {
    constructor(props) {
        super(props);

        this.currentProgess = 0;
        this.selectRef = React.createRef();
        this.isMouseDown = false;
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);

        this.updateProgress = this.updateProgress.bind(this);
        this.handleClickProgressBar = this.props.handleClickProgressBar;
        this.handleProgressBarTimeShowMove = this.props.handleProgressBarTimeShowMove;
        this.stopDisplayTimeBox = this.props.stopDisplayTimeBox;
    }

    updateProgress(event, shouldUpdate) {
        let progressBar = document.getElementById("progress-bar")
        let progressPoint = document.getElementById("draggable-point")
        let pos = this.selectRef.current.getBoundingClientRect();
        let x = Math.floor(pos.x);
        let width = pos.width;
        let cursorX = event.clientX;
        let progress = parseFloat((cursorX - x) / width);
        //add position boundary condition
        if ((cursorX - x) >= x && (cursorX - x) < width) {
            //move the bar and point
            progressBar.style.width = (cursorX - x) + "px";
            progressPoint.style.left = (cursorX - x) + "px";
        }
        //update the video
        //if (shouldUpdate) {
        this.handleClickProgressBar(progress);

        //}
    }

    handleMouseMove(event) {
        if (this.isMouseDown) {
            this.updateProgress(event, false);
            this.stopDisplayTimeBox();
        } else {
            let progressBar = document.getElementById("progress-bar")
            let progressPoint = document.getElementById("draggable-point")
            let pos = this.selectRef.current.getBoundingClientRect();
            let x = Math.floor(pos.x);
            let width = pos.width;
            let cursorX = event.clientX;
            let progress = parseFloat((cursorX - x) / width);
            this.handleProgressBarTimeShowMove(cursorX, progress);
        }
    }

    handleMouseDown(event) {
        this.updateProgress(event, true);
        this.isMouseDown = true;
    }

    componentDidMount() {
        this.currentProgess = this.props.progress;
        document.getElementById('draggable-point').ondragstart = function () { return false; };
        document.getElementById('audio-progress-handle').ondragstart = function () { return false; };
    }

    shouldComponentUpdate(nextProps) {

        if (nextProps.progress !== this.currentProgress) {
            this.currentProgress = nextProps.progress;

        }
        return true;
    }

    render() {
        if (this.currentProgress == undefined) this.currentProgress = 0;

        const progressBarStyle = {
            display: "block",
            width: this.currentProgress + "%",
            height: "5px",
            background: "rgb(255, 0, 0)",
            borderRadius: "20px",
        }
        return (
            <div onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove}
                onMouseUp={() => {
                    this.isMouseDown = false
                    this.stopDisplayTimeBox();
                }}
                onMouseLeave={() => {
                    this.isMouseDown = false
                    this.stopDisplayTimeBox();
                }} id="progress-bar-container">

                <div id="progress-bar-all" ref={this.selectRef}>
                    <div id="progress-bar-all2">
                        <div id="draggable-point" style={{ left: this.currentProgress + "%", position: "relative" }} className="draggable ui-widget-content" draggable="false">
                            <div id="audio-progress-handle"></div>
                        </div>
                        <span id="progress-bar" style={progressBarStyle}></span>
                    </div>
                </div>
            </div>

        )
    }
}

export default ProgressBar