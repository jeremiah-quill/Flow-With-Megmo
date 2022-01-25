import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Button({ path }) {
	return (
		// <button className="back-button">
		<button className="back-button">
			<Link to={path}>
				<ArrowBackIcon />
			</Link>
		</button>
	);
}

export default Button;
