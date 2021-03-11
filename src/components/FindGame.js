import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';

class FindGame extends Component{

  render(){
    const { games, requests } = this.props;
    return (
      <div>
        <div>
          {
            requests.map(request => {
              if(request.open){
                const game = games.find( game => game.id === request.gameId ) || {};
                return (
                  <GameCard game={game} request={request}/>
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
  console.log(users)
  return {
    games,
    requests: requests.all
  }
}


export default connect(mapState)(FindGame);

