import React, {useState} from "react";
import Modal from "../Modal";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import useToggle from "../../hooks/useToggle";


function DefaultHome() {
	const [isModal, toggleModal] = useToggle(false);
	const [modalContent, setModalContent] = useState(null);

    

	const configureModal = (content) => {
		toggleModal();
		setModalContent(content);
	};

	return (
		<div className="default-home">
			<Modal show={isModal} toggleModal={toggleModal}>
				{modalContent}
			</Modal>
			<h2>Flow with Megmo</h2>
			<div>
				Welcome!  I teach weekly(ish) virtual yoga classes and would love for you to join
				me! Browse the schedule and register for a class or contact me to book a
				private event.
			</div>

			<button onClick={() => configureModal(<LoginModal />)}>Login</button>
			<button onClick={() => configureModal(<SignupModal />)}>Signup</button>
		</div>
	);
}

export default DefaultHome;
