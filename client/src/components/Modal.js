import React from "react";

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
