import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadOpenGames } from '../store/games';
import axios from 'axios';

class FindGame extends Component{
  constructor(){
    super();

    this.joinGame = this.joinGame.bind(this);
  };

  componentDidMount(){
    this.props.loadOpenGames();
  };
  

  // componentDidUpdate(prevProps){
    // if (prevProps.games !== this.props.games){
    //   this.props.loadOpenGames();
    // }
    // this.props.games.map(game => this.checkIfGameExpired(game))
  // }
  
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
    // loading open games here seems to work as apposed to calling on compDidUp .. not sure why compDidUp had issues
    this.props.loadOpenGames();
  };

  async checkIfGameExpired(game){
    if(Date.now() > game.time * 1){
      await axios.put(`/api/games/${game.id}`, { open: false });
    }
    this.props.loadOpenGames();
  }
  
  render(){
    const { games } = this.props;
    const { joinGame, checkIfGameExpired } = this;
    
    return (
      <div>
        <div>
          <h1>{games.length} Games are currently open</h1>
        </div>
        <div>
          {
            games.map(game => {
              const players = game.users;
              // checkIfGameExpired(game);

                return (
                  <div key={game.id} >
                    <GameCard game={game} players={players} openGame={true}/>
                    <div>
                      <button onClick={()=>joinGame(game)}>Join this game</button>
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
    loadOpenGames: ()=> dispatch(loadOpenGames())
  }
};


export default connect(mapState, mapDispatch)(FindGame);

