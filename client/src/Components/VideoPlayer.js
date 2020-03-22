import React from 'react';

import {
    PlayButton,
    ProgressBar,
    VolumeButton,
    QualityChangeButton,
    FullsizeButton,
} from "./VideoPlayerUtil"

/**
 * transfer video api's currentimt and duration attributes to text
 * @param {video.currentTime} time 
 */
const timeDisplay = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    return (minutes + ":" + seconds)
}

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            progress: 0,
            mouseIn: false,
            //handling muted or not
            muted: true,
            videoSource: undefined,
            isFullScreen: false
        }
        this.currentVideo = this.props.currentVideo
        this.handleVideoEnded = this.props.handleVideoEnded;
        this.handlePlayState = this.handlePlayState.bind(this);
        this.handleMuted = this.handleMuted.bind(this);

        this.updateProgressBar = this.updateProgressBar.bind(this);
        this.handleClickProgressBar = this.handleClickProgressBar.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        //for resolution change
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleVolumeBar = this.handleVolumeBar.bind(this);
        this.handleFullScreen = this.handleFullScreen.bind(this);

        this.handleProgressBarTimeShowMove = this.handleProgressBarTimeShowMove.bind(this);
        this.stopDisplayTimeBox = this.stopDisplayTimeBox.bind(this);
    }

    stopDisplayTimeBox() {
        let timeBox = document.getElementById("time-box");
        timeBox.style.display = "none";
    }

    handleProgressBarTimeShowMove(x, progress) {
        let time = Math.floor(this.video.duration * progress);
        let timeBox = document.getElementById("time-box");
        let timeBoxText = document.getElementById("time-box-text");
        let progress_bar_container = document.getElementById("progress-bar-container")
        timeBox.style.left = (x - progress_bar_container.getBoundingClientRect().x - timeBox.getBoundingClientRect().width / 2) + "px";
        timeBox.style.display = "block";
        timeBox.style.top = - (timeBox.getBoundingClientRect().height + 10) + "px"
        timeBoxText.innerHTML = timeDisplay(time);
    }

    handleFullScreen() {
        let video_container = document.getElementById("video-container");
        if (!document.fullscreenElement) {
            video_container.requestFullscreen();
            this.setState({ isFullScreen: true });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                this.setState({ isFullScreen: false, mouseIn: false });

            }
        }
    }

    handleSourceChange(index) {
        let currentVideo = this.currentVideo;
        this.setState({ videoSource: currentVideo["assets"][index] })
    }

    handleMouseLeave(event) {
        this.setState({ mouseIn: false })
    }

    handleMouseEnter(event) {
        this.setState({ mouseIn: true })
    }




    handleVolumeBar(progress) {
        this.video.volume = parseFloat(progress);
        this.video.muted = false;
        this.setState({ muted: true })
    }

    handleClickProgressBar(progress) {
        this.video.currentTime = parseFloat(this.video.duration * progress);
    }

    updateProgressBar(event) {
        if (this.video) {
            //console.log(this.video.buffered.end(0))
            if (this.video.duration == this.video.currentTime) {
                //current video ended, move to the next one
                this.handleVideoEnded();
            } else {
                let progress = (100 / this.video.duration) *
                    this.video.currentTime;
                this.setState({ progress: progress });
            }

        }

    }


    /**
     * Handling playing state of the current video
     */

    handlePlayState(event) {
        let playing = this.state.playing;
        if (!playing) {
            this.video.play();
            this.setState({ playing: true })
        } else {
            this.video.pause();
            this.setState({ playing: false })
        }
    }

    handleMuted() {
        let muted = this.state.muted;
        if (muted) {
            this.video.muted = true
            this.setState({ muted: false })
        } else {
            this.video.muted = false
            this.setState({ muted: true })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.videoSource != this.state.videoSource) {
            if (this.video) {
                let currentTime = this.video.currentTime;
                this.video.pause();
                this.video.setAttribute("src", nextState.videoSource["url"]);
                this.video.load();
                this.video.currentTime = currentTime;
                if (this.state.playing) {
                    this.video.play();

                }
            }

        } else if (nextProps.currentVideo != this.currentVideo) {
            this.currentVideo = nextProps.currentVideo;
            if (this.video) {
                this.video.pause();
                this.video.setAttribute("src", this.currentVideo["assets"][3]["url"]);
                this.video.load();
                if (this.state.playing) {
                    this.video.play();
                }
                // this.video.play();
                //this.setState({videoSource: this.currentVideo["assets"][3]})
            }
        }

        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log(prevState)
        //change to a new video
        this.video = document.getElementById("video")
        this.video.addEventListener('timeupdate', this.updateProgressBar);
        this.bottomBar = document.getElementById("bottomBar");
        const offset = !document.fullscreenElement ? 15 : 0

        let bottomBarHeight = this.video.getBoundingClientRect().height / 8;
        this.bottomBar.style.top = (this.video.getBoundingClientRect().top + this.video.getBoundingClientRect().height - offset)
        this.bottomBar.style.height = bottomBarHeight

    }

    componentDidMount() {
        this.currentVideo = this.props.currentVideo
        console.log(this.currentVideo)
        this.setState({ videoSource: this.currentVideo["assets"][3] });
    }

    render() {
        //const playButtonText = this.state.playing ? "Pause" : "Play";

        const { playing, progress, mouseIn, muted, videoSource, isFullScreen } = this.state;
        let bottomBarHeight = this.video ? this.video.getBoundingClientRect().height / 8 : 0;
        // if (this.video) {
        //     console.log((this.video.getBoundingClientRect()));
        //     console.log((this.video.getBoundingClientRect()));
        // }

        //no margin top when there it is in full screen
        const offset = !document.fullscreenElement ? 15 : 0

        const bottomBarStyle = {
            width: "100%",
            position: "relative",
            zIndex: 1,
            top: this.video ? (this.video.getBoundingClientRect().top + this.video.getBoundingClientRect().height) - offset : 0,
            height: this.video ? bottomBarHeight : 0,
            marginTop: this.video ? - bottomBarHeight : 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: mouseIn && (this.video && !Number.isNaN(this.video.duration)) ? "block" : "none",
            borderRadius: "20px",
        }

        const bottomControl = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "100%"
        }

        const timeBoxStyle = {
            display: "none",
            position: "absolute",
            zIndex: "3",
            top: "100",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: "20px",
            textAlign: "center"
        }

        //console.log(videoSource)
        if (videoSource) {
            return (
                <div style={{ width: "100%", marginTop: "15px" }}>
                    <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} id="video-container">
                        {/* <div style={topBarStyle}></div> */}
                        <div id="bottomBar" style={bottomBarStyle}>
                            <div style={bottomControl}>
                                <div id="time-box" style={timeBoxStyle}>
                                    <p style={{ color: "#fff", userSelect: "none" }} id="time-box-text">Loading</p>
                                </div>
                                <ProgressBar progress={progress} handleClickProgressBar={this.handleClickProgressBar} handleProgressBarTimeShowMove={this.handleProgressBarTimeShowMove} stopDisplayTimeBox={this.stopDisplayTimeBox}></ProgressBar>


                                <div style={{ display: "flex", width: "100%", marginBottom: "10px" }}>
                                    <div style={{ display: "flex", flex: " 1 1 0%", marginLeft: "1.25em", alignItems: "center" }}>
                                        <PlayButton handlePlayState={this.handlePlayState} playing={playing}></PlayButton>
                                        <VolumeButton handleMuted={this.handleMuted} muted={muted} handleVolumeBar={this.handleVolumeBar}></VolumeButton>
                                        <div>
                                            <p style={{ color: "#fff", userSelect: "none" }}>{this.video ? timeDisplay(this.video.currentTime) + " / " + timeDisplay(this.video.duration) : "0:0"}</p>
                                        </div>

                                    </div>
                                    <div style={{ display: "flex", marginRight: "1.25em", alignItems: "center" }}>
                                        <QualityChangeButton assets={this.currentVideo["assets"]} handleSourceChange={this.handleSourceChange}></QualityChangeButton>
                                        <FullsizeButton isFullScreen={isFullScreen} handleFullScreen={this.handleFullScreen}></FullsizeButton>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <video id="video" style={{ width: "100%", height: "auto", borderRadius: "20px" }} onClick={this.handlePlayState}>
                            <source src={videoSource["url"]} />
                        </video>

                    </div>

                    <br></br>

                </div>

            )
        } else {
            return (
                <p>Loading video</p>
            )
        }

    }
}

export default VideoPlayer;