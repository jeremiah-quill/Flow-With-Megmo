import React, { useState, useContext } from "react";

export const PageTransitionContext = React.createContext();

export const usePageTransitionContext = () => useContext(PageTransitionContext);

export default function PageTransitionProvider({ children }) {
	// full page transition overlays
	const [firstOverlay, setFirstOverlay] = useState(false);
	const [secondOverlay, setSecondOverlay] = useState(false);

    const initializePageTransition = () => {
        // turn on first overlay
		setFirstOverlay(true);

		// after half a second, turn off first overlay
		setTimeout(() => {
			setFirstOverlay(false);
		}, 500);

		// after half a second, turn on second overlay
		setTimeout(() => {
			setSecondOverlay(true);
			// after half a second, turn off second overlay
			setTimeout(() => {
				setSecondOverlay(false);
			}, 500);
		}, 500);
    }

	return (
		<PageTransitionContext.Provider value={{ firstOverlay, secondOverlay, initializePageTransition }}>
			{children}
		</PageTransitionContext.Provider>
	);
}
