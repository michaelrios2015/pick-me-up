import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {createRequest} from '../store/requests'
import {loadUser} from '../store/users'
import CourtMap from './CourtMap'

const COURT_API = process.env.COURT_API
// git console.log(process.env.COURT_API);

export class RequestForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      zipcode: '',
      showCourts: false,
      courts: [],
      chosenCourt: null,
      date: '',
      time: '',
      finished: false
    }
    this.handleInputs = this.handleInputs.bind(this)
    this.courtSubmit = this.courtSubmit.bind(this)
    this.submitRequest = this.submitRequest.bind(this)
    this.handleMarkers = this.handleMarkers.bind(this)
    this.guestUser = this.guestUser.bind(this);
  }
 
  handleInputs(ev){
    const {name, value} = ev.target
    this.setState({[name] : value})
  }
  
  handleMarkers(court){
    this.setState({chosenCourt: court.objectid})
  }
  async courtSubmit(ev){
    ev.preventDefault()
    const courts =  (await axios.get(`https://data.cityofnewyork.us/resource/9wwi-sb8x.json?$$app_token=${COURT_API}&basketball=Yes&zipcode=${this.state.zipcode}`)).data
    console.log(courts)
    this.setState({courts: courts, showCourts: true})
  }
  async submitRequest(ev){
    ev.preventDefault()
    const user = this.props.user
    // const user = (await axios.get('/api/users/13')).data
    const court = this.state.courts.filter((court)=> court.objectid === this.state.chosenCourt)
    console.log(court[0])
    const game = {
      location: this.state.chosenCourt,
      // time: new Date(this.state.time).getTime(),
      dateAndTime: this.state.date,
      open: true,
      // using null values to determine that no winner has been declared so commited these out 
      // winner: 'tbd',
      // finalScore: 'tbd',
      done: false,
      host: user.id, //need to change to user.id
      zipcode: this.state.zipcode,
      long:`${court[0].the_geom.coordinates[0][0][0][0]}`,
      lat: `${court[0].the_geom.coordinates[0][0][0][1]}`,
    }
    const alerts = []
    for(const [key,val] of Object.entries(game)){
        if(val === ''){
            alerts.push(key)
        }
    }
    if(alerts.length > 0){
        const string = alerts.reduce((acc,item)=>{
            acc += `${item}\n`
            return acc
        },'Please fill out the following:\n')
        alert(string)
    }
    if(alerts.length === 0){
      console.log(game)
      const newGame = (await axios.post('/api/games', game)).data
      //added TEAM just assinging first player to TEAM A, hardcoded in user 13 for testing purposes
      // await axios.post('/api/user_games', { gameId: newGame.id, userId: 13, team: 'TEAM A' });
      await axios.post('/api/user_games', { gameId: newGame.id, userId: user.id, team: 'TEAM A' });
      this.setState({finished: true})

  }

  }
  guestUser(ev){
    ev.preventDefault()
    const user = this.props.user;
    // const user = (await axios.get('/api/users/13')).data
    const court = this.state.courts.filter((court)=> court.objectid === this.state.chosenCourt)
    console.log(court[0])
    const game = {
      location: this.state.chosenCourt,
      // time: new Date(this.state.time).getTime(),
      dateAndTime: this.state.date,
      open: true,
      // using null values to determine that no winner has been declared so commited these out 
      // winner: 'tbd',
      // finalScore: 'tbd',
      done: false,
      host: user.id, //need to change to user.id
      zipcode: this.state.zipcode,
      long:`${court[0].the_geom.coordinates[0][0][0][0]}`,
      lat: `${court[0].the_geom.coordinates[0][0][0][1]}`,
    }
    const alerts = []
    for(const [key,val] of Object.entries(game)){
        if(val === ''){
            alerts.push(key)
        }
    }
    if(alerts.length > 0){
        const string = alerts.reduce((acc,item)=>{
            acc += `${item}\n`
            return acc
        },'Please fill out the following:\n')
        alert(string)
    }
    if(alerts.length === 0){
      console.log(game)
    }
    this.props.history.push('/signup')
    localStorage.setItem('newGame', JSON.stringify(game));
    console.log('hi');


  }
  render(){
    const { user } = this.props;
    if(!this.state.finished){
      return(
        <div id='requestBox' className='container justify-content-center' >
          <h1>Pick Up a Game</h1>
          <hr></hr>
          <form>
            {!this.state.showCourts ? (
              <div className='form-group'>
                <label htmlFor='zipcode'>Zipcode:</label>
                <input type="text" id="zipcode" name="zipcode" className='form-control' onChange={this.handleInputs}/>
                <button type='submit' className='btn btn-primary' onClick={this.courtSubmit}>Find Courts</button>
              </div>
            ) : (
              <div className='courtFinder' >
                <div className= 'courtForm' >
                  <label htmlFor='court'>Court:</label>
                  <select onChange={this.handleInputs} name='chosenCourt' >
                    {this.state.chosenCourt ? (
                      <option value={this.state.chosenCourt} >Court: {this.state.chosenCourt}</option>
                    ): (
                      <option>Select One</option>
                    )}
                    {this.state.courts.map((court, idx)=>{
                      if(court.objectid === this.state.chosenCourt){
                        return
                      }else{
                        return(<option key={idx} value={court.objectid} >Court: {court.objectid}</option>)
                      }
                    })}
                  </select>
                  {/* Jason- changed Game model to take date and time as game.dateAndTime and use that to calculate milliseconds for game.time so we can expire old games */}
                  <label htmlFor='date'>Date and Time:</label>
                  <input type="dateTime-local" id="date" name="date" onChange={this.handleInputs}/>
                  {/* <label htmlFor='time'>Time:</label>
                  <input type="datetime-local" id="time" name="time" min="06:00" max="20:00" onChange={this.handleInputs}/> */}
                  { user.id ? 
                    ( <div>
                        <button className='btn btn-primary' onClick={this.submitRequest}>Pick Up!</button>
                      </div> ) : (
                        <button className='btn btn-primary' onClick={this.guestUser}>Sign up for an account</button>
                      )
                  }
                </div>
                <div className='courtMap'>
                  <CourtMap courts={this.state.courts} handleMarkers={this.handleMarkers}/>
                </div>
              </div>
            )}
          </form>
        </div>
      )
    }else{
      return(
        <div>
          <h1>Game Created!</h1>
        </div>
      )
    }
  }
}


const mapState = ({ users }) => {
  return {
    user: users.single
  }
};

const mapDispatch = dispatch => {
  return {
    createRequest: (request)=> dispatch(createRequest(request)),
    loadUser: ()=>dispatch(loadUser())
  }
}

export default connect(mapState, mapDispatch)(RequestForm)