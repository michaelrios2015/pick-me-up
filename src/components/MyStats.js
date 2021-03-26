import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
<<<<<<< HEAD
import { loadGamesForUser, loadGames, loadUser } from '../store/';
=======
import { loadClosedGamesForUser, loadUser } from '../store/';
>>>>>>> master

export class MyStats extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.bootstrap();
   
  }

  render(){
<<<<<<< HEAD
    // const { user, game, request } = this.props;
    console.log(this.props)
    let user = this.props.users.single;
    // let games = this.props.games 

    // let wins = games.filter(game => game.team === game.game.winner)
    // let loses = games.filter(game => game.team !== game.game.winner)
    // let win = wins[0];
    // console.log(wins);
    // console.log(loses);
    // console.log(games);
    // this is just the  one we started with not how it's really done
    const request =  {};
    // console.log(request);
=======
    let user = this.props.users.single;
    let games = this.props.games.closed

    let wins = [];
    let loses = [];

    //seperating out wins from loses
    for (let i = 0; i<games.length; i++){
      for (let j = 0; j < games[i].users.length; j++){
       if (games[i].users[j].usergame.team === games[i].winner && user.id === games[i].users[j].usergame.userId){
              wins.push(games[i])
          } else if (user.id === games[i].users[j].usergame.userId) {
        loses.push(games[i])
      }
      }
    }   

>>>>>>> master
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
<<<<<<< HEAD
              <h3>Wins:</h3>
              {  
                // wins.map( game => { 
                //   return (
                //     <div key={game.gameId}>
                //    {game.gameId}
                //          {/* <GameCard game={game}/> */}
                //     </div>
                //   );
                // })
=======
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
>>>>>>> master
              }
            </div>

            <div>
<<<<<<< HEAD
              <h3>Losses:</h3>
              {  
                  // loses.map( game => { 
                  //     return (
                  //       <div key={game.gameId}>
                  //         {game.gameId}
                  //         {/* <GameCard game={game} /> */}
                  //       </div>
                  //     );
                  // })
=======
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
>>>>>>> master
              }
            </div>
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
      dispatch(loadUser(4));
<<<<<<< HEAD
      dispatch(loadGamesForUser(4));
      // dispatch(loadGames());
=======
      dispatch(loadClosedGamesForUser(4));
>>>>>>> master
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStats);

