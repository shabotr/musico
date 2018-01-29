import React from 'react';
import Select from 'react-select';

export default class TrackSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: undefined,
		}
	}

	renderTrackOptions() {
	  	var options = [];
	    
	    this.props.options.map((track, index) => {
	    	options.push({
	    					"value": index,
	    					"label": track.name
	    				})
	    });

	    return options;
	  }

	handleTrackChange(value) {
		this.props.onTrackSelected(value.value);
	}
	
	render() {
		return (
			<Select
				multi={false}
				placeholder="Select Track"
				options={this.renderTrackOptions()}
				onChange={this.handleTrackChange.bind(this)}
				value={this.state.value}
			/>

		);
	}
} 