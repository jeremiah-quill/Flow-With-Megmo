import React from "react";
import EditClassForm from "../forms/EditClassForm";


// TODO: this is broken, need to pull out time from timestamp rather than send time separately
function EditClassModal({ yogaClass }) {

	return (
		<div>
		{/* <div className="modal-card"> */}
			<header className="modal-header">
				{yogaClass.date} @ {yogaClass.time}
			</header>
			<div className="modal-content">
				<EditClassForm
					currentDateString={yogaClass.date}
					zoomId={yogaClass.zoomId}
					classId={yogaClass._id}
				/>
			</div>
			<div className="modal-footer">
				<button form={yogaClass._id}>Confirm Class Update</button>
			</div>
		{/* </div> */}
		</div>
	);
}

export default EditClassModal;
