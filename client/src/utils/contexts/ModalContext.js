import React, { useState, useContext } from "react";

// Create our modal context using React.CreateContext()
export const ModalContext = React.createContext();

// Create a custom hook that allows easy access to our ModalContext values
export const useModalContext = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
	const [isModal, setIsModal] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	const resetModal = () => {
		// setExitModalTransition(true)
		setIsModal(false)
		setModalContent(null)

		// setTimeout(() => {
		// 	setIsModal(false)
		// 	setModalContent(null)
		// }, 5000)

	}

	const configureModal = (content) => {
		setIsModal(true);
		setModalContent(content);
	};

	return (
		// showModal is a boolean which tell us if modal should be showing or not
		// configureModal takes in content, sets showModal to true, and sets modal content
		// modalContent is what will be showing in an active modal
		// resetModal sets show modal to false and removes modal content
		<ModalContext.Provider value={{ isModal, configureModal, modalContent, resetModal }}>
			{children}
		</ModalContext.Provider>
	);
}
