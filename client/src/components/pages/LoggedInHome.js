import React from "react";
import { QUERY_SINGLE_STUDENT } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { useUserContext } from "../../utils/contexts/UserContext";

// TODO: figure out how to separate scheduled classes from completed classes
function LoggedInHome() {
	// get user context
	const { currentUser } = useUserContext();

	// find student info (specifically what we need is registered classes -> should this be a specific query?) based on the currentUser's _id
	const { loading, data, error } = useQuery(QUERY_SINGLE_STUDENT, {
		variables: { studentId: currentUser._id },
	});
	const studentData = data?.getStudentById || [];

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	console.log(data);

	return (
		<div className="logged-in-home">
			<button onClick={() => Auth.logout()}>Logout</button>
			<h2>Welcome {studentData.username}</h2>
			<h3>Scheduled Classes</h3>
			{studentData.registeredClasses.length > 0 ? (
				<ul>
					{studentData.registeredClasses.map((registeredClass) => (
						<li key={registeredClass._id}>{registeredClass.date}</li>
					))}
				</ul>
			) : (
				<div>You don't have any classes scheduled.</div>
			)}

			<h3>Completed Classes</h3>
			{studentData.registeredClasses.length > 0 ? (
				<ul>
					{studentData.registeredClasses.map((registeredClass) => (
						<li key={registeredClass._id}>{registeredClass.date}</li>
					))}
				</ul>
			) : (
				<div>You have not yet completed any classes.</div>
			)}
		</div>
	);
}

export default LoggedInHome;
