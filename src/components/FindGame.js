import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadOpenGames } from '../store/games';
<<<<<<< HEAD
import { createRandomUser } from '../store/users';
import { loadRequests, createRequest } from '../store/requests';
=======
>>>>>>> master
import axios from 'axios';

class FindGame extends Component{
  constructor(){
    super();
<<<<<<< HEAD
    this.state = {
    };
=======
>>>>>>> master

    this.joinGame = this.joinGame.bind(this);
  };

  componentDidMount(){
    this.props.loadOpenGames();
<<<<<<< HEAD
    // this.props.loadRequests();
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
=======
  };
  
  
  async joinGame(game){
    if(Date.now() < game.time * 1){
    // using a fixed user Id to simulate logged-in user. UPDATE W/LOGGED-IN USERID WHEN AUTH IS CONNECTED TO STORE
      const addPlayer = (await axios.post('/api/user_games', { gameId: game.id, userId: 13 })).data;
      if(!addPlayer.created){
        window.alert('You have already joined this game.');
      } else {
        window.alert(`You\'ve joined game ${game.id}!`)
      }
    } else {
      window.alert('Sorry this game has already started. Please select another game.');
      await axios.put(`/api/games/${game.id}`, { open: false });
    }
    this.props.loadOpenGames();
  };

>>>>>>> master
  
  render(){
    const { games } = this.props;
    const { joinGame } = this;
    
<<<<<<< HEAD
    return (
      <div>
        <div>
          <h1>{games.length} Games are currently open</h1>
=======
    
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
>>>>>>> master
        </div>
        <div>
          {
            games.map(game => {
              const players = game.users;
<<<<<<< HEAD
                return (
                  <div key={game.id} >
                    <GameCard game={game} players={players} openGame={true}/>
                    <div>
                      <button onClick={()=>joinGame(game.id)}>Join this game</button>
                    </div>
                  </div>
                )
=======

              return (
                <div key={game.id} >
                  <GameCard game={game} players={players} openGame={true}/>
                  <div>
                    <button onClick={()=>joinGame(game)}>Join this game</button>
                  </div>
                </div>
              )
>>>>>>> master
            })
          }
        </div>
      </div>
    );
  }
};

<<<<<<< HEAD
const mapState = ({games, requests, users}) => {
  return {
    games,
    users: users.all,
    allRequests: requests.all
=======
const mapState = ({ games, users }) => {
  return {
    games: games.open,
    users: users.all
>>>>>>> master
  }
};

const mapDispatch = dispatch => {
  return {
<<<<<<< HEAD
    loadOpenGames: ()=> dispatch(loadOpenGames()),
    loadRequests: ()=> dispatch(loadRequests()),
    createRandomUser: ()=> dispatch(createRandomUser()),
    createUserGame: (gameId)=> dispatch(create(gameId))
=======
    loadOpenGames: ()=> dispatch(loadOpenGames())
>>>>>>> master
  }
};


export default connect(mapState, mapDispatch)(FindGame);

