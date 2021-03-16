import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
	// state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// form submit
	const login = async () => {
		if (!email || !password) {
			setError("Error: Please fill out both email and password fields");
		} else {
			try {
				const request = { email, password };
				const response = await axios.post("./login", request);
				console.log(response);
				setError("Success");
			} catch (er) {
				console.log(er);
				setError("Error: Invalid email or password. Please try again.");
			}
		}
	};

	return (
		<div>
			<form>
				<input
					type="text"
					id="email"
					value={email}
					onChange={(ev) => {
						setEmail(ev.target.value);
					}}
				/>
				<input
					type="text"
					id="password"
					value={password}
					onChange={(ev) => {
						setPassword(ev.target.value);
					}}
				/>
			</form>
			<button onClick={login}>Log In</button>
			{error && <p>{error}</p>}
		</div>
	);
};

export default Login;
