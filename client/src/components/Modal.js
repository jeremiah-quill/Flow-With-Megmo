import React, { useEffect, useState } from "react";
import "../styles/Modal.css";
import { useModalContext } from "../utils/contexts/ModalContext";
import closeIcon from "../images/close.png";
import { CSSTransition } from "react-transition-group";

function Modal({ resetModal, children }) {
		return (
			<div className="modal">
				<div
					className={`modal-backdrop`}
					onClick={resetModal}
				></div>
				<div
					className={`modal-card`}
				>
					<button className="reset-modal-btn" onClick={resetModal}>
						<img src={closeIcon} />
					</button>
					{children}
				</div>
			</div>
		);
}

export default Modal;
