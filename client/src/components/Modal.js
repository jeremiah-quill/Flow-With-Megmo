import closeIcon from "../images/close.png";
import { CSSTransition } from "react-transition-group";

function Modal({
	timeout,
	isModal,
	unmountOnExit,
	classNames,
	resetModal,
	content,
}) {
	return (
		<CSSTransition
			timeout={timeout}
			in={isModal}
			unmountOnExit={unmountOnExit}
			classNames={classNames}
		>
			<div className="modal">
				<div className={`modal-backdrop`} onClick={resetModal}></div>
				<div className={`modal-card`}>
					<button className="reset-modal-btn" onClick={resetModal}>
						<img src={closeIcon} alt="close-modal-icon"/>
					</button>
					{content}
				</div>
			</div>
		</CSSTransition>
	);
}

export default Modal;
