import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadOpenGames } from '../store/games';
import axios from 'axios';

class FindGame extends Component{
  constructor(){
    super();
    this.state = {
      games: []
    }
  }

  componentDidMount(){
    this.props.loadOpenGames();
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
                    <GameCard game={game} 
                    request={gameRequests[0]} players={players} openGame={true}
                    />
                    <div>
                      <button onClick={}>Join this game</button>
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
    loadOpenGames: ()=> dispatch(loadOpenGames())
  }
}


export default connect(mapState, mapDispatch)(FindGame);




// requests.map(request => {
//   const openGame = games.find(game => request.gameId === game.id);
//   const usersGame = users.find(user => request.userId === user.id);
//   if(openGame){
//     console.log('hello')
//     console.log(openGame)
//     console.log(usersGame)
//   }
//   return (
//     <div key={request.id} >
//       {/* <GameCard game={game} request={request} players={players} openGame={request.open}/> */}
//       <div>
//         <button>Join this game</button>
//       </div>
//     </div>
//   )
// })