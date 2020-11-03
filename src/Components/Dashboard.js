import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContexts";
import Header from "./Header";
import Quotecard from "./Dashboard/Quotecard";
import { Link } from "react-router-dom";

function Dashboard() {
	const { currentUser } = useAuth();
	const [quotes, setQuotes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				let data = await fetch("/admin/allquotes", {
					headers: {
						"Content-Type": "application/json",
						token: localStorage.token,
					},
				});
				data = await data.json();
				setQuotes(data);
				setLoading(false);
				console.log(quotes);
			} catch (error) {
				console.log(error);
			}
		})();

		return setLoading(true);
	}, []);

	console.log(currentUser);
	return (
		<>
			<Header></Header>
			<div className="container my-5 mx-auto px-4 max-w-5xl center ">
				<div className="flex justify-between">
					<p className="text-xl font-bold">Dashboard</p>
					<div className="">
						<Link to="/admin/addquote">
							<button className="bg-indigo-400 hover:bg-indigo-500 text-black font-semibold py-2 px-4 rounded">
								Add Quote
							</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="container mx-auto px-4 max-w-5xl center ">
				{!loading &&
					quotes.map((item) => (
						<Quotecard
							data={{ quote: item.quote, author: item.author }}></Quotecard>
					))}
			</div>
		</>
	);
}

export default Dashboard;
