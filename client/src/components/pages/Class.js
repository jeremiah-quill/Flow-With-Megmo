import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";

import JoinClassForm from "../forms/JoinClassForm";
import { QUERY_CLASSES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import "../../styles/Class.css";
import Auth from "../../utils/auth";
import { zoomJoin } from "../../utils/API";


// let data = [
// 	{ date: "2022-01-29", time: "10:00", class_id: "83354584725", price: "$15" },
// 	{ date: "2022-01-22", time: "10:30", class_id: "2", price: "$15" },
// 	{ date: "2022-02-05", time: "10:00", class_id: "3", price: "$15" },
// 	{ date: "2022-02-05", time: "10:00", class_id: "4", price: "$15" },
// ];

function Class() {
	const { loading, data, error } = useQuery(QUERY_CLASSES);
	const allClasses = data?.classes || [];

	console.log(Auth.loggedIn())
	// console.log(Auth.getStudent())


	let { id } = useParams();

	const navigate = useNavigate();

	const loggedIn = { email: "fakeemail.gmail.com" };

	const handleCloseClass = () => {
		navigate("/");
		console.log("class view closed");
	};

	const match = allClasses.find((item) => item.zoomId === id);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	const handleSubmit = async (e) => {
		const studentData = Auth.getStudent().data


		const data = {
			firstName: studentData.firstName,
			lastName: studentData.lastName,
			email: studentData.email,
			meetingId: id,
		};
		// add student to class
		const response = await zoomJoin(data);
		// TODO: graphQL mutation to add class member in database


		console.log(response);
		console.log(`join class response: ${response}`)
		// TODO: add student to DB if api call was successful
		// navigate("/classes"); // toast to show success
		console.log('successfully joined class')
	};

	return (
		<div className="class">
			<button className="close-page" onClick={handleCloseClass}>
				Close
			</button>
			<header className="class-header">Saturday, March 3rd @ 12:00pm</header>

			<div className="class-signup-content">
				{/* <header className="class-header">{classData.date}</header> */}

				<div className="step">
					<header>Step 1: Class signup</header>
					{Auth.loggedIn() ? (
						<>
							<p>
								Register for class as {Auth.getStudent().data.email}: <button onClick={handleSubmit}>Register</button>
							</p>
							<p>
								If you are signing up as a different user, logout{" "}
								<button onClick={() => Auth.logout()}> here</button>.
							</p>
						</>
					) : (
						<div>
							<LoginForm />
							<SignupForm />
							{/* <Link to="/">Login</Link>
							<Link to="/">Signup</Link> */}
							{/* <JoinClassForm meetingId={id} /> */}
						</div>
					)}
				</div>
				<div className="step">
					<header>Step 2: Complete payment</header>
					<p>
						Once you see the join class success notification, please click the
						following link to complete payment via venmo. I can't wait to see
						you in class!
					</p>
					<a
						href={`https://venmo.com/meghan-moran-7?txn=pay&note=Flow+with+Megmo:+${match.date}&amount=10`}
					>
						Class Payment
					</a>
				</div>
			</div>
		</div>
	);
}

export default Class;
