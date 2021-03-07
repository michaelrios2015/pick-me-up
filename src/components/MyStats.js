import React, { Component } from 'react';
import { connect } from 'react-redux';

export class MyStats extends Component{
  constructor(){
    super();
    this.state = {};
  }

  render(){
    return (
        <div className='container'>
          <div className='header'>
            <h1>My Stats</h1>
          </div>
          <div className='sub-header'>
            <div>
              <h3>Wins:</h3>
            </div>
            <div>
              <h3>Loses:</h3>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = ({ users, games, requests }) => {
  console.log(users)
  console.log('games', games)
  console.log('requests', requests)
  return {};
}


export default connect(mapStateToProps)(MyStats);

