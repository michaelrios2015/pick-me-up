import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadUsersOpenGames } from '../store/games';
import axios from 'axios';

class MyGames extends Component{
  constructor(){
    super();

    this.joinGame = this.joinGame.bind(this);
  };

  componentDidMount(){
    this.props.loadUsersOpenGames();
  };
  
  
  async joinGame(game){
    if(Date.now() < game.time * 1){
    // using a fixed user Id to simulate logged-in user. UPDATE W/LOGGED-IN USERID WHEN AUTH IS CONNECTED TO STORE
      const addPlayer = (await axios.post('/api/user_games', { gameId: game.id, userId: 13 })).data;
      if(!addPlayer.created){
        window.alert('You have already joined this game.');
      }
    } else {
      window.alert('Sorry this game has already started. Please select another game.');
      await axios.put(`/api/games/${game.id}`, { open: false });
    }
    this.props.loadUsersOpenGames();
  };

  async checkIfGameExpired(game){
    if(Date.now() > game.time * 1){
      await axios.put(`/api/games/${game.id}`, { open: false });
    }
    this.props.loadUsersOpenGames();
  }
  
  render(){
    const { games } = this.props;
    const { leaveGame } = this;
    
    return (
      <div>
        <div>
          {
            games.length > 0 ? (
              <h1>{games.length} Games are currently open!</h1>
            ) : (
              <h1>Sorry, there are no open games. Please Check back later.</h1>
            )
          }
        </div>
        <div>
          {
            games.map(game => {
              const players = game.users;

              return (
                <div key={game.id} >
                  <GameCard game={game} players={players} openGame={true}/>
                  <div>
                    <button onClick={()=>leaveGame(game)}>Leave this game</button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
};

const mapState = ({ games, users }) => {
  return {
    games: games.open,
    users: users.all
  }
};

const mapDispatch = dispatch => {
  return {
    loadUsersOpenGames: (userId)=> dispatch(loadUsersOpenGames(userId))
  }
};


export default connect(mapState, mapDispatch)(MyGames);

