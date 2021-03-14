import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loadOpenRequests } from '../store/requests';

/**
 * COMPONENT
 */
class GameCard extends Component{
  // constructor(){
  //   super();
  //   this.state = {
  //     players: []
  //   }
  // }
  // componentDidMount(){
  //   // this.props.loadOpenRequests(this.props.game.id);
  //   this.setState({
  //     players: this.props.players.reduce((acc, user) => acc.includes(user) ? '' : [...acc, user], [])
  //   })
  // }

  render(){
    const { game, request, players } = this.props;


    return (
      <div className='game-card'>
        <div className='game-card-header'>
          <h3>Game { game.id }</h3>
        </div>
        <div className='game-card-content'>
          {
            request.open ? (
              <h4>Player Count: {players.length}</h4>
              ) : (
              <h4>Score: { game.finalScore }</h4>
            )
          }
          <h4 className='name-list'>Player Names: </h4>
            { 
            //maybe use reduce() here to list/join the names in a nicer way
              players.map(player => {
                return (
                  <p key={player.id}> 
                    {player.name} 
                  </p>
                )
              }) 
            }
          <h4>Court: { request.location }</h4>
          <h4>Time: { request.time }</h4>
        </div>
      </div>
    )
  }
}

// const mapState = ({ requests }) => {
//   return {
//     requests: requests.all
//   }
// }
const mapDispatch = dispatch => {
  return {
    loadOpenRequests: (gameId)=> dispatch(loadOpenRequests(gameId))
  }
}


export default connect(state=>state, mapDispatch)(GameCard)

