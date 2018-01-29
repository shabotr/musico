import React from 'react';

export default class VolumeBtn extends React.Component {

	handleVolumeClick(trackId) {
		this.props.onVolumeClicked(trackId);
	}

	SetVolume(ev)
	{
		let audio = document.getElementById(this.props.track.audioId);
		audio.volume = ev.target.value;
	}

	render() {
		let volumeClass = this.props.track.isMuted ? 'fa fa-volume-off' : 'fa fa-volume-up';		
		return (
					<div>
						<button className="volumeBtn" onClick={this.handleVolumeClick.bind(this,this.props.id)}>
							<i className={volumeClass}></i>
						</button>

						<input id="vol-control" type="range" min="0" max="1" step="0.1" onChange={this.SetVolume.bind(this)}></input>
					</div>
				);
	}å
}