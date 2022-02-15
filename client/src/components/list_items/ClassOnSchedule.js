import { useModalContext } from "../../utils/contexts/ModalContext";
import { useUserContext } from "../../utils/contexts/UserContext";
import ClassSignupModal from "../modals/ClassSignupModal";
import parseDate from '../../utils/helpers/parseDate'
import "../../styles/ClassCard.css";

export default function ClassOnSchedule({ classOnSchedule, refetch }) {
	const { currentUser } = useUserContext();
	const { configureModal } = useModalContext();

	const { dayOfMonth, month, dayOfWeek, hour } = parseDate(classOnSchedule.date);

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
			{classOnSchedule.roster.filter(
				(student) => student._id === currentUser._id
			).length > 0 ? (
				<div className="currently-registered">Currently registered</div>
			) : (
				<div className="class-actions">
					{currentUser.loggedIn === true ? (
						<button
							className="btn btn-round btn-pink"
							onClick={() =>
								configureModal(<ClassSignupModal id={classOnSchedule._id} refetch={refetch} />)
							}
						>
							Register
						</button>
					) : (
						<p className="must-sign-up">Please login/signup to book a class</p>
					)}
				</div>
			)}
		</div>
	);
}
