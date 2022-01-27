import React from "react";

function Modal({show, toggleModal, modalData }) {
    const {title, content, footer} = modalData



	if (!show) {
		return null;
	} else
		return (
			<div>
				<div className="modal-backdrop" onClick={toggleModal}></div>
				<div className="modal-card">
					<header className="modal-header">{title}</header>
					<div className="modal-content">{content}</div>
					<div className="modal-footer">{footer}</div>
				</div>
			</div>
		);
}

export default Modal;
