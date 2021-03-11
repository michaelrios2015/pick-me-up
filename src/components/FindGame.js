import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';

class FindGame extends Component{

  render(){
    const { games, requests, users } = this.props;
    return (
      <div>
        <div>
          {
            requests.map(request => {
              if(request.open){
                const game = games.find( game => game.id === request.gameId ) || {};
                const players = users.filter(user => user.id === request.userId) || {};
                return (
                  <GameCard game={game} request={request} players={players}/>
                )
              }
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
    requests: requests.all,
  }
}


export default connect(mapState)(FindGame);

