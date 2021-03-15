import React from 'react';
import {connect} from 'react-redux';

export class RequestForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { 

    }
  }

  componentDidMount(){
   
  }
  render(){
    return(
      <div id='requestBox'>
        <h1>Pick Up a Game</h1>
        <form>
          <label htmlFor='court'>Court:</label>
          <select>
            <option value='court1'>Court 1</option>
          </select>
          <label htmlFor='date'>Date:</label>
          <input type="date" id="time" name="time"/>
          <label htmlFor='time'>Time:</label>
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