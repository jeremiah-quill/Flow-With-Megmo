import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TO_ROSTER, ADD_CLASS_TO_STUDENT } from "../utils/mutations";
import { QUERY_SINGLE_CLASS } from "../utils/queries";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";
import Auth from "../utils/auth";
import { useUserContext } from "../utils/contexts/UserContext";
import { useModalContext } from "../utils/contexts/ModalContext";
import LoginForm from "./forms/LoginForm";
import "../styles/Class.css";

function Class({ id }) {
	// get user context
	const { currentUser } = useUserContext();
	const { configureModal } = useModalContext();

	// find currentClass based on params id
	const { loading, data, error } = useQuery(QUERY_SINGLE_CLASS, {
		variables: { classId: id },
	});
	const selectedClass = data?.getClassById || [];

	// use mutation for adding a student to class based on class _id and student _id
	const [addStudentToClass, { error: rosterError }] =
		useMutation(ADD_TO_ROSTER);

	// use mutation for adding a class to student based on student _id and class _id
	const [addClassToStudent, { error: registeredError }] =
		useMutation(ADD_CLASS_TO_STUDENT);

	// used to control the content the user sees (ability to register for class if they are signed in, required to login/signup if not signed in)
	const [registered, setRegistered] = useState(false);

	const handleSubmit = async (e) => {
		// TODO: check if student is already in this class.  if they are, notify them.  if they aren't, add student to DB with graphQL mutation
		try {
			const { rosterUpdateData } = await addStudentToClass({
				variables: { classId: id, studentId: currentUser._id },
			});
			// TODO: why is this giving me undefined?
			console.log(rosterUpdateData);

			const { registeredUpdateData } = await addClassToStudent({
				variables: { studentId: currentUser._id, classId: id },
			});
			// TODO: why is this giving me undefined?
			console.log(registeredUpdateData);

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
			{/* <h1 className="class-header">Saturday, March 3rd @ 12:00pm</h1> */}
			{/* <div> */}
			{/* <header className="class-header">{classData.date}</header> */}
			{!registered ? (
				<div className="step-directions">
					{currentUser.loggedIn ? (
						// REGISTER COMPONENT
						<>
							<h2>Details:</h2>
							<ul className="class-details-list">
								<li className="class-details-item">Date: 2/10</li>
								<li className="class-details-item">Time: 10:00am - 11:00am</li>
								<li className="class-details-item">Price: $12</li>
							</ul>
							<button
								className="btn btn-pink btn-round register-btn"
								onClick={handleSubmit}
							>
								Register
							</button>
						</>
					) : (
						<div>
							<header className="step-directions">
								To continue, please login or signup:
							</header>
							{/* <LoginForm /> */}
							<div className="btn-container-stacked">
								<button
									className=" btn btn-pink btn-round"
									onClick={() => configureModal(<LoginModal />)}
								>
									Login
								</button>
								<button
									className="btn btn-pink btn-round"
									onClick={() => configureModal(<SignupModal />)}
								>
									Signup
								</button>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="step">
					<header>Step 3: Complete payment</header>
					<p>
						We sent a zoom meeting link to {currentUser.email}. Please click the
						link below to complete payment via venmo. I can't wait to see you in
						class!
					</p>
					<a
						href={`https://venmo.com/meghan-moran-7?txn=pay&note=Flow+with+Megmo:+${selectedClass.date}&amount=${selectedClass.price}`}
					>
						Class Payment
					</a>
				</div>
			)}
			{/* </div> */}
		</div>
	);
}

export default Class;
