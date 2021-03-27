import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../store/';

//the plan is to make this into a generic admin user component, so an admin would see all the users 
//be able to click on them edit them delete them etc.  right now this is on hold  

export class AdminUsers extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.bootstrap();
   
  }

  render(){

    return (
        <div className='container'>
          <div className='header'>
            HELLO
          </div>
          <div className='sub-header'>

          </div>
        </div>
    );
  
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: ()=> {
      dispatch(loadUsers());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);

