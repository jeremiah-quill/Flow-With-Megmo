import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	QUERY_UPCOMING_STUDENT_CLASSES,
	QUERY_COMPLETED_STUDENT_CLASSES,
} from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useUserContext } from "../utils/contexts/UserContext";
import { useToastContext } from "../utils/contexts/ToastContext";
import RegisteredClassList from "./lists/RegisteredClassList";
import CompletedClassList from "./lists/CompletedClassList";
import {
	REMOVE_CLASS_FROM_STUDENT,
	REMOVE_FROM_ROSTER,
} from "../utils/mutations";
import "../styles/LoggedInHome.css";
import { useModalContext } from "../utils/contexts/ModalContext";
import { sendEmail } from "../utils/API";
import { unregisterMsg } from "../utils/emailMessages.js";
import "../styles/Classes.css";
import { QUERY_UPCOMING_CLASSES } from "../utils/queries";
// import { useQuery } from "@apollo/client";
import ScheduledClassList from "./lists/ScheduledClassList";
import UserButtons from "./UserButtons";
import { CSSTransition } from "react-transition-group";
import Navbar from "./Navbar";
import hamburger from "../images/hamburger.png";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
	// const [sidebarContent, setSidebarContent] = useState(0);

	// get user, modal, and toast contexts
	const { currentUser } = useUserContext();
	// const { resetModal } = useModalContext();
	// const { configureToast } = useToastContext();

	// const {
	// 	loading: scheduledLoading,
	// 	data: scheduledData,
	// 	error: scheduledError,
	// 	refetch,
	// } = useQuery(QUERY_UPCOMING_CLASSES, { fetchPolicy: "network-only" });
	// const classes = scheduledData?.getUpcomingClasses || [];

	// Query upcoming student classes
	// fetchPolicy set to network only so it re-fetches from db every render, rather than use cache
	// const {
	// 	loading: upcomingLoading,
	// 	data: upcomingData,
	// 	error: upcomingError,
	// 	refetch: refetchUpcomingStudentClasses,
	// } = useQuery(QUERY_UPCOMING_STUDENT_CLASSES, {
	// 	variables: { studentId: currentUser._id },
	// 	fetchPolicy: "network-only",
	// });
	// const studentUpcomingClasses = upcomingData?.getUpcomingStudentClasses || [];

	// Query completed student classes
	// fetchPolicy set to network only so it re-fetches from db every render, rather than use cache
	// const {
	// 	loading: completedLoading,
	// 	data: completedData,
	// 	error: completedError,
	// } = useQuery(QUERY_COMPLETED_STUDENT_CLASSES, {
	// 	variables: { studentId: currentUser._id },
	// 	fetchPolicy: "network-only",
	// });
	// const studentCompletedClasses =
	// 	completedData?.getCompletedStudentClasses || [];

	// Mutation to remove a student from class roster when they cancel registration
	// const [removeFromRoster, { error: removeStudentError }] =
	// 	useMutation(REMOVE_FROM_ROSTER);

	// Mutation to remove a class from student's registered classes field when they cancel registration
	// refetchQueries set to query upcoming classes -> whenever we run this mutation to cancel a class, we will also re-run get upcoming student classes to refresh the list
	// const [removeClassFromStudent, { error: removeClassFromStudentError }] =
	// 	useMutation(REMOVE_CLASS_FROM_STUDENT, {
	// 		refetchQueries: [
	// 			QUERY_UPCOMING_STUDENT_CLASSES,
	// 			"getUpcomingStudentClasses",
	// 		],
	// 	});

	// Fires 2 mutations, 1 to class and 1 to student on unregister confirmation
	// Closes modal and sends user a toast message with success or error
	// const handleUnregister = async (classId, studentId, classDetails) => {
	// 	const { dayOfWeek, month, dayOfMonth, hour } = classDetails;
	// 	try {
	// 		const { data: removeFromRosterData } = await removeFromRoster({
	// 			variables: { classId, studentId },
	// 		});
	// 		const { data: removeClassFromStudentData } = await removeClassFromStudent(
	// 			{
	// 				variables: { studentId, classId },
	// 			}
	// 		);

	// 		// Send email to user confirming their cancellation
	// 		const emailData = {
	// 			toEmail: currentUser.email,
	// 			subject: `Unregistered from class on ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}`,
	// 			message: unregisterMsg(classDetails),
	// 		};
	// 		const emailResponse = await sendEmail(emailData);

	// 		resetModal();
	// 		refetch();

	// 		configureToast(
	// 			"You have been successfully removed from class.",
	// 			"success",
	// 			5000
	// 		);
	// 	} catch (err) {
	// 		console.error(err);
	// 		configureToast(
	// 			"Something went wrong, please email us at flowwithmegmo@gmail.com",
	// 			"failure",
	// 			10000
	// 		);
	// 	}
	// };

	// TODO: can I condense this?

	// if (scheduledLoading) return "";
	// if (scheduledError) return <div>`Error! ${scheduledError.message}`</div>;

	// if (upcomingLoading) return "";
	// if (upcomingError)
	// 	return <div className="view">Error! {upcomingError.message}</div>;
	// if (completedLoading) return "";
	// if (completedError)
	// 	return <div className="view">Error! {completedError.message}</div>;
	// if (removeStudentError)
	// 	return <div className="view">Error! ${removeStudentError.message}</div>;
	// if (removeClassFromStudentError)
	// 	return (
	// 		<div className="view">Error! ${removeClassFromStudentError.message}</div>
	// 	);

	return (
		<>
			<button
				className="hamburger"
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			>
				<img src={hamburger} />
			</button>
			<CSSTransition
				timeout={500}
				in={isSidebarOpen}
				unmountOnExit={true}
				classNames="sidebar-slide"
			>
				<div>
					<div
						className={`modal-backdrop`}
						onClick={() => setIsSidebarOpen(false)}
					></div>
					<div className="sidebar">
						<div className="hero-content hero-content-sidebar">
							<h1 className="hero-title">Flow with Megmo</h1>
						</div>
						<Navbar />
					</div>
				</div>
			</CSSTransition>
		</>
	);
}

export default Sidebar;
