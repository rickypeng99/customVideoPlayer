import React from 'react';
import "./button.css"
export default class FullsizeButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {


        return (
            <span className="button">{
              
                    <i className="material-icons" style={{color: "white", fontSize: "30px", userSelect: "none"}}>fullscreen</i>
                
            }
            </span>
        )
    }

}