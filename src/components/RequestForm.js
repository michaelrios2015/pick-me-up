import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios'




const API_TOKEN = '49zH6hsPdt4lqmDwRRaoAvIfH'


export class RequestForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      zipcode: '',
      showCourts: false,
      courts: [],
      chosenCourt: '',
      date: '',
      time: ''
    }
    this.handleInputs = this.handleInputs.bind(this)
    this.courtSubmit = this.courtSubmit.bind(this)
  }
  async componentDidMount(){
  
  }

  handleInputs(ev){
    const {name, value} = ev.target
    this.setState({[name] : value})
    console.log(this.state)
  }
  async courtSubmit(ev){
    ev.preventDefault()
    const courts =  (await axios.get(`https://data.cityofnewyork.us/resource/9wwi-sb8x.json?$$app_token=${API_TOKEN}&basketball=Yes&zipcode=${this.state.zipcode}`)).data
    this.setState({courts: courts, showCourts: true})
  }
  render(){
    console.log(this.state)

    return(
      <div id='requestBox'>
        <h1>Pick Up a Game</h1>
        <h2>Pull name and display here</h2>
        <form>
          {!this.state.showCourts ? (
            <div>
              <label for='zipcode'>Zipcode:</label>
              <input type="text" id="zipcode" name="zipcode" onChange={this.handleInputs}/>
              <button onClick={this.courtSubmit}>Find Courts</button>
            </div>
          ) : (
            <div>
              <label for='court'>Court:</label>
              <select onChange={this.handleInputs} name='chosenCourt'>
                <option>Select One</option>
                {this.state.courts.map((court, idx)=>{
                  return(<option value={idx} >Court: {idx +1}</option>)
                })}
              </select>
              <label for='date'>Date:</label>
              <input type="date" id="time" name="time" onChange={this.handleInputs}/>
              <label for='time'>Time:</label>
              <input type="time" id="time" name="time" min="06:00" max="20:00" onChange={this.handleInputs}/>
              <button>Pick Up!</button>
            </div>
          )}
        </form>
      </div>
    )
  }
}

const mapState = ({  }) => {
  return {
   
  }
}

const mapDispatch = dispatch => {
  return {

  }
}

export default connect(mapState, mapDispatch)(RequestForm)