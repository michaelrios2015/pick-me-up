import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../reducers';
import GameCard from './GameCard';

export class MyStats extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.loadUsers();
  }

  render(){
    const { user, game, request } = this.props;
    return (
        <div className='container'>
          <div className='header'>
            <h1>My Stats</h1>
          </div>
          <div className='sub-header'>
            <div>
              <h3>Wins:</h3>
            </div>
            <div>
              <h3>Loses:</h3>
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

const mapStateToProps = ({users, games, requests, match}) => {
  const user = users.find( user => user.id === 4 ) || {};  
  const request = requests.find( request => request.id === 24 ) || {};  
  const game = games.find( game => game.id * 1 === 1 ) || {};  
  console.log(user)
  console.log('requests', request)
  console.log('games', game)

  return {
    user: user,
    game: game,
    request: request
  };
}

const mapDispatch = (dispatch) => {
  return {
    loadUsers: () => dispatch(loadUsers)
  }
}


export default connect(mapStateToProps, mapDispatch)(MyStats);

