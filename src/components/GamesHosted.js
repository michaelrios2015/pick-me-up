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
    
    // just hard coding it in for convience at the moment 
    this.props.bootstrap(1);

    // console.log(this.props.users.single);
    // if (this.props.users.single){
    //   this.props.bootstrap(this.props.users.single.id);
    // }

  }

  render(){

    let games = this.props.games.hosted;
    let pastGames = [];
    let futureGames = [];

    // could split past games into already marked done, and need score
    games.forEach(game => {if(Date.now() > game.time * 1){
      pastGames.push(game);
    } else {
      futureGames.push(game)
    }
    });
    // console.log(games)
    // console.log(pastGames)
    // console.log(futureGames)

    //something like this for games going to host and games already hosted 
    //if(Date.now() < game.time * 1){


    //i guess i can exclude games that already have a final score an winner

    //idealy would also be able to enter teams for players of done games or have the computer 
    //do it
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
            <h3>Games you will Host: { futureGames.length }</h3>
              {  
                futureGames.map( game => { 
                  const players = game.users;
                  return (
                    <div key={game.id}>
                      <a href={`#/games/${game.id}`}>{game.id}</a>
                      <GameCard game={game} players={players} openGame={true}/>
                    </div>
                  );
                })
              }
          </div>
          <div>
            <h3>Games Hosted: { pastGames.length }</h3>
              {  
                pastGames.map( game => { 
                  const players = game.users;
                  return (
                    <div key={game.id}>
                     <a href={`#/games/${game.id}`}>{game.id}</a>
                     <GameCard game={game} players={players} openGame={false}/>
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
    bootstrap: (userId)=> {
      dispatch(loadHostedGames(userId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesHosted);

