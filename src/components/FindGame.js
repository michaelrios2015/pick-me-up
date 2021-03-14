import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadOpenGames } from '../store/games';
import { createRandomUser } from '../store/users';
import { createRequest } from '../store/requests';

import axios from 'axios';

class FindGame extends Component{
  constructor(){
    super();
    this.state = {
      games: []
    }
    this.joinGame = this.joinGame.bind(this)
  }

  componentDidMount(){
    this.props.loadOpenGames();
  }

  joinGame(request){
    this.props.createRequest(request);
  }

  render(){
    const { games, users, allRequests } = this.props;
    return (
      <div>
        <div>
          <h1>{games.length} Games are currently open</h1>
        </div>
        <div>
          {
            games.map(game => {
              const gameRequests = allRequests.filter(request => request.gameId === game.id);
              const players = [];
              gameRequests.map(request => {
                users.map(user => {
                  if(user.id === request.userId){
                    players.push(user);
                  }
                })
              })

                return (
                  <div key={game.id} >
                    <GameCard game={game} request={gameRequests[0]} players={players} openGame={true}/>
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
  return {
    games,
    users,
    allRequests: requests.all,
  }
}

const mapDispatch = dispatch => {
  return {
    loadOpenGames: ()=> dispatch(loadOpenGames()),
    createRandomUser: ()=> dispatch(createRandomUser()),
    createRequest: (request)=> dispatch(createRequest(request))
  }
}


export default connect(mapState, mapDispatch)(FindGame);

