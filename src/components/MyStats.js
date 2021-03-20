import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadClosedGamesForUser, loadUser } from '../store/';

export class MyStats extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.bootstrap();
   
  }

  render(){
    console.log(this.props)
    let user = this.props.users.single;
    let games = this.props.games.closed
    console.log(games); 

    let wins = [];
    let loses = [];

    //seperating out wins from loses
    for (let i = 0; i<games.length; i++){
      // console.log(games[i].winner);
      for (let j = 0; j < games[i].users.length; j++){
              // console.log(games[i].users[j].usergame.team)
       if (games[i].users[j].usergame.team === games[i].winner && user.id === games[i].users[j].usergame.userId){
              wins.push(games[i])
          } else if (user.id === games[i].users[j].usergame.userId) {
        loses.push(games[i])
      }
      }
    }   
    // console.log(wins);
    // console.log(loses);
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
              <h3>Wins: { wins.length }</h3>
              {  
                wins.map( game => { 
                  const players = game.users;
                  return (
        
                      <div key={game.id}>
                   <GameCard game={game} players={players} openGame={false}/>
                    </div>
                  );
                })
              }
            </div>

            <div>
              <h3>Losses: { loses.length }</h3>
              {  
                  loses.map( game => { 
                    const players = game.users;
                    return (
          
                        <div key={game.id}>
                     <GameCard game={game} players={players} openGame={false}/>
                      </div>
                    );
                  })
              }
            </div>
          </div>
        </div>
    );
  
  }
}

const mapStateToProps = (state) => {
  // console.log(state.requests);
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: ()=> {
      dispatch(loadUser(4));
      dispatch(loadClosedGamesForUser(4));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStats);

