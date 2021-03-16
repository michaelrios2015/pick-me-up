import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadRequestsForUser, loadGames, loadUser } from '../store/';


//so at this point we should have a user ID from being logged in
// with the user id we can querry requests for all games played 
// that will give us a list of games played that needs to be joined with 
export class MyStats extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.bootstrap();
   
  }

  render(){
    // const { user, game, request } = this.props;
    // console.log(this.props)
    let user = this.props.users.single;
    let game = this.props.games[0] || {};
    // console.log(game);
    // this is just the  one we started with not how it's really done
    const request = this.props.requests.individual[2]  || {};
    // console.log(request);
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
              <h3>Wins:</h3>
            </div>
            <div>
              <h3>Losses:</h3>
            </div>
          </div>
          <div className='card'>
            <GameCard game={game} request={request}/>
            <GameCard game={game} request={request}/> 
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
      dispatch(loadRequestsForUser(4));
      dispatch(loadGames());
    }
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(MyStats);

