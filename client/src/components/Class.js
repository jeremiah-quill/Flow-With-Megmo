import React from "react";
import { useParams } from "react-router-dom";
import BraintreeDropIn from "./BraintreeDropIn";
import Button from "./Button";

function Class() {
	// TODO: add a zoom meeting registrant to zoom meeting with this id
	let { id } = useParams();

	return (
		<div className="class absolute">
			<Button path={"/classes"} />
			<BraintreeDropIn />
		</div>
	);
}

export default Class;


