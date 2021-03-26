import React, { Component } from 'react';
import { connect } from 'react-redux';
import { destroyGame } from '../store/';
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
      finalScore: this.props.game.finalScore ? this.props.game.finalScore : '',
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
  // try {
  //     await this.props.update(this.props.student.id, this.state.name, this.state.email, this.state.gpa, this.state.schoolId);
  // }
  // catch(ex){
  //     console.log(ex);
  //     this.setState({ error: ex.response});
  // }   
}

// async deleteGame(game){
//   // so would rather have this in the store, and should redirect back to      
//   console.log(game)
//   await axios.delete(`/api/games/${game.id}`);
// };

  render(){
    const { game, destroy } = this.props;
    // console.log(this.props);
    const { location, finalScore, error } = this.state;
    const { onChange, onSave} = this;
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
            Location:  
            <input name='name' value={ location } onChange = { onChange }/>
            <br/>
            {/* this should only show up if game is done, start time past current time */}
            Final Score: 
            <input name='finalScore' value={ finalScore } onChange = { onChange }/>
            <br/>
            <button>SAVE</button>
          </form>
          {/* not quite sure how to deal with time at the moment but should be able to copy taylor */}
          <div className='container'>
            <h4>Date: { moment(game.dateAndTime).format('MMM D, YYYY') }</h4>
            <h4>Time: { moment(game.dateAndTime).format('h:mm a') }</h4>
            <h4>number of players: {game.users ? game.users.length : 0}</h4>
            <button onClick={()=>destroy(game)}>delete this game</button>
            
          </div>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

