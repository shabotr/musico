import React from "react";

export default class PlayPauseButton extends React.Component{

  render() {
  		let value = this.props.status ? "Stop" : "play";
    return (
    	    <button className="PlayPauseBtn" onClick={()=>this.props.play()}>
	        	{value}
	    	</button>
    );
  }
}