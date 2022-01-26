import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// TODO: maybe rename to PathButton?
function Button({ path }) {
	return (
		<button className="back-button">
			<Link to={path}>
				<ArrowBackIcon />
			</Link>
		</button>
	);
}

export default Button;
