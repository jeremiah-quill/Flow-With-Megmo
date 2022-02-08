import React from "react";
import "../styles/Modal.css"

function Modal({show, toggleModal, children }) {



	if (!show) {
		return null;
	} else
		return (
			<div>
				<div className="modal-backdrop" onClick={toggleModal}></div>
				{children}
				
			</div>
		);
}

export default Modal;
