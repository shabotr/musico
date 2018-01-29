import React from "react";
import Track from './Track'

export default class TracksList extends React.Component{

	renderTracks() {
		return this.props.tracks.map((track, index) => {
			return (
				<Track key={track.id} 
				track={track}
				id={index}
				onPlayClicked={this.props.onPlayClicked}
				onTrackEnded={this.props.onTrackEnded}
				onTrackReady={this.props.onTrackReady}
				onVolumeClicked={this.props.onVolumeClicked}
				onTrashClicked={this.props.onTrashClicked}/>
			);
    	});
	}
	
  	render() {
    	return (
    		<ul className="list-group list-group-flush">
    			{this.renderTracks()}
    		</ul>
    	);
  	}
}