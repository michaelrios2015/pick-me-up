import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminUsers, GamesHosted } from '.';
import { loadUser } from '../store/';
import { Link, useLocation } from "react-router-dom";


class Home extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    //this.props.bootstrap();   
  }

  render(){    
    const { users } = this.props;
    // console.log(Object.values(users))
    // console.log(users.single)
    let user = users.single;
    // console.log(Object.values(users));
    return (
      <div >
        Hello User: { user.name }
        {/* <GamesHosted /> */}
        <center>
        <div id= 'pick-up'className='border text-center mb-3 home-hover' style={{ width: 275 + 'px' }} > 
        <Link className='nav nav-link text-dark card-body '  to='/request'>Pick Up</Link>
      </div>
      </center>
      <div className='border text-center mb-3 home-hover' style={{ width: 275 + 'px' }}> 
      <Link className='nav-link text-dark card-body' to='/games'>Find a Game</Link>
      </div>
      <div className='border text-center mb-3 home-hover' style={{ width: 275 + 'px' }}>
			<Link  className='nav-link text-dark card-body' to='/mygames'>My Games</Link>
      </div>
      </div>
    );
  }
}


const mapStateToProps = ({users}) => {
  return {users};
}


const mapDispatchToProps = (dispatch) => {
  
  return {
    
    bootstrap: ()=> {
      dispatch(loadUser(4));

    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

