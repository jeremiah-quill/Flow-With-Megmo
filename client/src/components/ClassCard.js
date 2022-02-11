import "../styles/ClassCard.css";
import { useUserContext } from "../utils/contexts/UserContext";

export default function ClassCard({ date, price, classId, action }) {
	const { currentUser } = useUserContext();

	return (
		<div className="class-list-item">
			<div className="class-card-content">
				<h2 className="card-header">Flow with Megmo</h2>
				<div className="class-card-day">Saturday, 2/20</div>
				<div className="class-card-day">10:00am - 11:00am</div>
				<div className="class-card-day">${price}</div>
				{/* {time ? <div className="class-card-time">{time}am</div> : ""} */}
				{/* {price ? <div className="class-card-price">{price}</div> : ""} */}
			</div>
			<div className="class-actions">
				{currentUser.loggedIn === true ? (
					<button
						className="btn btn-round btn-pink"
						onClick={() => action(classId, date)}
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
