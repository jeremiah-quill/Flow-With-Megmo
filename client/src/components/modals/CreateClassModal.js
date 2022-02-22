import React from "react";
import CreateClassForm from "../forms/CreateClassForm";
import EditClassForm from "../forms/EditClassForm";

function CreateClassModal({ refetch }) {
	return (
		<div className="edit-class-modal">
			<h1 className="modal-title">Create Class</h1>
			<div className="modal-content">
				<CreateClassForm refetch={refetch} />
			</div>
		</div>
	);
}

export default CreateClassModal;
