import { QUERY_SINGLE_STUDENT } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useUserContext } from "../../utils/contexts/UserContext";
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
	// get user context
	const { currentUser } = useUserContext();
	const { resetModal } = useModalContext();

	// find student info, including their registered classes
	const { loading, data, error } = useQuery(QUERY_SINGLE_STUDENT, {
		variables: { studentId: currentUser._id },
	});
	const studentData = data?.getStudentById || [];


	const [removeFromRoster, { error: removeStudentError }] =
		useMutation(REMOVE_FROM_ROSTER);

	const [removeClassFromStudent, { error: removeClassFromStudentError }] =
		useMutation(REMOVE_CLASS_FROM_STUDENT, {
			refetchQueries: [QUERY_SINGLE_STUDENT, "getStudentById"],
		});

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
		resetModal();
	};

	if (loading) return <div className="view">Loading</div>;
	if (error) return <div className="view">Error! {error.message}</div>;
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
			</div>
		</div>
	);
}

export default LoggedInHome;
