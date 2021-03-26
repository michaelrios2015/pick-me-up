import React, { Component } from 'react';
import {connect} from 'react-redux';
<<<<<<< HEAD
import { loadOpenRequests, loadRequests } from '../store/requests';
=======
import axios from 'axios';
import moment from 'moment';
>>>>>>> master

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
<<<<<<< HEAD
  componentDidMount(){
    // this.props.loadRequests();
  //   this.setState({
  //     players: this.props.players.reduce((acc, user) => acc.includes(user) ? '' : [...acc, user], [])
  //   })

    
=======

  async componentDidMount(){
    const game = this.props.game;
    if(Date.now() > game.time * 1){
      await axios.put(`/api/games/${game.id}`, { open: false });
    }
>>>>>>> master
  }
  
  render(){
    const { game, players, openGame } = this.props;
<<<<<<< HEAD
=======
    // console.log(game);
>>>>>>> master
    
    return (
      <div className='game-card'>
        <div className='game-card-header'>
          <h3>Game { game.id }</h3>
        </div>
        <div className='game-card-content'>
          {
            openGame ? (
<<<<<<< HEAD
              <h4>Player Count: {players.length}</h4>
=======
              <h4>
                {
                  players ? (
                    <span>Player Count: {players.length}</span>
                  ) : (
                    ''
                  )
                }
              </h4>
>>>>>>> master
              ) : (
              <h4>Score: { game.finalScore }</h4>
            )
          }
<<<<<<< HEAD
          <h4 className='name-list'>Player Names: 
=======
          {/* <h4 className='name-list'>Player Names: 
>>>>>>> master
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
<<<<<<< HEAD
          </h4>
          <h4>Court: { game.location }</h4>
          <h4>Time: { game.time }</h4>
=======
          </h4> */}
          <h4>Court: { game.location }</h4>
          <h4>Date: { moment(game.dateAndTime).format('MMM D, YYYY') }</h4>
          <h4>Time: { moment(game.dateAndTime).format('h:mm a') }</h4>
>>>>>>> master
        </div>
      </div>
    )
  }
}

<<<<<<< HEAD
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
=======
const mapState = ({ users }) => {
  return {
    users: users.all
  }
}


export default connect(mapState, null)(GameCard)
>>>>>>> master

