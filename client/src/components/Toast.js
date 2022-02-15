import React, {useState} from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Toast({ isToast, toastMessage, toastType }) {

	return (
		<CSSTransition
			timeout={500}
			in={isToast}
            unmountOnExit={true}
			classNames="fade-toast"
		>
			<div className={`${toastType} toast`}>{toastMessage}</div>
		</CSSTransition>
	);
}

export default Toast;
