import { useModalContext } from "../../utils/contexts/ModalContext";
import { useUserContext } from "../../utils/contexts/UserContext";
import ClassSignupModal from "../modals/ClassSignupModal";
import "../../styles/ClassCard.css";

export default function ClassOnSchedule({ classOnSchedule }) {
	const { currentUser } = useUserContext();
	const { configureModal } = useModalContext();

	// TODO: abstract this into a function to be able to use on student page, class schedule, and dashboard
	const classDateStamp = new Date(classOnSchedule.date);
	const dayOfMonth = classDateStamp.toLocaleString("en-US", { day: "2-digit" });
	const month = classDateStamp.toLocaleString("en-US", { month: "2-digit" });
	const dayOfWeek = classDateStamp.toLocaleString("en-US", { weekday: "long" });
	const hour = classDateStamp.toLocaleTimeString("en-US", { timeStyle: "short" });

	return (
		<div className="class-list-item">
			<div className="class-card-content">
				<h2 className="card-header">Flow with Megmo</h2>
				<div className="class-card-day">
					{dayOfWeek}, {month}/{dayOfMonth}
				</div>
				<div className="class-card-day">{hour}</div>
				<div className="class-card-day">${classOnSchedule.price}</div>
			</div>
			<div className="class-actions">
				{currentUser.loggedIn === true ? (
					<button
						className="btn btn-round btn-pink"
						onClick={() =>
							configureModal(<ClassSignupModal id={classOnSchedule._id} />)
						}
					>
						BOOK
					</button>
				) : (
					<p className="must-sign-up">Please login/signup to book a class</p>
				)}
			</div>
		</div>
	);
}
