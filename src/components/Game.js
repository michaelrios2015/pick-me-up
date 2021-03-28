import React, { Component } from 'react';
import { connect } from 'react-redux';
import { destroyGame, updateGame } from '../store/';
import moment from 'moment';
import axios from 'axios';

//this will list the games a user is hosting, they will be able to update the time, location, delete the game
//they will also be able to add a winner and update the score, not sure if these two things should be seperated out 
//so for finished games you can update the score but for games not started you can change time and such, that would be better but first I will 
//just let you change everything 



export class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      location: this.props.game.location ? this.props.game.location : '',
      dateAndTime: this.props.game.dateAndTime ? this.props.game.dateAndTime : '',
      time: this.props.game.time ? this.props.game.time : '',
      finalScore: this.props.game.finalScore ? this.props.game.finalScore : '',
      winner: this.props.game.winner ? this.props.game.winner : '',
      error: ''
  };
  console.log(this.props.state);
  this.onChange = this.onChange.bind(this);
  this.onSave = this.onSave.bind(this);
  // this.deleteGame = this.deleteGame.bind(this);
}
componentDidUpdate(prevProps){
  //mostly get it
  if (!prevProps.game.id && this.props.game.id){
      //this.setState({ name: this.props.student.name, email: this.props.student.email, gpa: this.props.student.gpa, schoolId: this.props.student.schoolId });
      console.log(this.props);
  }
}
onChange(ev){
  const change = {};
  change[ev.target.name] = ev.target.value;
  this.setState(change);
}
async onSave(ev){
  ev.preventDefault();
  //should be able to use will play to know if done should be changed 
  try {
      await this.props.update(this.props.game.id, this.state);
  }
  catch(ex){
      console.log(ex);
      this.setState({ error: ex.response});
  }
  console.log(this.state)   
}



  render(){
    const { game, destroy } = this.props;
    // console.log(this.props);
    const { location, finalScore, error, winner, dateAndTime, time } = this.state;
    const { onChange, onSave} = this;
    //date is being a pain will not worry about for the moment 
    //for some reason there ar strange end characters being added to the date and time 
    // this is a temporary way of dealing with them :)
    // let tempDateAndTime = dateAndTime.slice(0, dateAndTime.length-5)

    let willPlay = true;
    if(Date.now() > game.time * 1){
      willPlay = false;
    } 
    //so should check to see if game is over or not, if game is over  score, winner, and ideally
    //the teams each player played on should be updated, if the game has not started should be able
    //change timeAndDate, location or delete the game
    
    // this is the beginning

    return (
        <div>
          <form onSubmit = { onSave }>
            <pre>
                {
                    !!error && JSON.stringify(error, null, 2)
                }
            </pre>
            {willPlay ? (
              <div className='container'>
                <h4>This Game will be played on :</h4>
                <p>Location</p>  
                <input name='name' value={ location } onChange = { onChange }/>
                <br/>
                <label htmlFor='date'>Date and Time:</label>
                <br/>
                <input type="dateTime-local" value={ dateAndTime } name="dateAndTime" onChange={ onChange }/>   
                <br/>
                <h4>Please change the Time or Location</h4>
                {/* <button>SAVE</button> */}
                <br/>
                <button onClick={()=>destroy(game)}>delete this game</button>
              </div> 

            ) :  (
              
              <div className='container'>
                <h4>This game was played on: </h4> 
                <h4>Date: { moment(game.dateAndTime).format('MMM D, YYYY') }</h4>
                <h4>Time: { moment(game.dateAndTime).format('h:mm a') }</h4>
                <h4>number of players: {game.users ? game.users.length : 0}</h4>               
                <h4>Please update the final score and winner: </h4> 
                
                <p>Final Score</p> 
                <input name='finalScore' value={ finalScore } onChange = { onChange }/>
                <br/>
                <p>Winner</p> 
                <input name='winner' value={ winner } onChange = { onChange }/>
                
                <button disabled = { !finalScore || !winner }>SAVE</button>
                <br/>
                
                <button onClick={()=>destroy(game)}>delete this game</button>
              </div>
              
              
            )  }
            
            
          </form>

        </div>            
    );
  
  }
}

const mapStateToProps = (state, otherProps) => {
  console.log(otherProps.match);
  console.log(state)
  const game = state.games.hosted.find(game => game.id === otherProps.match.params.id * 1) || {};
  //console.log(game)
  return {
    game, 
  };
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    destroy: (game)=> {
      dispatch(destroyGame(game, history));
      // console.log(game)
    },
    update: (id, state)=> {
      // console.log('hi');
      dispatch(updateGame(id, state, history));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

