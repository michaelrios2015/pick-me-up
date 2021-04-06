import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminUsers, GamesHosted } from '.';
import { loadUser } from '../store/';

class Home extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    // this.props.bootstrap();
   
  }

  render(){
    const { users } = this.props;
    // console.log(Object.values(users))
    // console.log(users.single)
    let user = users.single;
    // console.log(Object.values(users));
    return (
      <div >
        <p>Hello User!! { user.name }</p>
        <p>Welcome to Pick Me Up!!!</p>
        {/* <GamesHosted /> */}
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

