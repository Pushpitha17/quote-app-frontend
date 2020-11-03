import React from "react";
import { useAuth } from "../contexts/AuthContexts";

function Header() {
	const { currentUser, logout } = useAuth();

	return (
		<div className="border-solid  border-b-2 border-gray-600 ">
			<div className="m-10 mb-6 flex justify-between">
				<p className="text-2xl font-semibold capitalize">
					Hello {currentUser.name}
				</p>
				<button
					className="bg-gray-400 hover:bg-gray-500 text-black font-semibold py-2 px-4 rounded"
					onClick={logout}>
					Log out
				</button>
			</div>
		</div>
	);
}

export default Header;
