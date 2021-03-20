import React, { Component } from 'react';
import {connect} from 'react-redux';

/**
 * COMPONENT
 */
class GameCard extends Component{
  constructor(){
    super();
    this.state = {
      gameRequests: [],
      players: []
    }
  }
  
  render(){
    const { game, players, openGame } = this.props;
    
    return (
      <div className='game-card'>
        <div className='game-card-header'>
          <h3>Game { game.id }</h3>
        </div>
        <div className='game-card-content'>
          {
            openGame ? (
              <h4>Player Count: {players.length}</h4>
              ) : (
              <h4>Score: { game.finalScore }</h4>
            )
          }
          <h4 className='name-list'>Player Names: 
            { 
            //maybe use reduce() here to list/join the names in a nicer way
              players.map(player => {
                return (
                  <span key={player.id}> 
                    {' ' + player.name}
                  </span>
                )
              }) 
            }
          </h4>
          <h4>Court: { game.location }</h4>
          <h4>Time: { game.time }</h4>
        </div>
      </div>
    )
  }
}

const mapState = ({ users }) => {
  return {
    users: users.all
  }
}


export default connect(mapState, null)(GameCard)

