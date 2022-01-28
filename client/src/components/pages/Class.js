import React from "react";
import { useParams } from "react-router-dom";
import Button from "../Button";
import JoinClassForm from "../JoinClassForm";

function Class() {
	// TODO: add a zoom meeting registrant to zoom meeting with this id
	let { id } = useParams();
		return (
			<div className="class absolute">
				<Button path={"/classes"} />
				<JoinClassForm
					meetingId={id}
				/>
			</div>
		);
}

export default Class;
