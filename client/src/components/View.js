import React from "react";

function View({ content, title }) {
	return (
		<div className="view">
			<header className="view-header">{title}</header>
			{content}
		</div>
	);
}

export default View;
