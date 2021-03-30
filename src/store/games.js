import axios from "axios";

// can I just add a wins game here??
const LOAD_GAMES = "LOAD_GAMES";
const LOAD_CLOSED_GAMES = "LOAD_CLOSED_GAMES";
const LOAD_HOSTED_GAMES = "LOAD_CLOSED_GAMES";
const CREATE_GAME = "CREATE_GAME";
const DESTROY_GAME = "DESTROY_GAME";
const UPDATE_GAME = "UPDATE_GAME";

//*************************************************
const intialState = { open: [], closed: [], hosted: [] };

const gamesReducer = (state = intialState, action) => {
	if (action.type === LOAD_GAMES) {
		state.open = action.games;
	}
	if (action.type === LOAD_CLOSED_GAMES) {
		state.closed = action.games;
	}
	if (action.type === LOAD_HOSTED_GAMES) {
		state.hosted = action.games;
	}
	if (action.type === CREATE_GAME) {
		state.open = [...state, action.game];
	}
	return { ...state };
};

//ACTION CREATORS****************************************
const _loadGames = (games) => {
	return {
		type: LOAD_GAMES,
		games,
	};
};

const _loadClosedGames = (games) => {
	return {
		type: LOAD_CLOSED_GAMES,
		games,
	};
};

const _loadHostedGames = (games) => {
	return {
		type: LOAD_HOSTED_GAMES,
		games,
	};
};

const _createGame = (game) => {
	return {
		type: CREATE_GAME,
		game,
	};
};

//THUNKS****************************************
export const loadGames = () => {
	return async (dispatch) => {
		const games = (await axios.get("/api/games")).data;
		dispatch(_loadGames(games));
	};
};

export const loadOpenGames = () => {
	return async (dispatch) => {
		const games = (await axios.get("/api/games/open")).data;
		dispatch(_loadGames(games));
	};
};

export const loadClosedGames = () => {
	return async (dispatch) => {
		const games = (await axios.get("/api/games/closed")).data;
		//can add a filter to check if user is in game
		dispatch(_loadClosedGames(games));
	};
};

export const loadClosedGamesForUser = (userId) => {
	return async (dispatch) => {
		const games = (await axios.get("/api/games/closed")).data;
		//can add a filter to check if user is in game

		let gamesForUser = [];

		//sure this can be done with less code
		for (let i = 0; i < games.length; i++) {
			if (games[i].finalScore !== null) {
				for (let j = 0; j < games[i].users.length; j++) {
					if (games[i].users[j].id === userId) {
						gamesForUser.push(games[i]);
					}
				}
			}
		}

		dispatch(_loadClosedGames(gamesForUser));
	};
};

export const loadOpenGamesForUser = (userId, token) => {
	return async (dispatch) => {
		const games = (
			await axios.get(`/api/user_games/open/${userId}?pickmeup-token=${token}`)
		).data;
		dispatch(_loadGames(games));
	};
};

export const loadHostedGames = (userId) => {
	return async (dispatch) => {
		const games = (await axios.get(`/api/games/hosted/${userId}`)).data;
		// console.log(games)
		dispatch(_loadHostedGames(games));
	};
};

export const createGame = () => {
	return async (dispatch) => {
		const game = (await axios.post("/api/games")).data;
		dispatch(_createGame(game));
	};
};

//this works can possibly be split in two one for games going to be played
// and one for games played but it works
export const updateGame = (id, state, history) => {
	//will put logic to mark games done in here
	let done = false;
	if (state.finalScore !== "" && state.winner !== "") {
		console.log("should close game");
		done = true;
	}
	return async (dispatch) => {
		const { finalScore, winner, host, location, dateAndTime } = state;
		console.log("-----------in thunk--------------");
		console.log(dateAndTime);
		let time = new Date(dateAndTime).getTime();
		console.log(time);

		const game = (
			await axios.put(`/api/games/${id}`, {
				done,
				finalScore,
				winner,
				location,
				dateAndTime,
				time,
			})
		).data;

		console.log(game);
		// console.log(state)
		// console.log(host);
		loadHostedGames(host);
		//dispatch(_createGame(game));
		history.push("/gameshosted");
	};
};

//dstroying (deleting) a game and sening usre back to the
// games they host were those game are reloaded into store so not needed here
//when a game is deleted
export const destroyGame = (game, history) => {
	return async (dispatch) => {
		console.log(game.host);
		const host = game.host;
		await axios.delete(`/api/games/${game.id}`);
		loadHostedGames(host);
		//dispatch(_createGame(game));
		history.push("/gameshosted");
	};
};

// export default store;
export { gamesReducer };
