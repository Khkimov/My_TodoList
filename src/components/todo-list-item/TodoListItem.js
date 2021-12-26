import React from "react";
import { Component } from "react";
import "./TodoListItem.css";

export default class TodoListItem extends Component {

	render () {
		const { label, onDeleted, onToggleDone, onToggleImportant, done, important } = this.props;

		let classNames = "todo-list-item";
		if (done) {
			classNames += ' done'
		};

		if (important) {
			classNames += ' important'
		};
	
	return (
		<div className={classNames}>
		<span
		className="todo-list-item-label"
		onClick={onToggleDone}>
			{label}
		</span>
		<button type="button" 
		className="btn btn-outline-success btn-sm me-md-2 float-end"
		onClick={onToggleImportant}>
			<i className="fas fa-exclamation"></i>
			</button>
		<button type="button" 
		onClick={onDeleted}
		className="btn btn-outline-danger btn-sm me-md-2 float-end">
			<i className="fas fa-trash-alt"></i>
			</button>
		</div>
	);
	}
};
