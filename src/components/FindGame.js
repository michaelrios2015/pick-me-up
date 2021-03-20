import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadOpenGames } from '../store/games';
import axios from 'axios';

class FindGame extends Component{
  constructor(){
    super();
    this.state = {
    };

    this.joinGame = this.joinGame.bind(this);
  };

  componentDidMount(){
    this.props.loadOpenGames();
    // console.log(this.props.games);
  };

  // componentDidUpdate(prevProps){
  //   if (prevProps.games !== this.props.games){
  //     this.props.loadOpenGames();
  //   }
  // }
  
  async joinGame(gameId){
    const joiningPlayer = (await axios.get('/api/users/13')).data;
    await axios.post('/api/user_games', { gameId: gameId, userId: joiningPlayer.id });
    // loading open games here seems to work as apposed to calling on compDidUp .. not sure why compDidUp had issues
    this.props.loadOpenGames();
  };
  
  render(){
    const games = this.props.games.open;
    const { joinGame } = this;
    console.log(games);

    return (
      <div>
        <div>
          <h1>{games.length} Games are currently open</h1>
        </div>
        <div>
          {
            games.map(game => {
              const players = game.users;
                return (
                  <div key={game.id} >
                    <GameCard game={game} players={players} openGame={true}/>
                    <div>
                      <button onClick={()=>joinGame(game.id)}>Join this game</button>
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

const mapState = ({games, users}) => {
  return {
    games,
    users: users.all,
  }
};

const mapDispatch = dispatch => {
  return {
    loadOpenGames: ()=> dispatch(loadOpenGames()),
  }
};


export default connect(mapState, mapDispatch)(FindGame);

