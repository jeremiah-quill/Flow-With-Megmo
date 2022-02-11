import React from "react";
import { QUERY_SINGLE_STUDENT } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { useUserContext } from "../../utils/contexts/UserContext";
import {
	REMOVE_CLASS_FROM_STUDENT,
	REMOVE_FROM_ROSTER,
} from "../../utils/mutations";

// TODO: figure out how to separate scheduled classes from completed classes
function LoggedInHome() {
	// get user context
	const { currentUser } = useUserContext();

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
	const handleDelete = async (classId) => {
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

		// console.log("fake cancel class");
	};

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;
	if (removeStudentError) return `Error! ${removeStudentError.message}`;
	if (removeClassFromStudentError)
		return `Error! ${removeClassFromStudentError.message}`;

	return (
		<div className="logged-in-home">
			<h2>Welcome {studentData.username}</h2>
			<h3>Classes</h3>
			{studentData.registeredClasses.length > 0 ? (
				<ul>
					{studentData.registeredClasses.map((registeredClass) => (
						<li key={registeredClass._id}>
							{registeredClass.date}{" "}
							<button onClick={() => handleDelete(registeredClass._id)}>
								unregister
							</button>
						</li>
					))}
				</ul>
			) : (
				<div>No scheduled or completed classes yet...get a move on!</div>
			)}
		</div>
	);
}

export default LoggedInHome;
