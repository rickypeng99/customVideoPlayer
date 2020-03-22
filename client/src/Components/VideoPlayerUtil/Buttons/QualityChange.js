import React from 'react';
import "./button.css"
export default class QualityChangeButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySetting: false,
        }
        this.showSetting = this.showSetting.bind(this);
        this.handleSourceChange = this.props.handleSourceChange;
    }

    showSetting() {
        const displaySetting = this.state.displaySetting;

        if (displaySetting) {
            this.setState({ displaySetting: false })

        } else {
            this.setState({ displaySetting: true })

        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.assets != this.assets) {
            this.assets = nextProps.assets;
            return true;
        }
        if(nextState.displaySetting != this.state.displaySetting){
            return true;
        }
        return false;
    }

    render() {
        //console.log("fuck")
        const displaySetting = this.state.displaySetting;
        //console.log(displaySetting)
        const settingStyle = {
            width: "100px",
            height: "auto",
            position: "absolute",
            transform: "translateX(-50%) translateY(-2.4em)",
            bottom: "0px",
            left: "50%",
            backgroundColor: "rgba(37, 38, 39, 0.85)",
            zIndex: "3",
            display: displaySetting ? "block" : "none"
        }

        const ulStyle = {
            display: "flex",
            flexDirection: "column",
      
          }

        //videos of other resolutions
        const assetList = () => {
            if (this.assets) {
                return this.assets.map((d, i) => {
                    return (
                        <div key = {"assetlist_" + i} className = "list_item" onClick={()=>this.handleSourceChange(i)}>
                            <p style={{ color: "#fff", userSelect: "none"}}>{d.height}</p>
                        </div>
                    )
                })
            } else {
                return (
                    <li>Loading</li>
                )
            }
        }



        return (
            <span className="button" style={{ position: "relative" }}>
                <div style={settingStyle} onMouseLeave={() => this.setState({displaySetting: false})}>
                    <div style={ulStyle}>
                        {assetList()}
                    </div>
                </div>
                <i onClick={this.showSetting} className="material-icons" style={{ color: "white", fontSize: "30px", userSelect: "none" }}>hd</i>

            </span>
        )
    }

}