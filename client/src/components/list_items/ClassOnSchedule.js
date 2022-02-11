import { useModalContext } from "../../utils/contexts/ModalContext";
import "../../styles/ClassCard.css";
import { useUserContext } from "../../utils/contexts/UserContext";
import CancelRegistrationModal from "../modals/CancelRegistrationModal";
import ClassSignupModal from "../modals/ClassSignupModal";

export default function ClassOnSchedule({ classOnSchedule }) {
	const { currentUser } = useUserContext();
	const { configureModal } = useModalContext();

	return (
		<div className="class-list-item">
			<div className="class-card-content">
				<h2 className="card-header">Flow with Megmo</h2>
				<div className="class-card-day">Saturday, 2/20</div>
				<div className="class-card-day">10:00am - 11:00am</div>
				<div className="class-card-day">${classOnSchedule.price}</div>

				{/* {time ? <div className="class-card-time">{time}am</div> : ""} */}
				{/* {price ? <div className="class-card-price">{price}</div> : ""} */}
			</div>
			<div className="class-actions">
				{currentUser.loggedIn === true ? (
					<button
						className="btn btn-round btn-pink"
						onClick={() => configureModal(<ClassSignupModal id={classOnSchedule._id} />)}
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
