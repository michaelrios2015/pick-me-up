import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadOpenGames } from '../store/games';
import axios from 'axios';
import GameMap from './GameMap'


class FindGame extends Component{
  constructor(){
    super();
    this.state = {
      zipcode: '',
      showCourts: false
    }
    this.joinGame = this.joinGame.bind(this);
    this.courtSubmit = this.courtSubmit.bind(this)
    this.handleInputs = this.handleInputs.bind(this)
  };

  componentDidMount(){
    // this.props.loadOpenGames();
  };
  async courtSubmit(ev){
    ev.preventDefault()
    this.props.loadOpenGames(this.state.zipcode);
    this.setState({showCourts: true})
  }
  handleInputs(ev){
    const {name, value} = ev.target
    this.setState({[name] : value})
  }
  async joinGame(game){
    let teamToJoin = '';
    //check if there are an even or odd number of players assigns the new player accordingly (team A if this player will be odd Tean B for even) 
    if ((game.users.length * 1) % 2 === 0){
      teamToJoin = 'TEAM A';
    }
    else {
      teamToJoin = 'TEAM B';
    }

    if(Date.now() < game.time * 1){
      console.log(game.users.length)
      console.log(teamToJoin)
        const addPlayer = (await axios.post('/api/user_games', { gameId: game.id, userId: this.props.user.id, team: teamToJoin })).data;
      if(!addPlayer.created){
        window.alert('You have already joined this game.');
      } else {
        window.alert(`You\'ve joined game ${game.id}!`)
      }
    } else {
      window.alert('Sorry this game has already started. Please select another game.');
      await axios.put(`/api/games/${game.id}`, { open: false });
    }
    this.props.loadOpenGames();
  };

  
  render(){
    const { games } = this.props;
    const { joinGame } = this;
    console.log(games)
    if(games.length === 0 ){
      return (
        <div>
          <label htmlFor='zipcode'>Zipcode:</label>
          <input type="text" id="zipcode" name="zipcode" onChange={this.handleInputs}/>
          <button onClick={this.courtSubmit}>Find Courts</button>
        </div>
      )
    }
    if(games.length > 0){
      return (
        <div>
          <div>
            {
              games.length > 0 ? (
                <h1>{games.length} Games are currently open!</h1>
              ) : (
                <h1>Sorry, there are no open games. Please Check back later.</h1>
              )
            }
          </div>
          <div>
            <div className='card-body'>
              {
                games.map(game => {
                  const players = game.users;
  
                  return (
                    <div key={game.id} >
                      <GameCard game={game} players={players} openGame={true}/>
                      <center>
                    <button type='button' className='text-center btn btn-primary' onClick={()=>joinGame(game)}>Join this game</button>
                    </center>
                    </div>
                  )
                })
              }
            </div>
            <div className='courtMap'>
              <GameMap courts={games}/>
            </div>
          </div>
        </div>
        )
    }
  
  }
};

{/* <div className='card-body'> 
          {
            games.map(game => {
              const players = game.users;

              return (
                <div key={game.id} >
                  <GameCard game={game} players={players} openGame={true}/>
                  <div>
                    <center>
                    <button type='button' className='text-center btn btn-primary' onClick={()=>joinGame(game)}>Join this game</button>
                    </center>
                  </div>
                </div> */}
const mapState = ({ games, users }) => {
  return {
    games: games.open,
    user: users.single
  }
};

const mapDispatch = dispatch => {
  return {
    loadOpenGames: (zipcode)=> dispatch(loadOpenGames(zipcode))
  }
};


export default connect(mapState, mapDispatch)(FindGame);

