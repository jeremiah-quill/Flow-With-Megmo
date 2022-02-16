import React, { useState, useContext } from "react";

export const UserContext = React.createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
	const [currentUser, setCurrentUser] = useState({
		loggedIn: false,
		isAdmin: false,
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
