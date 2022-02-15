import React, { useState, useContext } from "react";

// Create our modal context using React.CreateContext()
export const ToastContext = React.createContext();

// Create a custom hook that allows easy access to our ToastContext values
export const useToastContext = () => useContext(ToastContext);

export default function ToastProvider({ children }) {
	const [isToast, setIsToast] = useState(false);
    const [toastType, setToastType] = useState('');
    const [resetTimer, setResetTimer] = useState(1000);


	const [toastMessage, setToastMessage] = useState(null);

	const resetToast = () => {
        setIsToast(false)
	}

	const configureToast = (message, type, time) => {
        setToastMessage(message);
        setToastType(type);
		setIsToast(true);
        setTimeout(() => {
            resetToast()
        }, time)
	};

	return (
		// showModal is a boolean which tell us if modal should be showing or not
		// configureModal takes in content, sets showModal to true, and sets modal content
		// modalContent is what will be showing in an active modal
		// resetModal sets show modal to false and removes modal content
		<ToastContext.Provider value={{ isToast, toastMessage, toastType, configureToast, resetToast,  }}>
			{children}
		</ToastContext.Provider>
	);
}
