import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadUsers } from '../store/';

export class MyStats extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.bootstrap();
   
  }

  render(){

    return (
        <div className='container'>
          <div className='header'>
            HELLO
          </div>
          <div className='sub-header'>
            {/* <div>
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
            </div> */}
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
      dispatch(loadUsers());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStats);

