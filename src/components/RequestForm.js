import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios'


const API_KEY = '2cnb57whnksvz6zk98c6wvf15'
const API_SECRET = '5wirepjikw5adgo7pc6jj42sts5x050covnxrpvo4dkvv8fld1'

const API_TOKEN = '49zH6hsPdt4lqmDwRRaoAvIfH'
const TOKEN_SECRET = 'QIPBB7rOW9pGAirEn-KXYpBnCRm3eXHFKzTl'


export class RequestForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { 

    }
  }
  async componentDidMount(){
    const courts =  (await axios.get(`https://data.cityofnewyork.us/resource/9wwi-sb8x.json?$$app_token=${API_TOKEN}&basketball=Yes`)).data
    console.log(courts)
  }
  render(){
    return(
      <div id='requestBox'>
        <h1>Pick Up a Game</h1>
        <h2>Pull name and display here</h2>
        <form>
          <label for='court'>Court:</label>
          <select>
            <option value='court1'>Court 1</option>
          </select>
          <label for='date'>Date:</label>
          <input type="date" id="time" name="time"/>
          <label for='time'>Time:</label>
          <input type="time" id="time" name="time" min="06:00" max="20:00" />
          <button>Pick Up!</button>
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