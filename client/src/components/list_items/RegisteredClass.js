import { useModalContext } from "../../utils/contexts/ModalContext";
import "../../styles/ClassCard.css";
import { useUserContext } from "../../utils/contexts/UserContext";
import CancelRegistrationModal from "../modals/CancelRegistrationModal";

import parseDate from '../../utils/helpers/parseDate'


export default function RegisteredClass({ registeredClass, action }) {
	const { currentUser } = useUserContext();
	const { configureModal } = useModalContext();

	const { dayOfMonth, month, dayOfWeek, hour } = parseDate(registeredClass.date);



	return (
		<div className="class-list-item">
			<div className="class-card-content">
				<h2 className="card-header">Flow with Megmo</h2>
				<div className="class-card-day">{dayOfWeek}, {month}/{dayOfMonth}</div>
				<div className="class-card-day">{hour}</div>
			</div>
			<div className="class-status">Registered</div>
			<div className="class-actions">
				<button
					className="btn btn-round btn-pink"
					onClick={() =>
						configureModal(
							<CancelRegistrationModal
								yogaClass={registeredClass}
								action={action}
							/>
						)
					}
				>
					Cancel
				</button>
			</div>
		</div>
	);
}
