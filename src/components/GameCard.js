import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
// moment().format(); 

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
    console.log(moment(game.dateAndTime).format('h:mm a'));
    
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
          <h4>Date: { moment(game.dateAndTime).format('MMM D, YYYY') }</h4>
          <h4>Time: { moment(game.dateAndTime).format('h:mm a') }</h4>
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

