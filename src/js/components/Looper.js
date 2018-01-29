import React from "react";
import tracks from '../tracks.js';
import TrackList from './TracksList';
import PlayPauseButton from './PlayPause';
import TrackSelector from './TrackSelector';
import ProgressBar from "progressbar.js";


function init() {
	var arr = [];

	tracks.forEach(function(element,i) {
	
	var trackName = element.url.substring(element.url.lastIndexOf("/")+1).split(".");
    arr[i] = {
    "id": element.Id,
    "progress": null,
    "audioId": 'audio'+ (element.Id),
    "owner": element.owner,
    "isSelected": true,
	"name": trackName[0],
	"url": element.url,
	"isPlaying": false,
	"isMuted": false,
	"duration": 0,
	"bpm": 0,
	}
});
	return arr;
}

var colors = ['rgb(211,51,44)', 'rgb(139,41,140)', 'rgb(80,31,107)', 'rgb(69,93,186)', 'rgb(100,181,236)', 'rgb(222,143,57)'];

export default class Looper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tracksList: init(),
			tracksSelect: [],
			isPlayAll: false, 
		};

		this.onSync = this.onSync.bind(this);
		this.sortTracks = this.sortTracks.bind(this);
		this.playAll = this.playAll.bind(this);
		this.stopAll = this.stopAll.bind(this);
		this.togglePlay = this.togglePlay.bind(this);
		this.togglePlayAll = this.togglePlayAll.bind(this);
		this.onTrackEnded = this.onTrackEnded.bind(this);
		this.onTrackReady = this.onTrackReady.bind(this);
		this.onTrashClicked = this.onTrashClicked.bind(this);
		this.onTrackSelected = this.onTrackSelected.bind(this);
		this.onVolumeClicked = this.onVolumeClicked.bind(this);
	}

	playAll() {
		const tracksList = this.state.tracksList.slice();
		tracksList.forEach(function(track,i) {
			track.isPlaying = true;
			let audio = document.getElementById(track.audioId);
			audio.currentTime = 0;
			audio.loop = true;

  			var playPromise = audio.play();
  			// console.log(playPromise);
  			if (playPromise !== undefined) {
			    playPromise.then(_ => {
			    	//audio will play
			    })
			    .catch(error => {
			      console.log(error);
			    });
			}
  			
		});

		this.setState({tracksList: tracksList, isPlayAll: true});
	}

	stopAll() {
		const tracksList = this.state.tracksList.slice();
		tracksList.forEach(function(track,i) {
			track.isPlaying = false;
			let audio = document.getElementById(track.audioId);
			audio.loop = false;
  			audio.pause();
  			audio.currentTime = 0;
		});

		this.setState({tracksList: tracksList, isPlayAll: false});
	}

	togglePlay(track) {
		const tracksList = this.state.tracksList.slice();
		let audio = document.getElementById(track.audioId);

		audio.loop = false;

		if(track.isPlaying) {
			track.isPlaying = false;
			audio.pause();
		}
		else
		{
			track.isPlaying = true;
			audio.play();
		}

		this.setState({tracksList: tracksList});
	}

	onTrackEnded(track) {
		const tracksList = this.state.tracksList.slice();
		let audio = document.getElementById(track.audioId);

		track.isPlaying = false;
		audio.currentTime = 0;
		this.setState({tracksList: tracksList});
	}

	onTrackReady(duration, track) {
		const progressId = '#progress'+track.id;
		track.duration = duration;
		
		if(track.progress === null)
		{
			track.progress = new ProgressBar.Circle(progressId, {
		        color: colors[track.id-1 % colors.length],
		        strokeWidth: 5,
		        trailWidth: 2,
		        trailColor: 'black',
		        easing: 'easeInOut',
		        text: {
		        	value: '<i class="fa fa-fw fa-play"></i>',
		    	}
		    });
		}
	}

	togglePlayAll() {		
		if(!this.state.isPlayAll)
		{
			this.playAll();
		}
		else {
			this.stopAll();
		}
	}

	onTrashClicked(trackId) {
		const tracksList = this.state.tracksList.slice();
		const tracksSelect = this.state.tracksSelect.slice();
		const track = this.state.tracksList[trackId];

		track.isPlaying = false;
		track.isMuted = false;
		track.progress = null;

		tracksList.splice(trackId,1);
		tracksSelect.push(track);

		track.isSelected = false;
		this.setState({tracksList: tracksList, tracksSelect: tracksSelect});
	}

	onVolumeClicked(trackId) {
		const tracksList = this.state.tracksList.slice();

		let audio = document.getElementById(tracksList[trackId].audioId);
		tracksList[trackId].isMuted = !audio.muted;
		audio.muted = !audio.muted;
		
		this.setState({tracksList: tracksList});
	}

	onTrackSelected(trackId) {
		const tracksList = this.state.tracksList.slice();
		const tracksSelect = this.state.tracksSelect.slice();
		const track = tracksSelect[trackId];

		tracksSelect.splice(trackId, 1);
		tracksList.push(track);

		track.isSelected = true;
		this.setState({tracksList: tracksList, tracksSelect: tracksSelect});
	}

	sortTracks() {
		const tracksList = this.state.tracksList.slice();
		tracksList.sort(function(a,b){return a.duration < b.duration});
		this.setState({tracksList: tracksList});
	}

	onSync() {
		    this.sortTracks();
	}

  render() {
    return (
      <div className="tracks">
      	<div className="btn-group topControls">
      		<button className="SyncBtn" onClick={this.onSync}>Sync</button>
      		<PlayPauseButton status={this.state.isPlayAll} play={this.togglePlayAll}/>
      	</div>

      	<TrackSelector options={this.state.tracksSelect} onTrackSelected={this.onTrackSelected}/>
      	
        <TrackList 
        	tracks={this.state.tracksList}
        	onPlayClicked={this.togglePlay}
        	onTrackEnded={this.onTrackEnded}
        	onTrackReady={this.onTrackReady}
        	onVolumeClicked={this.onVolumeClicked}
        	onTrashClicked={this.onTrashClicked} />
      </div>
    );
  }
}
