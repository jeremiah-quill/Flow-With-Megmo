import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className="not-found">
			<div className="not-found-content">
				Page not found, sorry! Click <Link to="/">here</Link> to go back home.
			</div>
		</div>
	);
}

export default NotFound;
