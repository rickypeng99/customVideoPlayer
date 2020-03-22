import React from 'react';

import {
    PlayButton,
    ProgressBar,
    VolumeButton,
    QualityChangeButton,
    FullsizeButton,
} from "./VideoPlayerUtil"

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVideo: undefined,
            playing: false,
            progress: 0,
            mouseIn: false,
            //handling muted or not
            muted: true,
            videoSource: undefined
        }
        this.handlePlayState = this.handlePlayState.bind(this);
        this.handleMuted = this.handleMuted.bind(this);

        this.updateProgressBar = this.updateProgressBar.bind(this);
        this.handleClickProgressBar = this.handleClickProgressBar.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    
        //for resolution change
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleVolumeBar = this.handleVolumeBar.bind(this);

    }

    handleSourceChange(index){
        let currentVideo = this.state.currentVideo;
        this.setState({videoSource: currentVideo["assets"][index]})
    }

    handleMouseLeave(event) {
        this.setState({ mouseIn: false })
    }

    handleMouseEnter(event) {
        this.setState({ mouseIn: true })
    }


    handleClickProgressBar(progress) {
        this.video.currentTime = parseFloat(this.video.duration * progress);
    }

    handleVolumeBar(progress) {
        this.video.volume = parseFloat(progress);
        this.video.muted = false;
        this.setState({muted: true})
    }

    updateProgressBar(event) {
        if (this.video) {
            //console.log(this.video.buffered.end(0))
            let progress = (100 / this.video.duration) *
                this.video.currentTime;
            this.setState({ progress: progress });
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
        console.log(muted)
        if (muted) {
            this.video.muted = true
            this.setState({ muted: false })
        } else {
            this.video.muted = false
            this.setState({ muted: true })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.videoSource != this.state.videoSource){
            if(this.video){
                let currentTime = this.video.currentTime;
                this.video.pause();
                this.video.setAttribute("src", nextState.videoSource["url"]);
                this.video.load();
                this.video.currentTime = currentTime;
                if(this.state.playing){
                    this.video.play();

                }
            }
            
        }

        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log(prevState)
        //change to a new video
        if (prevState.currentVideo != this.state.currentVideo) {
            this.video = document.getElementById("video")
            this.video.addEventListener('timeupdate', this.updateProgressBar);
            this.bottomBar = document.getElementById("bottomBar");
            let bottomBarHeight = this.video.getBoundingClientRect().height / 8;
            this.bottomBar.style.top = (this.video.getBoundingClientRect().top + this.video.getBoundingClientRect().height - bottomBarHeight)
            this.bottomBar.style.height = bottomBarHeight
        }
    }

    componentDidMount() {
        let currentVideo = this.props.currentVideo
        this.setState({ currentVideo: currentVideo, videoSource: currentVideo["assets"][3]});
    }

    render() {
        //const playButtonText = this.state.playing ? "Pause" : "Play";

        const { currentVideo, playing, progress, mouseIn, muted, videoSource } = this.state;
        let bottomBarHeight = this.video ? this.video.getBoundingClientRect().height / 8 : 0;
        // if(this.video){
        //     console.log((this.video.getBoundingClientRect().top));
        //     console.log((this.video.getBoundingClientRect().height));
        // }
        const bottomBarStyle = {
            width: "100%",
            position: "relative",
            zIndex: 1,
            top: this.video ? (this.video.getBoundingClientRect().top + this.video.getBoundingClientRect().height) - 15 : 0,
            height: this.video ? bottomBarHeight : 0,
            marginTop: this.video ? - bottomBarHeight : 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: mouseIn ? "block" : "none",
            borderRadius: "20px",
        }

        const bottomControl = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%"
        }

        if (currentVideo) {
            return (
                <div style={{ width: "100%", marginTop: "15px"}}>
                    <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        {/* <div style={topBarStyle}></div> */}
                        <div id="bottomBar" style={bottomBarStyle}>
                            <div style={bottomControl}>
                                <div style={{ height: "8px" }}>
                                    <ProgressBar progress={progress} handleClickProgressBar={this.handleClickProgressBar}></ProgressBar>
                                </div>


                                <div style={{ display: "flex", width: "100%", marginTop: "1%" }}>
                                    <div style={{ display: "flex", flex: " 1 1 0%",  marginLeft: "1.25em" }}>
                                        <PlayButton handlePlayState={this.handlePlayState} playing={playing}></PlayButton>
                                        <VolumeButton handleMuted={this.handleMuted} muted={muted} handleVolumeBar={this.handleVolumeBar}></VolumeButton>
                                    </div>
                                    <div style={{ display: "flex", marginRight: "1.25em" }}>
                                        <QualityChangeButton assets={currentVideo["assets"]} handleSourceChange={this.handleSourceChange}></QualityChangeButton>
                                        <FullsizeButton></FullsizeButton>
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