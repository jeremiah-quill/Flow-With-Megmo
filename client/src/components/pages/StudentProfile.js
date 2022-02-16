import { useState } from "react";
import {
	QUERY_UPCOMING_STUDENT_CLASSES,
	QUERY_COMPLETED_STUDENT_CLASSES,
} from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useUserContext } from "../../utils/contexts/UserContext";
import { useToastContext } from "../../utils/contexts/ToastContext";
import RegisteredClassList from "../lists/RegisteredClassList";
import CompletedClassList from "../lists/CompletedClassList";
import {
	REMOVE_CLASS_FROM_STUDENT,
	REMOVE_FROM_ROSTER,
} from "../../utils/mutations";
import "../../styles/LoggedInHome.css";
import { useModalContext } from "../../utils/contexts/ModalContext";

function StudentProfile() {
	// toggle between list of registered and completed classes
	const [listView, setListView] = useState("registered");

	// get user, modal, and toast contexts
	const { currentUser } = useUserContext();
	const { resetModal } = useModalContext();
	const { configureToast } = useToastContext();

	// Query upcoming student classes
	// fetchPolicy set to network only so it re-fetches from db every render, rather than use cache
	const {
		loading: upcomingLoading,
		data: upcomingData,
		error: upcomingError,
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
	const handleUnregister = async (classId, studentId) => {
		try {
			const { data } = await removeFromRoster({
				variables: { classId, studentId },
			});
			const { data: registeredCancellation } = await removeClassFromStudent({
				variables: { studentId, classId },
			});
			resetModal();
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
	if (upcomingLoading) return <div className="view">Loading</div>;
	if (upcomingError)
		return <div className="view">Error! {upcomingError.message}</div>;
	if (completedLoading) return <div className="view">Loading</div>;
	if (completedError)
		return <div className="view">Error! {completedError.message}</div>;
	if (removeStudentError)
		return <div className="view">Error! ${removeStudentError.message}</div>;
	if (removeClassFromStudentError)
		return (
			<div className="view">Error! ${removeClassFromStudentError.message}</div>
		);

	return (
		<div className="logged-in-home view">
			<div className="student-info">
				<h2 className="logged-in-header">Welcome {currentUser.username}</h2>
				<p>
					If you need to cancel a registration for any reason, please do so
					here. You will receive an email confirming your cancellation and we
					will reimburse your class fee within 48 hours. <br></br>
					<br></br>
					Browse your completed classes and check out my playlist for each
					class.
				</p>
			</div>
			<div className="student-lists-container">
				<div className="student-list-buttons">
					<button
						className={`list-btn ${
							listView === "registered" ? "selected-list" : ""
						}`}
						onClick={() => setListView("registered")}
					>
						Registered
					</button>
					<button
						className={`list-btn ${
							listView === "completed" ? "selected-list" : ""
						}`}
						onClick={() => setListView("completed")}
					>
						Completed
					</button>
				</div>
				{listView === "registered" ? (
					studentUpcomingClasses.length <= 0 ? (
						<div className="no-classes">
							You do not have any registered classes at this time.
						</div>
					) : (
						<RegisteredClassList
							registeredClasses={studentUpcomingClasses}
							handleUnregister={handleUnregister}
						/>
					)
				) : studentCompletedClasses.length <= 0 ? (
					<div className="no-classes">
						You do not have any completed classes at this time.
					</div>
				) : (
					<CompletedClassList completedClasses={studentCompletedClasses} />
				)}
			</div>
		</div>
	);
}

export default StudentProfile;
