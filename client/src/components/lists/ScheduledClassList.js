import React from "react";
import { useModalContext } from "../../utils/contexts/ModalContext";
import ClassDetails from "../ClassDetails";
import "../../styles/ClassCard.css";
import { useUserContext } from "../../utils/contexts/UserContext";
import ClassSignupModal from "../modals/ClassSignupModal";

function ScheduledClassList({ scheduledClasses, scheduleRefetch }) {
	const { configureModal } = useModalContext();
	const { currentUser } = useUserContext();
	return (
		<ul className="class-list">
			{scheduledClasses.map((scheduledClass) => (
				<div className="class-list-item">
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
									className="btn btn-round btn-pink"
									onClick={() =>
										configureModal(
											<ClassSignupModal
												scheduledClass={scheduledClass}
												scheduleRefetch={scheduleRefetch}
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
