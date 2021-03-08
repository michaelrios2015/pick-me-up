import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';

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
  const request = requests.find( request => request.id === 24 ) || {};
  const game = games.find( game => game.id * 1 === 1 ) || {};

  return {
    user: user,
    game: game,
    request: request
  };
}


export default connect(mapState)(MyStats);

