import React, { useState, useContext } from "react";

export const ModalContext = React.createContext();

export const useModalContext = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
	const [isModal, setIsModal] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	const resetModal = () => {
		setIsModal(false)
		// setModalContent(null)
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
