import React from "react";
import ParticipantList from "../ParticipantList";

function ListMembersModal({ yogaClass }) {
	// TODO: this list will come from yogaClass eventually.
	const participants = [
		{ firstName: "pat", lastName: "quill", email: "pmquill2@charter.net" },
		{ firstName: "pat", lastName: "quill", email: "pmquill2@charter.net" },
		{ firstName: "pat", lastName: "quill", email: "pmquill2@charter.net" },
		{ firstName: "pat", lastName: "quill", email: "pmquill2@charter.net" },
	];

	// TODO: once we are able to add students to a class in the db, populate this modal with participants from yogaClass.roster
	console.log(yogaClass)

	return (
		<div className="modal-card">
			<header className="modal-header">
				{yogaClass.date} @ {yogaClass.time}
			</header>
			<div className="modal-content">
				<ParticipantList participants={participants} />
			</div>
			<div className="modal-footer">none</div>
		</div>
	);
}

export default ListMembersModal;
