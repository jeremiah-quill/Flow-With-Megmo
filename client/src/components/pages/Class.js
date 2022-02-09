import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import { QUERY_SINGLE_CLASS } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import "../../styles/Class.css";
import Auth from "../../utils/auth";
import { ADD_TO_ROSTER } from "../../utils/mutations";

function Class() {
	const navigate = useNavigate();

	// access class _id from params
	let { id } = useParams();

	// find currentClass based on params id
	const { loading, data, error } = useQuery(QUERY_SINGLE_CLASS, {
		variables: { classId: id },
	});
	const selectedClass = data?.getClassById || [];

	// use mutatiojn for adding a student to class based on class _id and student _id
	const [addStudentToClass, { error: rosterError }] =
		useMutation(ADD_TO_ROSTER);

	// used to control the content the user sees (ability to register for class if they are signed in, required to login/signup if not signed in)
	const [signupView, setSignupView] = useState(null);
	const [registered, setRegistered] = useState(false);

	const handleSubmit = async (e) => {
		const studentData = Auth.getStudent().data;

		// TODO: check if student is already in this class.  if they are, notify them.  if they aren't, add student to DB with graphQL mutation
		try {
			const { rosterUpdateData } = await addStudentToClass({
				variables: { classId: id, studentId: studentData._id },
			});
			// TODO: why is this giving me undefined?
			console.log(rosterUpdateData);

			// TODO: if add to db is success, show venmo
			setRegistered(true);
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;
	console.log(data);

	return (
		<div className="class">
			<button className="close-page" onClick={() => navigate("/")}>
				Close
			</button>
			<header className="class-header">Saturday, March 3rd @ 12:00pm</header>

			<div className="class-signup-content">
				{/* <header className="class-header">{classData.date}</header> */}

				{!registered ? (
					<div className="step">
						{Auth.loggedIn() ? (
							// REGISTER COMPONENT
							<>
								<header>Register for class</header>

								<p>
									Register for class as {Auth.getStudent().data.email}:{" "}
									<button onClick={handleSubmit}>Register</button>
								</p>
								<p>
									If you are registering as a different student, logout{" "}
									<button onClick={() => Auth.logout()}> here</button>.
								</p>
							</>
						) : (
							<div>
								<header>Login or Signup as a student</header>

								{signupView === "login" ? <LoginForm /> : ""}
								{signupView === "signup" ? <SignupForm /> : ""}

								{!signupView ? (
									<>
										<button onClick={() => setSignupView("login")}>
											Login
										</button>
										<button onClick={() => setSignupView("signup")}>
											Signup
										</button>
									</>
								) : (
									""
								)}
							</div>
						)}
					</div>
				) : (
					<div className="step">
						<header>Step 3: Complete payment</header>
						<p>
							We sent a zoom meeting link to {Auth.getStudent().data.email}.
							Please click the link below to complete payment via venmo. I can't
							wait to see you in class!
						</p>
						<a
							href={`https://venmo.com/meghan-moran-7?txn=pay&note=Flow+with+Megmo:+${selectedClass.date}&amount=${selectedClass.price}`}
						>
							Class Payment
						</a>
					</div>
				)}
			</div>
		</div>
	);
}

export default Class;
