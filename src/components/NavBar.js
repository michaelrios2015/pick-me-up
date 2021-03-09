import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.state = { 

    }
  }

  componentDidMount(){
   
  }
  render(){
    return(
      <div>
        <Link to='/'>PickMeUp</Link>
        <Link to='/request'>Pick Up</Link>
        <Link to='/stats'>My Stats</Link>
        <Link to='/account'>My Account</Link>
        <Link to='/'>Logout</Link>
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

export default connect(mapState, mapDispatch)(Navbar)