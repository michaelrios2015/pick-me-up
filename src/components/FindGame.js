import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadOpenGames } from '../store/games';
import { createRandomUser } from '../store/users';
import { loadRequests, createRequest } from '../store/requests';

import axios from 'axios';

class FindGame extends Component{
  constructor(){
    super();
    this.state = {
      games: []
    }
    this.getPlayers = this.getPlayers.bind(this)
    this.joinGame = this.joinGame.bind(this)
  }

  componentDidMount(){
    this.props.loadOpenGames();
    this.props.loadRequests();
  }

  async getPlayers(gameId){
    return (await axios.get(`/api/user_games/${gameId}`)).data;
  }

  joinGame(request){
    this.props.createRequest(request);
  }

  render(){
    const { games, users, allRequests } = this.props;
    const { getPlayers } = this;
    
    return (
      <div>
        <div>
          <h1>{games.length} Games are currently open</h1>
        </div>
        <div>
          {
            games.map(game => {
              const players = getPlayers(game.id);
                return (
                  <div key={game.id} >
                    <GameCard game={game} players={players} openGame={true}/>
                    <div>
                      <button onClick={()=>this.joinGame(gameRequests[0])}>Join this game</button>
                    </div>
                  </div>
                )
            })
          }
        </div>
      </div>
    );
  }
}

const mapState = ({games, requests, users}) => {
  // console.log(requests)
  return {
    games,
    users: users.all,
    allRequests: requests.all,
  }
}

const mapDispatch = dispatch => {
  return {
    loadOpenGames: ()=> dispatch(loadOpenGames()),
    loadRequests: ()=> dispatch(loadRequests()),
    createRandomUser: ()=> dispatch(createRandomUser()),
    createRequest: (request)=> dispatch(createRequest(request))
  }
}


export default connect(mapState, mapDispatch)(FindGame);

