import React, { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";

function Frontpage() {
	const [quote, setQuote] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				let quote = await fetch("/quote");
				quote = await quote.json();
				console.log(quote);
				setQuote(quote);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<>
			<div className="p-8 absolute top-0 right-0">
				<BsInfoCircle color="#2c3e50"></BsInfoCircle>
			</div>
			<div className="grid place-items-center min-h-screen">
				{!loading && (
					<div className="max-w-xl p-5">
						<div className="mb-10">
							<p className="text-center text-3xl text-blue-800">
								{quote.quote}
							</p>
						</div>
						<div className="float-right">
							{quote.author.split(",").map((item) => (
								<p className="text-right font-semibold text-gray-700">{item}</p>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Frontpage;
