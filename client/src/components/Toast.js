import React from "react";

function Toast({ message, show }) {
	if (!show) {
		return <></>
	} else return <div className="toast">{message}</div>;
}

export default Toast;
