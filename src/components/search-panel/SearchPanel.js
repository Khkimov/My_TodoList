import React from "react";
import { Component } from "react";
import "./SearchPanel.css";

export default class SearchPanel extends Component {

	state = {
		search: ''
	};

	onSearchPanel = (e) => {
		const search = e.target.value
		this.setState({search})
		this.props.onSearchPanel(search)
	}

	render () {
		return (
			<div className="input-group">
				<input 
				className="input-group-text"
				placeholder="type to search"
				value={this.state.search}
				onChange={this.onSearchPanel}
				/>
			</div>
		);
	};
};
