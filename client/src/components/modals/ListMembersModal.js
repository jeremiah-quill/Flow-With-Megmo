import React from "react";
import ParticipantList from "../lists/ParticipantList";

function ListMembersModal({ yogaClass }) {
	return (
		<div className="current-registrant-modal">
			<div className="modal-content participant-content">
				{yogaClass.roster.length > 0 ? (
					<ParticipantList participants={yogaClass.roster} />
				) : (
					<div className="no-current-registrants empty-list">No current registrants, check back later</div>
				)}
			</div>
		</div>
	);
}

export default ListMembersModal;
