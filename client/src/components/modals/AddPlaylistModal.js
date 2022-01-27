import React from "react";

function ListMembersModal({yogaClass}) {
	return (
		<div className="modal-card">
			<header className="modal-header">{yogaClass.date} @ {yogaClass.time}</header>
			<div className="modal-content">choose playlist</div>
			<div className="modal-footer">confirm</div>
		</div>
	);
}

export default ListMembersModal;
