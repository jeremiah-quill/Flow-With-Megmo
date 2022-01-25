import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Button({ title, path }) {
	return (
		// <button className="back-button">
			<Link className="back-button" to={path}><ArrowBackIcon/></Link>
	);
}

export default Button;
