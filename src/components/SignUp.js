import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { loadUser } from "../store/users";
import { useDispatch } from "react-redux";


function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	// Redux
	const dispatch = useDispatch();

	const joinGame = async (game, userId) =>{
    let teamToJoin = '';
    //check if there are an even or odd number of players assigns the new player accordingly (team A if this player will be odd Tean B for even) 
    if ((game.users.length * 1) % 2 === 0){
      teamToJoin = 'TEAM A';
    }
    else {
      teamToJoin = 'TEAM B';
    }
    if(Date.now() < game.time * 1){
      // console.log(game.users.length)
      // console.log(teamToJoin)
        const addPlayer = (await axios.post('/api/user_games', { gameId: game.id, userId: userId, team: teamToJoin })).data;
      if(!addPlayer.created){
        window.alert('You have already joined this game.');
      } else {
        window.alert(`You\'ve joined game ${game.id}!`)
      }
    } else {
      window.alert('Sorry this game has already started. Please select another game.');
      await axios.put(`/api/games/${game.id}`, { open: false });
    }
    // this.props.loadOpenGames();
  };

	const joinNewGame = async (newGame, userId) =>{
		newGame.host = userId;
    console.log('newGame: ', newGame);
		const game = (await axios.post('/api/games', newGame)).data
      //added TEAM just assinging first player to TEAM A, hardcoded in user 13 for testing purposes
      // await axios.post('/api/user_games', { gameId: newGame.id, userId: 13, team: 'TEAM A' });
      await axios.post('/api/user_games', { gameId: game.id, userId: userId, team: 'TEAM A' });
  };

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
			// console.log(response);
			// console.log(request);

			//the logic from Login.js so a user is automatically logged in after creating and account 
			const response2 = await axios.post("/api/login", request);
			console.log(response2.data);
			localStorage.setItem("pickmeup-token", response2.data.token);
			dispatch(loadUser(response2.data.id));
			const game = JSON.parse(localStorage.getItem("game"))
			const newGame = JSON.parse(localStorage.getItem("newGame"))
			console.log('game: ', game);
			
			if (game){
				joinGame(game, response2.data.id);
			}
			if (newGame) {
				joinNewGame(newGame, response2.data.id)	
			} 
			history.push('/');

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
