import React, { useState, useEffect } from "react";
import { HiOutlineMail, HiOutlineKey } from "react-icons/hi";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContexts";

let schema = yup.object().shape({
	password: yup.string().required(),
	email: yup.string().email().required(),
});

function Login() {
	const { setCurrentUser, checklogged, currentUser } = useAuth();

	const [Values, setValues] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setError("");
		setValues({ ...Values, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		console.log(currentUser);
		try {
			const validate = await schema.validate(Values);
			const user = await fetch("/admin/login", {
				method: "POST",
				// mode: "cors",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(Values),
			});
			const res = await user.json();

			if (user.status == 200) {
				localStorage.setItem("token", res.token);
				const user = await checklogged();
				setCurrentUser(user);
				return;
			}
			setError(res);

			console.log(user.status);
		} catch (error) {
			setError(error.errors[0]);
		}
	};

	return (
		<div className="">
			<div className="grid place-items-center min-h-screen min-v-screen">
				<div className="rounded overflow-hidden shadow-lg p-5">
					<div className="divide-y divide-gray-400">
						<div className="">
							<h1 className="text-4xl text-center font-semibold mb-3">Login</h1>
						</div>

						<form className="p-5" onSubmit={handleSubmit}>
							<div className="mb-5">
								<label className="block mb-3 font-semibold">Email</label>
								<div className="relative">
									<HiOutlineMail
										size="30"
										className="absolute m-2"></HiOutlineMail>
									<input
										className="border p-2 pl-12"
										style={{ width: "20rem" }}
										type="email"
										name="email"
										placeholder="Email input"
										onChange={handleChange}
										value={Values.email}></input>
								</div>
							</div>
							<div className="mb-5">
								<label className="block mb-3 font-semibold">Password</label>
								<div className="relative">
									<HiOutlineKey
										size="30"
										className="absolute m-2"></HiOutlineKey>
									<input
										className="border p-2 pl-12"
										style={{ width: "20rem" }}
										name="password"
										placeholder="Password"
										onChange={handleChange}
										value={Values.password}></input>
								</div>
							</div>
							{error && <p className="text-red-600 capitalize">{error}</p>}
							<div className="pt-5">
								<button
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									type="submit">
									Login
								</button>
								<span className="float-right mt-3 underline text-blue-700 cursor-pointer align-baseline">
									Register?
								</span>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
