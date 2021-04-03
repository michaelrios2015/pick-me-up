import React from "react";
import { useState } from "react";
import axios from "axios";

function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	// Create user
	const createUser = async () => {
		const request = {
			email,
			password,
			name,
		};

		const response = await axios.post("/api/users", request);
		if (response) {
			console.log("Success");
			console.log(response);
		} else {
			console.log("Failed");
		}
	};

	return (
		<div>
			<h2>New User Sign Up</h2>
			<form>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(ev) => {
						setName(ev.target.value);
					}}
				/>
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
			<button onClick={createUser}>Sign Up</button>
		</div>
	);
}

export default SignUp;
