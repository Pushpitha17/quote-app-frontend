import React, { useState } from "react";
import Header from "./Header";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContexts";
import { useHistory } from "react-router-dom";

let schema = yup.object().shape({
	quote: yup.string().required(),
	author: yup.string().required(),
	notes: yup.string(),
});

function AddQuote() {
	let History = useHistory();

	const { currentUser } = useAuth();

	const [values, setValues] = useState({ quote: "", author: "", notes: "" });
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setError("");
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(currentUser);
		try {
			const validate = await schema.validate(values);
			const res = await fetch("/admin/addquote", {
				method: "POST",
				// mode: "cors",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.token,
				},
				body: JSON.stringify(values),
			});
			console.log(await res.json());
			History.push("/admin");
		} catch (error) {
			setError(error.errors[0]);
		}
	};

	return (
		<>
			<Header></Header>
			<div className="container my-5 mx-auto px-4 max-w-5xl center ">
				<p className="text-2xl my-5 text-center font-semibold">
					What's on your mind?
				</p>

				<form className="p-5" onSubmit={handleSubmit}>
					<div className="mb-5">
						<label className="block mb-3 font-semibold">Quote</label>
						<div className="">
							<textarea
								className=" container border p-2 w-100"
								rows="3"
								name="quote"
								placeholder=""
								onChange={handleChange}
								value={values.email}></textarea>
						</div>
					</div>
					<div className="mb-5">
						<label className="block mb-3 font-semibold">Author</label>
						<div className="">
							<input
								className=" container border p-2 w-100"
								name="author"
								placeholder=""
								onChange={handleChange}
								value={values.email}></input>
						</div>
					</div>
					<div className="mb-5">
						<label className="block mb-3 font-semibold">Notes</label>
						<div className="">
							<textarea
								className=" container border p-2 w-100"
								rows="5"
								name="notes"
								placeholder=""
								onChange={handleChange}
								value={values.email}></textarea>
						</div>
					</div>
					{error && <p className="text-red-600 capitalize">{error}</p>}
					<div className="pt-5 flex justify-end">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							type="submit">
							Add
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default AddQuote;
