import React from "react";
import { QUERY_SINGLE_STUDENT } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { useUserContext } from "../../utils/contexts/UserContext";
import {
	REMOVE_CLASS_FROM_STUDENT,
	REMOVE_FROM_ROSTER,
} from "../../utils/mutations";
import "../../styles/LoggedInHome.css";
import ClassCard from "../ClassCard";
import RegisteredClass from "../list_items/RegisteredClass";
import { useModalContext } from "../../utils/contexts/ModalContext";

// TODO: figure out how to separate scheduled classes from completed classes
function LoggedInHome() {
	// get user context
	const { currentUser } = useUserContext();
	const {resetModal} = useModalContext()

	// find student info (specifically what we need is registered classes -> should this be a specific query?) based on the currentUser's _id
	const { loading, data, error } = useQuery(QUERY_SINGLE_STUDENT, {
		variables: { studentId: currentUser._id },
	});
	const studentData = data?.getStudentById || [];

	const [removeFromRoster, { error: removeStudentError }] =
		useMutation(REMOVE_FROM_ROSTER);

	const [removeClassFromStudent, { error: removeClassFromStudentError }] =
		useMutation(REMOVE_CLASS_FROM_STUDENT);

	// TODO: refactor
	const cancelAction = async (classId) => {
		try {
			const { data } = await removeFromRoster({
				variables: { classId, studentId: currentUser._id },
			});
			console.log(data);
		} catch (err) {
			console.error(err);
		}

		try {
			const { data } = await removeClassFromStudent({
				variables: { studentId: currentUser._id, classId },
			});
			console.log(data);
		} catch (err) {
			console.error(err);
		}
		resetModal()
	};

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;
	if (removeStudentError) return `Error! ${removeStudentError.message}`;
	if (removeClassFromStudentError)
		return `Error! ${removeClassFromStudentError.message}`;

	return (
		<div className="logged-in-home">
			<h2 className="logged-in-header">Welcome {studentData.username}</h2>
			{studentData.registeredClasses.length > 0 ? (
				<>
					<p>
						Here you will find your scheduled and completed classes. If you are
						looking for a specific song from a previous class, click the spotify
						button. Enjoy!
					</p>
					<ul className="class-list">
						{studentData.registeredClasses.map((registeredClass, idx) => (
							<RegisteredClass
								key={idx}
								registeredClass={registeredClass}
								action={cancelAction}
								// classId={registeredClass._id}
								// classAction={<CancelClass registeredClass={registeredClass} />}
								// date={registeredClass.date}
							/>
						))}
					</ul>
				</>
			) : (
				<div>No scheduled or completed classes yet...get a move on!</div>
			)}
		</div>
	);
}

export default LoggedInHome;
