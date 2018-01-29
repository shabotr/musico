import React from 'react';

export default class PlayPauseBtn extends React.Component {

	handleTrackReady(ev) {
		this.props.onTrackReady(ev.target.duration, this.props.track);
	}

	handlePlayClick(ev) {
		this.props.onPlayClicked(this.props.track);
	}

	handleTimeUpdate(ev) {
		let audio = document.getElementById(this.props.track.audioId);
		let progress = document.getElementById("progress"+this.props.track.id);
		if(audio && progress && this.props.track.progress)
		{
			const value = audio.currentTime/audio.duration;
			progress.value = value;
			this.props.track.progress.animate(value);			
		}
	}

	handleTrackEnded(ev) {
		this.props.onTrackEnded(this.props.track);
	}

	updateClass()
	{
		const classNames = this.props.track.isPlaying ? 'fa fa-fw fa-pause' : 'fa fa-fw fa-play';
		if(this.props.track.progress) 
		{
			this.props.track.progress.text.firstChild.className = classNames;
		}
	}

	render() {
		this.updateClass();
		return (
					
					<div>
						
						<button className="PlayBtn" onClick={this.handlePlayClick.bind(this)}>
							<div className="progress" id={"progress"+this.props.track.id}></div>
						</button>

						<audio
							type="audio/mpeg"
							id={this.props.track.audioId} 
							onTimeUpdate={this.handleTimeUpdate.bind(this)}
							onEnded={this.handleTrackEnded.bind(this)}
							onCanPlay={this.handleTrackReady.bind(this)}>
							<source src={this.props.track.url} />
					  	</audio>

					</div>	

				);
	}
}

