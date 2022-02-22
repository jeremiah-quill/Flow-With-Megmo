import React, { useState, useContext, useEffect } from "react";

export const WidthContext = React.createContext();

export const useWidthContext = () => useContext(WidthContext);

export default function WidthProvider({ children }) {
    const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 1200;

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);


	return (
		<WidthContext.Provider value={{ width, breakpoint }}>
			{children}
		</WidthContext.Provider>
	);
}
