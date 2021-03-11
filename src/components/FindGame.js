import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';

class FindGame extends Component{

  render(){
    const { games, requests } = this.props;
    return (
      <div>
        {
          games.map(game => {
            // requests['all'].find( request => request.id === game.id ) || {};
            return (
              <div></div>
              // <GameCard game={game} request={request}/>
            )
          })}
      </div>
    );
  }
}

const mapState = ({games, requests}) => {
  console.log(requests.all)
  return {
    games,
    requests: requests.all
  }
}


export default connect(mapState)(FindGame);

