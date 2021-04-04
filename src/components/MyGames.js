import React, { Component } from "react";
import { connect } from "react-redux";
import GameCard from "./GameCard";
import { loadOpenGamesForUser } from "../store/games";
import axios from "axios";

class MyGames extends Component {
	constructor() {
		super();

		this.leaveGame = this.leaveGame.bind(this);
	}

	componentDidMount() {
		const token = localStorage.getItem("pickmeup-token");
		this.props.loadOpenGamesForUser(this.props.user.id, token);
	}

	async leaveGame(game) {
		const token = localStorage.getItem("pickmeup-token");
		await axios.delete(`/api/user_games/${game.id}/${this.props.user.id}`);
		this.props.loadOpenGamesForUser(this.props.user.id, token);
	}

	render() {
		const { games, user } = this.props;
		const { leaveGame } = this;
		console.log(user);

		return (
			<div>
				<div>
					{games.length > 0 ? (
						<h1>You have {games.length} upcoming games!</h1>
					) : (
						<h1>You have no upcoming games.</h1>
					)}
				</div>
				<div>
					{games.map((game) => {
						const players = game.users;

						return (
							<div key={game.id}>
								<GameCard game={game} players={players} openGame={true} />
								<div>
									<button onClick={() => leaveGame(game)}>
										Leave this game
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

const mapState = ({ games, users }) => {
	return {
		games: games.open,
		user: users.single,
	};
};

const mapDispatch = (dispatch) => {
	return {
		loadOpenGamesForUser: (userId, token) =>
			dispatch(loadOpenGamesForUser(userId, token)),
	};
};

export default connect(mapState, mapDispatch)(MyGames);
