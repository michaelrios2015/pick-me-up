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

}

const mapState = ({ books, auth, singleUser }) => {
  return {
   
  }
}

const mapDispatch = dispatch => {
  return {

  }
}

export default connect(mapState, mapDispatch)(Navbar)