import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loadOpenRequests, loadRequests } from '../store/requests';

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
  componentDidMount(){
    // this.props.loadRequests();
  //   this.setState({
  //     players: this.props.players.reduce((acc, user) => acc.includes(user) ? '' : [...acc, user], [])
  //   })

    
  }
  
  render(){
    const { game, players, openGame } = this.props;
    console.log(players)
    
    return (
      <div className='game-card'>
        <div className='game-card-header'>
          <h3>Game { game.id }</h3>
        </div>
        {/* <div className='game-card-content'>
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
                    {player.name} 
                  </span>
                )
              }) 
            }
          </h4>
          <h4>Court: { request.location }</h4>
          <h4>Time: { request.time }</h4>
        </div> */}
      </div>
    )
  }
}

const mapState = ({ requests, users }) => {
  return {
    requests: requests.all,
    users: users.all
  }
}
const mapDispatch = dispatch => {
  return {
    loadOpenRequests: (gameId)=> dispatch(loadOpenRequests(gameId)),
    loadRequests: ()=> dispatch(loadRequests())
  }
}


export default connect(mapState, mapDispatch)(GameCard)

