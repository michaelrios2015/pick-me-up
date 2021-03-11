import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';

//so at this point we should have a user ID from being logged in
// with the user id we can querry requests for all games played 
// that will give us a list of games played that needs to be joined with 
export class MyStats extends Component{

  render(){
    const { user, game, request } = this.props;
    return (
        <div className='container'>
          <div className='header'>
            {
              //replace email with user's name
            }
            <h1>{user.email}: Stats</h1>
          </div>
          <div className='sub-header'>
            <div>
              {
                // need to calculate total wins and losses
              }
              <h3>Wins:</h3>
            </div>
            <div>
              <h3>Losses:</h3>
            </div>
          </div>
          <div className='card'>
            <GameCard game={game} request={request}/>
            <GameCard game={game} request={request}/>
          </div>
        </div>
    );
  }
}

const mapState = ({users, games, requests, match}) => {
  //hardcoded user, request, and game to have data to work with;
  //need to setup url path for a specific user id
  const user = users.find( user => user.id === 4 ) || {};
  const request = requests['all'].find( request => request.id === 24 ) || {};
  
  // something like this should be happening in the thunk  
  // const request2 = requests.find( request => request.userId === user.id && request.gameId !== null ) || {};
  // console.log(request2);
  
  const game = games.find( game => game.id * 1 === 1 ) || {};

  return {
    user: user,
    game: game,
    request: request
  };
}


export default connect(mapState)(MyStats);

