import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';

class FindGame extends Component{

  render(){
    const { games, requests } = this.props;
    // console.log(requests)
    return (
      <div>
        <div>
          {
            requests.map(request => {
              const game = games.find( game => game.id * 1 === request.gameId ) || {};
              return (
                <GameCard game={game} request={request}/>
              )
            })
          }
        </div>
      </div>
    );
  }
}

const mapState = ({games, requests}) => {
  return {
    games,
    requests: requests.all
  }
}


export default connect(mapState)(FindGame);

