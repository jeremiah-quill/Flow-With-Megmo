import React from "react";
import { useModalContext } from "../../utils/contexts/ModalContext";
import ClassDetails from "../ClassDetails";
import { useUserContext } from "../../utils/contexts/UserContext";
import ClassSignupModal from "../modals/ClassSignupModal";

function ScheduledClassList({ scheduledClasses, scheduleRefetch, studentScheduleRefetch }) {
	const { configureModal } = useModalContext();
	const { currentUser } = useUserContext();

	
	if(scheduledClasses.length < 1) return <div>There are no available classes at this time.</div>


	return (
		<ul className="class-list">
			{scheduledClasses.map((scheduledClass) => (
				<div key={scheduledClass._id} className="class-list-item">
					<ClassDetails
						date={scheduledClass.date}
						price={scheduledClass.price}
					/>
					{scheduledClass.roster.filter(
						(student) => student._id === currentUser._id
					).length > 0 ? (
						<div className="currently-registered">Currently registered</div>
					) : (
						<div className="class-actions">
							{currentUser.loggedIn === true ? (
								<button
								className="main-btn"
									onClick={() =>
										configureModal(
											<ClassSignupModal
												scheduledClass={scheduledClass}
												scheduleRefetch={scheduleRefetch}
												studentScheduleRefetch={studentScheduleRefetch}
											/>
										)
									}
								>
									Register
								</button>
							) : (
								<p className="must-sign-up">
									Please login/signup to book a class
								</p>
							)}
						</div>
					)}
				</div>
			))}
		</ul>
	);
}

export default ScheduledClassList;
