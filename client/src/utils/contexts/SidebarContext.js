import React, { useState, useContext } from "react";

export const SidebarContext = React.createContext();

export const useSidebarContext = () => useContext(SidebarContext);

export default function SidebarProvider({ children }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
			{children}
		</SidebarContext.Provider>
	);
}
