import React from 'react';

export default class DeleteBtn extends React.Component {

	handleTrashClick(trackId) {
		this.props.onTrashClicked(trackId);
	}

	render() {
		let classNames = this.props.track.isPlaying ? 'fa fa-fw fa-pause' : 'fa fa-fw fa-play'; 		
		return (
					<div>
						<button className="trashBtn" onClick={this.handleTrashClick.bind(this,this.props.id)}>
							<i className="fa fa-trash"></i>
						</button>
					</div>
				);
	}å
}