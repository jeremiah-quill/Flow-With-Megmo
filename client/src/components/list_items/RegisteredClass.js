import { useModalContext } from "../../utils/contexts/ModalContext";
import "../../styles/ClassCard.css";
import { useUserContext } from "../../utils/contexts/UserContext";
import CancelRegistrationModal from '../modals/CancelRegistrationModal'

export default function RegisteredClass({ registeredClass, action }) {
	const { currentUser } = useUserContext();
    const {configureModal} = useModalContext()

	return (
		<div className="class-list-item">
			<div className="class-card-content">
				<h2 className="card-header">Flow with Megmo</h2>
				<div className="class-card-day">Saturday, 2/20</div>
				<div className="class-card-day">10:00am - 11:00am</div>
			</div>
			<div className="class-actions">
				<button
					className="btn btn-round btn-pink"
					onClick={() =>
						configureModal(<CancelRegistrationModal yogaClass={registeredClass} action={action} />)
					}
				>
					Cancel
				</button>
			</div>

		</div>
	);
}
