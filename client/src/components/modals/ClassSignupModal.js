import React from "react";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TO_ROSTER, ADD_CLASS_TO_STUDENT } from "../../utils/mutations";
import { useUserContext } from "../../utils/contexts/UserContext";
import { useToastContext } from "../../utils/contexts/ToastContext";
import parseDate from "../../utils/helpers/parseDate";
import "../../styles/ClassSignupModal.css";
import "../../styles/Class.css";
import megmoQr from "../../images/megmo-qr.png";
import { sendEmail } from "../../utils/API";
import {registerMsg} from '../../utils/emailMessages.js'

function ClassSignupModal({ scheduledClass, scheduleRefetch, studentScheduleRefetch }) {
	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 765;

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	// used to control the content the user sees (ability to register for class if they are signed in, required to login/signup if not signed in)
	const [registered, setRegistered] = useState(false);

	// get required contexts
	const { currentUser } = useUserContext();
	const { configureToast } = useToastContext();

	// parse date to print the day, month, hour, etc. to UI
	const { dayOfMonth, month, dayOfWeek, hour } = parseDate(scheduledClass.date);

	const classDetails = {
		dayOfMonth,
		month,
		dayOfWeek,
		hour,
	};

	// useMutation to add student to class
	const [addStudentToClass] = useMutation(ADD_TO_ROSTER);

	// useMutation to add class to student
	const [addClassToStudent] = useMutation(ADD_CLASS_TO_STUDENT);

	// TODO: check if student is already in class here too?  Already conditionally rendering button depending on if in class
	const handleRegister = async () => {
		try {
			const { data: addToRosterData } = await addStudentToClass({
				variables: { classId: scheduledClass._id, studentId: currentUser._id },
			});

			const { data: addClassToStudentData } = await addClassToStudent({
				variables: { studentId: currentUser._id, classId: scheduledClass._id },
			});

			const emailData = {
				toEmail: currentUser.email,
				subject: `Flow with Megmo Zoom Link: ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}`,
				message: registerMsg(classDetails, addToRosterData.addStudentToClass.link)
			};
			const emailResponse = await sendEmail(emailData);

			setRegistered(true);
			configureToast(
				"Success! You have registered for class.  Please follow instructions on the screen to pay your class fee.",
				"success",
				5000
			);
			scheduleRefetch();
			studentScheduleRefetch()
		} catch (err) {
			configureToast(
				"Something went wrong, please email us at flowwithmegmo@gmail.com",
				"failure",
				10000
			);
		}
	};

	return (
		<div className="class-signup-modal">
			{!registered ? (
				<h1 className="class-signup-header">Register</h1>
			) : (
				<h1 className="class-signup-header">Complete payment</h1>
			)}
			{!registered ? (
				<div className="modal-content">
					<div className="signup-step">
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
							className="main-btn"
							onClick={handleRegister}
						>
							Confirm
						</button>
					</div>
				</div>
			) : (
				<div className="modal-content">
					<div className="signup-step">
						<p className="venmo-instructions">
							We've sent a zoom meeting invite to {currentUser.email}. Please
							{width < breakpoint
								? "click the link below"
								: "scan the QR code below with your phone camera"}{" "}
							to complete payment via venmo. I can't wait to see you in class!
						</p>
						{width < breakpoint ? (
							<button className="main-btn">
								<a
									href={`https://venmo.com/meghan-moran-7?txn=pay&note=Flow+with+Megmo:+${scheduledClass.date}&amount=${scheduledClass.price}`}
								>
									Venmo
								</a>
							</button>
						) : (
							<img className="qr-code" src={megmoQr} />
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default ClassSignupModal;
