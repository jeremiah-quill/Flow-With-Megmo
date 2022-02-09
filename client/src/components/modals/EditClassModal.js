import React from "react";
import EditClassForm from "../forms/EditClassForm";


// TODO: this is broken, need to pull out time from timestamp rather than send time separately
function EditClassModal({ yogaClass }) {

	return (
		<div className="modal-card">
			<header className="modal-header">
				{yogaClass.date} @ {yogaClass.time}
			</header>
			<div className="modal-content">
				<EditClassForm
					values={{ date: yogaClass.date, time: yogaClass.time }}
					id={yogaClass.class_id}
				/>
			</div>
			<div className="modal-footer">
				<button form={yogaClass.class_id}>Confirm Class Update</button>
			</div>
		</div>
	);
}

export default EditClassModal;
