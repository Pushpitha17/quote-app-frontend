import React from "react";

function Quotecard({ data: { quote, author } }) {
	return (
		<div className="rounded shadow p-5 mb-5">
			<div>
				<div>
					<p className="text-xl mb-2">{quote}</p>
					<p className="font-semibold">{author}</p>
				</div>
				<div className="flex justify-end">
					<button className="bg-green-400 hover:bg-green-500 text-black font-semibold py-2 px-4 rounded">
						View
					</button>
				</div>
			</div>
		</div>
	);
}

export default Quotecard;
