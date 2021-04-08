import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

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

	// history, this will be useful once user is automatically logged in
	// after creating am account
	const history = useHistory();
	// console.log(history)

	return (
		<div className='container justify-content-center'>
			<h2 className='text-center'>New User Sign Up</h2>
			<form>
				<div className="form-group">
				<label htmlFor="name">Full Name</label>
				<input
					type="text"
					id="name"
					value={name}
					className="form-control"
					onChange={(ev) => {
						setName(ev.target.value);
					}}
				/>
				</div>
					<div className="form-group">
				<label htmlFor="email">Email Address</label>
				<input
					type="text"
					id="email"
					value={email}
					className="form-control"
					onChange={(ev) => {
						setEmail(ev.target.value);
					}}
				/>
				</div>
				<div className="form-group">
				<label htmlFor="password">Password</label>
				<input
					type="text"
					id="password"
					value={password}
					className="form-control"
					onChange={(ev) => {
						setPassword(ev.target.value);
					}}
				/>
				</div>
			</form>
			<button onClick={createUser}>Sign Up</button>
			<p>
				Already a user? <Link to="/login">Log in to existing account.</Link>
			</p>
		</div>
	);
}

export default SignUp;
