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
  }
  componentDidMount(){
    // this.props.loadUser()
    console.log(COURT_API)
  }

  handleInputs(ev){
    const {name, value} = ev.target
    this.setState({[name] : value})
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
    const courtidx = this.state.chosenCourt
    console.log(this.state.courts[courtidx].the_geom)
    const game = {
      location: this.state.courts[courtidx].objectid,
      // time: new Date(this.state.time).getTime(),
      dateAndTime: this.state.date,
      open: true,
      // using null values to determine that no winner has been declared so commited these out 
      // winner: 'tbd',
      // finalScore: 'tbd',
      done: false,
      host: 13, //need to change to user.id
      zipcode: this.state.zipcode,
      long:`${this.state.courts[courtidx].the_geom.coordinates[0][0][0][0]}`,
      lat: `${this.state.courts[courtidx].the_geom.coordinates[0][0][0][1]}`,
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
  render(){
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
                  <select onChange={this.handleInputs} name='chosenCourt'>
                    <option>Select One</option>
                    {this.state.courts.map((court, idx)=>{
                      return(<option key={idx} value={idx} >Court: {court.objectid}</option>)
                    })}
                  </select>
                  {/* Jason- changed Game model to take date and time as game.dateAndTime and use that to calculate milliseconds for game.time so we can expire old games */}
                  <label htmlFor='date'>Date and Time:</label>
                  <input type="dateTime-local" id="date" name="date" onChange={this.handleInputs}/>
                  {/* <label htmlFor='time'>Time:</label>
                  <input type="datetime-local" id="time" name="time" min="06:00" max="20:00" onChange={this.handleInputs}/> */}
                  <button className='btn btn-primary' onClick={this.submitRequest}>Pick Up!</button>
                </div>
                <div className='courtMap'>
                  <CourtMap courts={this.state.courts}/>
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