import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import {Router, BrowserRouter} from 'react-router-dom';
import { NavBar } from './components';
import Routes from './Routes';
import history from './history';
import store from './store/index';
import { loadRequests, loadRequestsForUser, loadGamesForUser, loadGamesOrWaitListForUser, loadGamesDataForUser, loadGames, loadUsers } from './store/';


class _App extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.bootstrap();
   
  }


  //this works fine now need to figure out how to put my data into Material UI table and add search
  render(){
    return (
      <div>
        <NavBar />
        <Routes />
      </div>
    );
  }
}

// not sure if I need either of these maybe if I want length??
const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    
    bootstrap: ()=> {
      dispatch(loadUsers());
      dispatch(loadRequestsForUser(4));
      dispatch(loadGamesOrWaitListForUser(4));
      dispatch(loadRequests());
      dispatch(loadGames());
      dispatch(loadGamesDataForUser(4));
    }
  };
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

render(
  <Provider store = {store}>
    <Router history = {history}>
      <App />
    </Router>
  </Provider>, 
  document.querySelector('#root')
);
