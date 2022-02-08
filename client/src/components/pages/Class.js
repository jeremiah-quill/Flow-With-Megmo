import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import { QUERY_CLASSES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import "../../styles/Class.css";
import Auth from "../../utils/auth";
import { zoomJoin } from "../../utils/API";

function Class() {
	let { id } = useParams();

	const { loading, data, error } = useQuery(QUERY_CLASSES);
	const allClasses = data?.classes || [];


	const [signupView, setSignupView] = useState(null);
	const [registered, setRegistered] = useState(false)

	const navigate = useNavigate();

	const handleCloseClass = () => {
		navigate("/");
		console.log("class view closed");
	};

	const match = allClasses.find((item) => item.zoomId === id);

	const handleSubmit = async (e) => {
		const studentData = Auth.getStudent().data;

		const data = {
			firstName: studentData.firstName,
			lastName: studentData.lastName,
			email: studentData.email,
			meetingId: id,
		};
		// add student to zoom meeting
		const response = await zoomJoin(data);

		const responseData = JSON.parse(response);

		// TODO: check if response was successful
		console.log(responseData);

		// TODO: check if student is already in this class.  if they are, notify them.  if they aren't, add student to DB with graphQL mutation
		//
		//
		//
		//

		// TODO: if zoom register and add to db are success, show venmo:
		setRegistered(true)
	};

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	return (
		<div className="class">
			<button className="close-page" onClick={handleCloseClass}>
				Close
			</button>
			<header className="class-header">Saturday, March 3rd @ 12:00pm</header>

			<div className="class-signup-content">
				{/* <header className="class-header">{classData.date}</header> */}

				{!registered ? (
					<div className="step">
						<header>
							Step 1: Register
						</header>
						{Auth.loggedIn() ? (
							// REGISTER COMPONENT
							<>
								<p>
									Register for class as {Auth.getStudent().data.email}:{" "}
									<button onClick={handleSubmit}>Register</button>
								</p>
								<p>
									If you are signing up as a different user, logout{" "}
									<button onClick={() => Auth.logout()}> here</button>.
								</p>
							</>
						) : (
							<div>
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
						<header>Step 2: Complete payment</header>
						<p>
							We sent a zoom meeting link to {Auth.getStudent().data.email}.  Please click the
							link below to complete payment via venmo. I can't wait to see
							you in class!
						</p>
						<a
							href={`https://venmo.com/meghan-moran-7?txn=pay&note=Flow+with+Megmo:+${match.date}&amount=${match.price}`}
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
