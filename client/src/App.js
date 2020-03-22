import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

//importing other components
import VideoPlayer from './Components/VideoPlayer'
import { Button } from '@material-ui/core';
const MAX_VIDEOS = 300;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: undefined,
      otherVideos: [],
      loadedVideos: 0
    }

    this.changeVideoFromOtherVideos = this.changeVideoFromOtherVideos.bind(this);
    this.handleLoadClicked = this.handleLoadClicked.bind(this);
    this.handleListItemClicked = this.handleListItemClicked.bind(this);
    this.handleVideoEnded = this.handleVideoEnded.bind(this);

  }


  //sending request to load the videos
  componentDidMount() {
    var { currentVideo, loadedVideos, otherVideos } = this.state;

    //get the first five videos
    axios.get("http://localhost:4000/api/proxy/?startIndex=0&count=5")
      .then((response) => {
        let data = response.data.data;
        console.log(data)
        for (let index in data) {
          if (index == 0) {
            currentVideo = data[index];
          } else {
            otherVideos.push(data[index]);
          }
          loadedVideos++;
        }

        this.setState({ currentVideo: currentVideo, otherVideos: otherVideos, loadedVideos: loadedVideos });
      })
  }

  changeVideoFromOtherVideos(index) {
    let { otherVideos } = this.state
    let currentVideo = otherVideos[index]
    if(otherVideos.length == 0){
      alert("please load more videos!")
      return;
    } else if(otherVideos.length == 1) {
      otherVideos = []
    } else if (index < otherVideos.length - 1) {
      //not the last one
      otherVideos = otherVideos.slice(0, index).concat(otherVideos.slice(index + 1, otherVideos.length))
    } else {
      otherVideos = otherVideos.slice(0, index + 1);
    }

    this.setState({ otherVideos: otherVideos, currentVideo: currentVideo })
  }

  handleVideoEnded() {
    this.changeVideoFromOtherVideos(0);
  }

  handleListItemClicked(index) {
    this.changeVideoFromOtherVideos(index);

  }

  handleLoadClicked(event) {
    var { currentVideo, loadedVideos, otherVideos } = this.state;
    if (loadedVideos >= MAX_VIDEOS) {
      alert("You have loaded all videos")
    } else {
      const count = MAX_VIDEOS - loadedVideos >= 5 ? 5 : MAX_VIDEOS - loadedVideos;
      const startIndex = loadedVideos;
      axios.get("http://localhost:4000/api/proxy/?startIndex=" + startIndex + "&count=" + count)
        .then((response) => {
          let data = response.data.data;
          console.log(data)
          for (let index in data) {
            otherVideos.push(data[index]);
            loadedVideos++;
          }

          this.setState({ otherVideos: otherVideos, loadedVideos: loadedVideos });
        })
    }
  }

  render() {

    const { currentVideo, otherVideos } = this.state;
    const otherVideoStyle = {
      display: "flex",
      flexWrap: "wrap"
      //justifyContent: "space-around"
    }
    const listStyle = {
      width: "40%",
      marginLeft: "5%",
      marginTop: "15px",
      display: "flex",
      flexDirection: "column",
      marginBottom: "10px",
      alignItems: "center"
    }


    const listItemStyle = {
      display: "flex",
    }

    const imgStyle = {
      borderRadius: "20px",
      marginRight: "10px"
    }


    if (currentVideo != undefined) {

      const videoList = otherVideos.map((video, index) => {
        return (
          <div className="video-list-item" onClick={() => this.handleListItemClicked(index)} key={"video-item-"+index}>
            <div style={listItemStyle}>
              <img src={video["thumbnails"][0].url} style={imgStyle} />
              <div>
                <h3 style={{ marginTop: "-2%", color: "rgb(255, 0, 0)" }}>{index}</h3>
                <h2 style={{ marginTop: "-5%" }}>{video.metadata.title}</h2>
              </div>
            </div>
            <hr style={{ border: "1px solid #e1e1e1" }}></hr>
          </div>
        )

      })

      return (
        <div style={otherVideoStyle}>
          <div style={{ wordWrap: "break-word", width: "50%", minWidth: "450px", marginLeft: "20px" }}>
            <VideoPlayer currentVideo={currentVideo} handleVideoEnded={this.handleVideoEnded}/>
            <h1 style={{ fontFamily: "Impact, Charcoal, sans-serif" }}>{currentVideo["metadata"]["title"]}</h1>
            <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>{currentVideo["metadata"]["description"]}</p>
          </div>

          <div style={listStyle}>
            <div>
              {videoList}
            </div>
            <Button variant="contained" color="secondary" onClick={this.handleLoadClicked} style={{ width: "50%" }}>Load more</Button>
          </div>

        </div>

      )
    } else {
      return (
        <p>Loading</p>
      )
    }

  }

}

export default App;
