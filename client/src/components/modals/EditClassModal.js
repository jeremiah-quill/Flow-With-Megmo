import React from "react";
import EditClassForm from "../forms/EditClassForm";


function EditClassModal({ scheduledClass, refetch }) {

	return (
		<div className="edit-class-modal">
			<h1 className="modal-title">Update Class Details</h1>
			<div className="modal-content">
				<EditClassForm
					currentDateString={scheduledClass.date}
					zoomId={scheduledClass.zoomId}
					classId={scheduledClass._id}
					refetch={refetch}
				/>
			</div>
		</div>
	);
}

export default EditClassModal;
