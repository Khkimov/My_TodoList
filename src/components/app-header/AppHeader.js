import React from "react";
import "./AppHeader.css";

const AppHeader = ({toDo, done}) => {
	return (
		<div className="app-header">
			<h1>Todo</h1>
			<p>{toDo} more to do, {done} done</p>
		</div>
	);
};

export default AppHeader;