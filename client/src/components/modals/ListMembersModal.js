import React from "react";
import ParticipantList from "../ParticipantList";

function ListMembersModal({ yogaClass }) {

	return (
		<div>
			<div className="modal-content">
				{yogaClass.roster.length > 0 ? (
					<ParticipantList participants={yogaClass.roster} />
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default ListMembersModal;
