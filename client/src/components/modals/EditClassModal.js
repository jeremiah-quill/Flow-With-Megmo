import React from "react";
import EditClassForm from "../forms/EditClassForm";


function EditClassModal({ scheduledClass, refetch }) {

	return (
		<div>
			<header className="modal-header">
				{scheduledClass.date} @ {scheduledClass.time}
			</header>
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
