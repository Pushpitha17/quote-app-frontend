import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [isLoading, setLoading] = useState(true);

	function logout() {
		localStorage.removeItem("token");
		window.location.reload();
	}

	async function checklogged() {
		const res = await fetch("/admin/islogged", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				token: localStorage.token,
			},
		});
		if (res.status == 200) {
			return await res.json();
		}

		return false;
	}

	useEffect(() => {
		(async () => {
			const user = await checklogged();
			setCurrentUser(user);
			setLoading(false);
		})();
	}, []);

	const value = {
		currentUser,
		setCurrentUser,
		checklogged,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!isLoading && children}
		</AuthContext.Provider>
	);
}
