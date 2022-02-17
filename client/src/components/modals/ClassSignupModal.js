import React from "react";
import "../../styles/ClassSignupModal.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TO_ROSTER, ADD_CLASS_TO_STUDENT } from "../../utils/mutations";
import { useUserContext } from "../../utils/contexts/UserContext";
import { useToastContext } from "../../utils/contexts/ToastContext";
import "../../styles/Class.css";
import parseDate from "../../utils/helpers/parseDate";

function ClassSignupModal({ scheduledClass, scheduleRefetch }) {
	// get user context
	const { currentUser } = useUserContext();
	const { configureToast } = useToastContext();

	// parse date to print the day, month, hour, etc. to UI
	const { dayOfMonth, month, dayOfWeek, hour } = parseDate(scheduledClass.date);

	// use mutation for adding a student to class based on class _id and student _id
	const [addStudentToClass, { error: rosterError }] =
		useMutation(ADD_TO_ROSTER);

	// use mutation for adding a class to student based on student _id and class _id
	const [addClassToStudent, { error: registeredError }] =
		useMutation(ADD_CLASS_TO_STUDENT);

	// used to control the content the user sees (ability to register for class if they are signed in, required to login/signup if not signed in)
	const [registered, setRegistered] = useState(false);

	const handleSubmit = async (e) => {
		// TODO: check if student is already in this class.  if they are, notify them.  if they aren't, add student to DB with graphQL mutation
		try {
			const { rosterUpdateData } = await addStudentToClass({
				variables: { classId: scheduledClass._id, studentId: currentUser._id },
			});
			// TODO: why is this giving me undefined?
			console.log(rosterUpdateData);

			const { registeredUpdateData } = await addClassToStudent({
				variables: { studentId: currentUser._id, classId: scheduledClass._id },
			});
			// TODO: why is this giving me undefined?
			console.log(registeredUpdateData);

			// TODO: if add to db is success, show venmo
			setRegistered(true);
			configureToast(
				"Success! You have registered for class.  Please follow instructions on the screen to pay your class fee.",
				"success",
				5000
			);
			scheduleRefetch();
		} catch (err) {
			console.error(err);
			configureToast(
				"Something went wrong, please email us at flowwithmegmo@gmail.com",
				"failure",
				10000
			);
		}
	};

	return (
		<div className="class-signup-modal">
			{/* <div className="modal-content"> */}
			{!registered ? <h1 className="class-signup-header">Register</h1> : <h1 className="class-signup-header">Complete payment</h1>}
				{!registered ? (
					<div className="modal-content">
						<div className="signup-step">
						{/* <h1 className="class-signup-header">Register</h1> */}
						{/* <div> */}
							<ul className="class-details-list">
								<li className="class-details-item">
									Date: {dayOfWeek}, {month}/{dayOfMonth}
								</li>
								<li className="class-details-item">Time: {hour}</li>
								<li className="class-details-item">
									Price: ${scheduledClass.price}
								</li>
							</ul>
							<button
								className="btn btn-pink btn-round register-btn register-submit-btn"
								onClick={handleSubmit}
							>
								Register
							</button>
							</div>
						{/* </div> */}
					</div>
				) : (
					<div className="modal-content">
						<div className="signup-step">						{/* <h1 className="class-signup-header">Complete payment</h1> */}
						<p className="venmo-instructions">
							We've sent a zoom meeting invite to {currentUser.email}. Please
							click the link below to complete payment via venmo. I can't wait
							to see you in class!
						</p>
						<button className="btn venmo-btn btn-green">
						<a 
							href={`https://venmo.com/meghan-moran-7?txn=pay&note=Flow+with+Megmo:+${scheduledClass.date}&amount=${scheduledClass.price}`}
						>
							Venmo
						</a>
						</button>
						</div>
					</div>
				)}
			{/* </div> */}
		</div>
	);
}

export default ClassSignupModal;
