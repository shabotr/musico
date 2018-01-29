import React from "react";
import PlayPauseBtn from './TrackControls/PlayPauseBtn';
import DeleteBtn from './TrackControls/DeleteBtn';
import VolumeBtn from './TrackControls/VolumeBtn';

export default class Track extends React.Component{

  	render() {  		
    	return (
			<li className="list-group-item flex-column align-items-start">
				<div className="d-flex w-100 justify-content-between">
					<div className="col-3">
						<PlayPauseBtn
							track={this.props.track}
							onPlayClicked={this.props.onPlayClicked}
							onTrackEnded={this.props.onTrackEnded}
							onTrackReady={this.props.onTrackReady}
						/>
					</div>

					<div className="col-5">
						<div className="trackOwner">
					  		<span>{this.props.track.owner}</span>
					  	</div>
					  	<div className="trackName">
					  		{this.props.track.name}
					  	</div>
					</div>

					<div className="right col-4">
						<DeleteBtn
							id={this.props.id} 
							track={this.props.track}
							onTrashClicked={this.props.onTrashClicked}
						/>

						<VolumeBtn
							id={this.props.id} 
							track={this.props.track}
							onVolumeClicked={this.props.onVolumeClicked}
						/>
					</div>
				</div> 
			  	

			</li>
		);
  	}
}