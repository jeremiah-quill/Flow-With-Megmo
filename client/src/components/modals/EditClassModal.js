import React from "react";
import EditClassForm from "../forms/EditClassForm";


// TODO: this is broken, need to pull out time from timestamp rather than send time separately
function EditClassModal({ scheduledClass }) {

	return (
		<div>
		{/* <div className="modal-card"> */}
			<header className="modal-header">
				{scheduledClass.date} @ {scheduledClass.time}
			</header>
			<div className="modal-content">
				<EditClassForm
					currentDateString={scheduledClass.date}
					zoomId={scheduledClass.zoomId}
					classId={scheduledClass._id}
				/>
			</div>
			<div className="modal-footer">
				<button form={scheduledClass._id}>Confirm Class Update</button>
			</div>
		{/* </div> */}
		</div>
	);
}

export default EditClassModal;
