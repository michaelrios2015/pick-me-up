import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadHostedGames } from '../store/';
import GameCard from './GameCard';

//this will list the games a user is hosting, they will be able to update the time, location, delete the game
//they will also be able to add a winner and update the score, not sure if these two things should be seperated out 
//so for finished games you can update the score but for games not started you can change time and such, that would be better but first I will 
//just let you change everything 

export class GamesHosted extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.bootstrap();
   
  }

  render(){

    let games = this.props.games.hosted;
    console.log(games)

    return (
        <div className='container'>
          <div>
          {
            games.length > 0 ? (
              <h1>You have {games.length} hosted games!</h1>
            ) : (
              <h1>You have no upcoming games.</h1>
            )
          }
          </div>
          <div>
          <h3>Games Hosssted: { games.length }</h3>
              {  
                games.map( game => { 
                  const players = game.users;
                  return (
        
                      <div key={game.id}>
                   <GameCard game={game} players={players} openGame={true}/>
                    </div>
                  );
                })
              }

          </div>
        </div>
    );
  
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: ()=> {
      dispatch(loadHostedGames(1));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesHosted);

