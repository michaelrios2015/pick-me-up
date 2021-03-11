import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component{

  render(){

    return (
      <div>
        Pickup Sports made easy!
      </div>
    );
  }
}

const mapState = state => {
  return state
}


export default connect(mapState)(Home);

