import { useState } from "react";
import { QUERY_SINGLE_STUDENT, QUERY_UPCOMING_STUDENT_CLASSES, QUERY_COMPLETED_STUDENT_CLASSES } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useUserContext } from "../../utils/contexts/UserContext";
import { useToastContext } from "../../utils/contexts/ToastContext";

import {
	REMOVE_CLASS_FROM_STUDENT,
	REMOVE_FROM_ROSTER,
} from "../../utils/mutations";
import "../../styles/LoggedInHome.css";
import RegisteredClass from "../list_items/RegisteredClass";
import { useModalContext } from "../../utils/contexts/ModalContext";
import CompletedClass from "../list_items/CompletedClass";

// TODO: figure out how to separate scheduled classes from completed classes
function LoggedInHome() {
	const [listView, setListView] = useState("registered");
	// get user context
	const { currentUser } = useUserContext();
	const { resetModal } = useModalContext();
	const { configureToast } = useToastContext();


	// find student info, including their registered classes
	// set fetchPolicy to network only -> whenever this component is mounted it will pull from our network DB
	const { loading, data, error } = useQuery(QUERY_SINGLE_STUDENT, {
		variables: { studentId: currentUser._id },
		fetchPolicy: "network-only",
	});
	const studentData = data?.getStudentById || [];

	// console.log(currentUser._id)
	const { loading: upcomingLoading, data: upcomingData, error: upcomingError } = useQuery(QUERY_UPCOMING_STUDENT_CLASSES, {
		variables: { studentId: currentUser._id },
		fetchPolicy: "network-only",
	});
	const studentUpcoming = upcomingData?.getUpcomingStudentClasses || [];

	const { loading: completedLoading, data: completedData, error: completedError } = useQuery(QUERY_COMPLETED_STUDENT_CLASSES, {
		variables: { studentId: currentUser._id },
		fetchPolicy: "network-only",
	});
	const studentCompleted = completedData?.getCompletedStudentClasses || [];

	const [removeFromRoster, { error: removeStudentError }] =
		useMutation(REMOVE_FROM_ROSTER);

	// set refetchQueries to query upcoming classes -> whenever we run this mutation to cancel a class, we will also re-run get upcoming student classes to refresh the list
	const [removeClassFromStudent, { error: removeClassFromStudentError }] =
		useMutation(REMOVE_CLASS_FROM_STUDENT, {
			refetchQueries: [QUERY_UPCOMING_STUDENT_CLASSES, "getUpcomingStudentClasses"],
		});

	// TODO: refactor
	const cancelAction = async (classId) => {
		// try {
		// 	const { data } = await removeFromRoster({
		// 		variables: { classId, studentId: currentUser._id },
		// 	});
		// 	console.log(data);
		// } catch (err) {
		// 	console.error(err);
		// 	configureToast('Something went wrong, please email us at flowwithmegmo@gmail.com', 'failure', 10000)
		// }

		try {
			const { data } = await removeFromRoster({
				variables: { classId, studentId: currentUser._id },
			});
			const { data: registeredCancellation } = await removeClassFromStudent({
				variables: { studentId: currentUser._id, classId },
			});
			resetModal();
			configureToast('You have been successfully removed from class.', 'success', 5000)

		} catch (err) {
			console.error(err);
			configureToast('Something went wrong, please email us at flowwithmegmo@gmail.com', 'failure', 10000)

		}

	};

	if (loading) return <div className="view">Loading</div>;
	if (error) return <div className="view">Error! {error.message}</div>;
	if (upcomingLoading) return <div className="view">Loading</div>;
	if (upcomingError) return <div className="view">Error! {upcomingError.message}</div>;
	if (completedLoading) return <div className="view">Loading</div>;
	if (completedError) return <div className="view">Error! {completedError.message}</div>;
	if (removeStudentError)
		return <div className="view">Error! ${removeStudentError.message}</div>;
	if (removeClassFromStudentError)
		return (
			<div className="view">Error! ${removeClassFromStudentError.message}</div>
		);

	return (
		<div className="logged-in-home view">
			<div className="student-info">
				<h2 className="logged-in-header">Welcome {studentData.username}</h2>
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
					<button className={`list-btn ${listView === "registered" ? "selected-list" : ""}`} onClick={() => setListView("registered")}>Registered</button>
					<button className={`list-btn ${listView === "completed" ? "selected-list" : ""}`} onClick={() => setListView("completed")}>Completed</button>
				</div>
				{listView === "registered" ? (
					studentUpcoming.length <= 0 ? (
						<div className="no-classes">
							You do not have any registered classes at this time.
						</div>
					) : (
						<ul className="student-lists class-list">
							{studentUpcoming.map((registeredClass) => (
								<RegisteredClass
									key={registeredClass._id}
									registeredClass={registeredClass}
									// if class is in the future, use cancel action
									action={cancelAction}
									// otherwise, use playlist action
									// TODO: add playlist action which will just pull up spotify playlist
								/>
							))}
						</ul>
					)
				) : studentCompleted.length <= 0 ? (
					<div className="no-classes">
						You do not have any completed classes at this time.
					</div>
				) : (
					<ul className="student-lists class-list">
						{studentCompleted.map((registeredClass) => (
							<CompletedClass
								key={registeredClass._id}
								classDate={registeredClass.date}
								playlistId={registeredClass.playlistId}
								// if class is in the future, use cancel action
								// action={cancelAction}
								// otherwise, use playlist action
								// TODO: add playlist action which will just pull up spotify playlist
							/>
						))}
					</ul>
				)}
			</div>

			{/* 
			<div className="student-lists">
				<div className="registered-classes">
					<h3>Registered Classes</h3>

					{studentData.registeredClasses.length <= 0 ? (
						<div>You have not yet registered for any classes.</div>
					) : (
						<ul className="class-list home-page-class-list">
							{studentData.registeredClasses.map((registeredClass, idx) => (
								<RegisteredClass
									key={idx}
									registeredClass={registeredClass}
									// if class is in the future, use cancel action
									action={cancelAction}
									// otherwise, use playlist action
									// TODO: add playlist action which will just pull up spotify playlist
								/>
							))}
						</ul>
					)}
				</div>
				<div className="completed-classes">
					<h3>Completed Classes</h3>
					{studentData.registeredClasses.length <= 0 ? (
						<div>You have not yet completed any classes.</div>
					) : (
						<ul className="class-list home-page-class-list">
							{studentData.registeredClasses.map((registeredClass, idx) => (
								<CompletedClass
									key={idx}
									playlistId={registeredClass.playlistId}
									classDate={registeredClass.date}
								/>
							))}
						</ul>
					)}
				</div>
			</div> */}
		</div>
	);
}

export default LoggedInHome;
