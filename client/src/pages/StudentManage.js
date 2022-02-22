import React, { useState } from "react";
import {
	QUERY_UPCOMING_STUDENT_CLASSES,
	QUERY_COMPLETED_STUDENT_CLASSES,
} from "../utils/queries";
import { QUERY_UPCOMING_CLASSES } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import {
	REMOVE_CLASS_FROM_STUDENT,
	REMOVE_FROM_ROSTER,
} from "../utils/mutations";
import { useModalContext } from "../utils/contexts/ModalContext";
import { useUserContext } from "../utils/contexts/UserContext";
import { useToastContext } from "../utils/contexts/ToastContext";
import { useWidthContext } from "../utils/contexts/WidthContext";
import { sendEmail } from "../utils/API";
import { unregisterMsg } from "../utils/emailMessages.js";
import ScheduledClassList from "../components/lists/ScheduledClassList";
import RegisteredClassList from "../components/lists/RegisteredClassList";
import CompletedClassList from "../components/lists/CompletedClassList";

function StudentManage() {
	const [listContent, setListContent] = useState(0);

	// get user, modal, toast, and width contexts
	const { currentUser } = useUserContext();
	const { resetModal } = useModalContext();
	const { configureToast } = useToastContext();
	const { width, breakpoint } = useWidthContext();

	const {
		loading: scheduledLoading,
		data: scheduledData,
		error: scheduledError,
		refetch,
	} = useQuery(QUERY_UPCOMING_CLASSES, { fetchPolicy: "network-only" });
	const classes = scheduledData?.getUpcomingClasses || [];

	// Query upcoming student classes
	// fetchPolicy set to network only so it re-fetches from db every render, rather than use cache
	const {
		loading: upcomingLoading,
		data: upcomingData,
		error: upcomingError,
		refetch: refetchUpcomingStudentClasses,
	} = useQuery(QUERY_UPCOMING_STUDENT_CLASSES, {
		variables: { studentId: currentUser._id },
		fetchPolicy: "network-only",
	});
	const studentUpcomingClasses = upcomingData?.getUpcomingStudentClasses || [];

	// Query completed student classes
	// fetchPolicy set to network only so it re-fetches from db every render, rather than use cache
	const {
		loading: completedLoading,
		data: completedData,
		error: completedError,
	} = useQuery(QUERY_COMPLETED_STUDENT_CLASSES, {
		variables: { studentId: currentUser._id },
		fetchPolicy: "network-only",
	});
	const studentCompletedClasses =
		completedData?.getCompletedStudentClasses || [];

	// Mutation to remove a student from class roster when they cancel registration
	const [removeFromRoster, { error: removeStudentError }] =
		useMutation(REMOVE_FROM_ROSTER);

	// Mutation to remove a class from student's registered classes field when they cancel registration
	// refetchQueries set to query upcoming classes -> whenever we run this mutation to cancel a class, we will also re-run get upcoming student classes to refresh the list
	const [removeClassFromStudent, { error: removeClassFromStudentError }] =
		useMutation(REMOVE_CLASS_FROM_STUDENT, {
			refetchQueries: [
				QUERY_UPCOMING_STUDENT_CLASSES,
				"getUpcomingStudentClasses",
			],
		});

	// Fires 2 mutations, 1 to class and 1 to student on unregister confirmation
	// Closes modal and sends user a toast message with success or error
	const handleUnregister = async (classId, studentId, classDetails) => {
		const { dayOfWeek, month, dayOfMonth, hour } = classDetails;
		try {
			const { data: removeFromRosterData } = await removeFromRoster({
				variables: { classId, studentId },
			});
			const { data: removeClassFromStudentData } = await removeClassFromStudent(
				{
					variables: { studentId, classId },
				}
			);

			// Send email to user confirming their cancellation
			const emailData = {
				toEmail: currentUser.email,
				subject: `Unregistered from class on ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}`,
				message: unregisterMsg(classDetails),
			};
			const emailResponse = await sendEmail(emailData);

			resetModal();
			refetch();

			configureToast(
				"You have been successfully removed from class.",
				"success",
				5000
			);
		} catch (err) {
			console.error(err);
			configureToast(
				"Something went wrong, please email us at flowwithmegmo@gmail.com",
				"failure",
				10000
			);
		}
	};

	// TODO: can I condense this?

	if (scheduledLoading) return "";
	if (scheduledError) return <div>`Error! ${scheduledError.message}`</div>;

	if (upcomingLoading) return "";
	if (upcomingError)
		return <div className="view">Error! {upcomingError.message}</div>;
	if (completedLoading) return "";
	if (completedError)
		return <div className="view">Error! {completedError.message}</div>;
	if (removeStudentError)
		return <div className="view">Error! ${removeStudentError.message}</div>;
	if (removeClassFromStudentError)
		return (
			<div className="view">Error! ${removeClassFromStudentError.message}</div>
		);

	return (
		<div className="student-manage">
			{width < breakpoint ? (
				<div className="multiple-lists-container">
					<nav className="list-nav">
						<ul className="list-nav-ul">
							<li
								className={`list-nav-item multiple-lists-nav-item ${listContent === 0 ? "selected-list" : ""}`}
								
								onClick={() => setListContent(0)}
							>
								Available
							</li>
							<li
								className={`list-nav-item multiple-lists-nav-item ${listContent === 1 ? "selected-list" : ""}`}
								onClick={() => setListContent(1)}
							>
								Registered
							</li>
							<li
								className={`list-nav-item multiple-lists-nav-item ${listContent === 2 ? "selected-list" : ""}`}
								onClick={() => setListContent(2)}
							>
								Completed
							</li>
						</ul>
					</nav>
					{listContent === 0 ? (
						<ScheduledClassList
							scheduledClasses={classes}
							scheduleRefetch={refetch}
							studentScheduleRefetch={refetchUpcomingStudentClasses}
						/>
					) : listContent === 1 ? (
						<RegisteredClassList
							registeredClasses={studentUpcomingClasses}
							handleUnregister={handleUnregister}
						/>
					) : (
						<CompletedClassList completedClasses={studentCompletedClasses} />
					)}
				</div>
			) : (
				<div className="lists-container">
					<div>
						<h1 className="list-title">Available Classes</h1>
						<ScheduledClassList
							scheduledClasses={classes}
							scheduleRefetch={refetch}
							studentScheduleRefetch={refetchUpcomingStudentClasses}
						/>
					</div>
					<div>
						<h1 className="list-title">Registered Classes</h1>

						<RegisteredClassList
							registeredClasses={studentUpcomingClasses}
							handleUnregister={handleUnregister}
						/>
					</div>
					<div>
						<h1 className="list-title">Completed Classes</h1>

						<CompletedClassList completedClasses={studentCompletedClasses} />
					</div>
				</div>
			)}
		</div>
	);
}

export default StudentManage;
