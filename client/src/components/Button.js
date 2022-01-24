import React from "react";
import { Link } from "react-router-dom";

function Button({ title, path }) {
	return (
		<button className="back-button">
			<Link to={path}>{title}</Link>
		</button>
	);
}

export default Button;
