import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TO_ROSTER, ADD_CLASS_TO_STUDENT } from "../../utils/mutations";
import { QUERY_SINGLE_CLASS } from "../../utils/queries";
// import LoginForm from "../forms/LoginForm";
// import SignupForm from "../forms/SignupForm";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import Modal from "../Modal";
import Auth from "../../utils/auth";
import useToggle from "../../hooks/useToggle";
import "../../styles/Class.css";
import { useUserContext } from "../../utils/contexts/UserContext";


function Class() {
	// get user context
	const { currentUser } = useUserContext();


	const [isModal, toggleModal] = useToggle(false);
	const [modalContent, setModalContent] = useState(null);

	const configureModal = (content) => {
		toggleModal();
		setModalContent(content);
	};

	const navigate = useNavigate();

	// access class _id from params
	let { id } = useParams();

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
	const [signupView, setSignupView] = useState(null);
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
			<Modal show={isModal} toggleModal={toggleModal}>
				{modalContent}
			</Modal>

			<button className="close-page" onClick={() => navigate("/")}>
				Close
			</button>
			<header className="class-header">Saturday, March 3rd @ 12:00pm</header>

			<div className="class-signup-content">
				{/* <header className="class-header">{classData.date}</header> */}

				{!registered ? (
					<div className="step">
						{currentUser.loggedIn ? (
							// REGISTER COMPONENT
							<>
								<header>Register for class</header>

								<p>
									Register for class as {currentUser.email}:{" "}
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

								<button onClick={() => configureModal(<LoginModal />)}>
									Login
								</button>
								<button onClick={() => configureModal(<SignupModal />)}>
									Signup
								</button>
							</div>
						)}
					</div>
				) : (
					<div className="step">
						<header>Step 3: Complete payment</header>
						<p>
							We sent a zoom meeting link to {currentUser.email}.
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
