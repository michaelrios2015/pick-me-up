import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadOpenRequests } from '../store/requests';

class FindGame extends Component{
  constructor(){
    super();
    this.state = {
      requests: []
    }
  }

  componentDidMount(){
    const { games, allRequests, users } = this.props;
    this.setState({
      requests: allRequests.filter(request => request.open)
    })
  }

  render(){
    const { games, users } = this.props;
    const { requests } = this.state;
    return (
      <div>
        <div>
          <h1>{requests.length} Games are currently open</h1>
        </div>
        <div>
          {
            requests.map(request => {
              // if(request.open){
                const game = games.find( game => game.id === request.gameId ) || {};
                const players = users.filter(user => user.id === request.userId) || {};
                return (
                  <div key={request.id} >
                    <GameCard game={game} request={request} players={players} openGame={request.open}/>
                    <div>
                      <button>Join this game</button>
                    </div>
                  </div>
                )
              // }
            })
          }
        </div>
      </div>
    );
  }
}

const mapState = ({games, requests, users}) => {
  return {
    games,
    users,
    allRequests: requests.all,
  }
}

const mapDispatch = dispatch => {
  return {
    loadOpenRequests: ()=> dispatch(loadOpenRequests)
  }
}


export default connect(mapState, mapDispatch)(FindGame);

