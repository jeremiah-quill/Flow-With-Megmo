import React from "react";
import parseDate from "../../utils/helpers/parseDate";
import { useUserContext } from "../../utils/contexts/UserContext";

function CancelRegistrationModal({ date, classId, handleUnregister }) {
	const { dayOfMonth, month, dayOfWeek, hour } = parseDate(date);

	const { currentUser } = useUserContext();

	const classDetails = { dayOfMonth, month, dayOfWeek, hour };

	return (
		<div className="cancel-modal">
			<h1 className="modal-title">Confirm Cancellation</h1>
			<div className="modal-content">
				<div className="please-confirm-cancel">
					<p>
						Please confirm you would like to cancel your registration for class
						on {dayOfWeek}, {month}/{dayOfMonth} @ {hour}. If you don't see a
						reimbursement within 48 hours please email me at
						flowwithmegmo@gmail.com. Thanks!
					</p>
					<button
						className="main-btn modal-btn"
						onClick={() =>
							handleUnregister(classId, currentUser._id, classDetails)
						}
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
}

export default CancelRegistrationModal;
