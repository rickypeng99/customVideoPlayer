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
        }
    }

    handleMouseDown(event) {
        this.updateProgress(event, true);
        this.isMouseDown = true;
    }

    componentDidMount() {
        this.currentProgess = this.props.progress;
        console.log("fuck")
    }

    shouldComponentUpdate(nextProps) {

        if (nextProps.progress !== this.currentProgress) {
            this.currentProgress = nextProps.progress;

        }
        return true;
    }

    render() {
        if (this.currentProgress == undefined) this.currentProgress = 0;
        // const progressBarContainerStyle = {
        //     width: "100%",
        //     height: "5px",
        //     backgroundColor: "#e1e1e1",
        //     borderRadius: "20px",
        // }
        const progressBarStyle = {
            display: "block",
            width: this.currentProgress + "%",
            height: "5px",
            background: "rgb(255, 0, 0)",
            borderRadius: "20px",
        }
        return (
            <div onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove}
                onMouseUp={() => this.isMouseDown = false}
                onMouseLeave={() => this.isMouseDown = false}>
                <div id="progress-bar-container" ref={this.selectRef}
                // onMouseDown={this.handleMouseDown}
                // onMouseMove={this.handleMouseMove}
                // onMouseUp={() => this.isMouseDown = false}
                // onMouseLeave={() => this.isMouseDown = false}
                //style={progressBarContainerStyle}
                >
                    <div id="draggable-point" style={{ left: this.currentProgress + "%", position: "relative", draggable: "false" }} className="draggable ui-widget-content">
                        <div id="audio-progress-handle"></div>
                    </div>
                    <span id="progress-bar" style={progressBarStyle}></span>

                </div>
            </div>

        )
    }
}

export default ProgressBar