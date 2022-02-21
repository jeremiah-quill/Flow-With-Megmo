import React from "react";
import parseDate from '../../utils/helpers/parseDate'
import { useUserContext } from "../../utils/contexts/UserContext";

function CancelRegistrationModal({ date, classId, handleUnregister }) {

	const { dayOfMonth, month, dayOfWeek, hour } = parseDate(date);

	const { currentUser } = useUserContext();

	const classDetails = {dayOfMonth, month, dayOfWeek, hour}




	return (
		<div className="modal-center">
			<h1>Confirm Cancellation</h1>
			<div className="modal-content">
				Please confirm you would like to cancel your registration for class on{" "}
				{dayOfWeek}, {month}/{dayOfMonth} @ {hour}. If you don't see a
				reimbursement within 48 hours please email me at
				flowwithmegmo@gmail.com. Thanks!
			</div>
			<button className="btn btn-pink" onClick={() => handleUnregister(classId, currentUser._id, classDetails)}>
				Confirm
			</button>
		</div>
	);
}

export default CancelRegistrationModal;
