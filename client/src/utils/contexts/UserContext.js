import React, { useState, useContext } from "react";

// Create our theme context using React.CreateContext()

export const UserContext = React.createContext();

// Create a custom hook that allows easy access to our ThemeContext values
export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
	const [currentUser, setCurrentUser] = useState({
		loggedIn: false,
		username: "",
		email: "",
		_id: "",
	});

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
}
