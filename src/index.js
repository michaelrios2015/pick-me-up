import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import {Router} from 'react-router-dom';
import store from './store';
import { NavBar } from './components';
import Routes from './Routes';
import { loadUsers, loadRequests, loadGames } from './reducers';
import history from './history';

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
    // console.log(this.props)
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
      dispatch(loadRequests());
      dispatch(loadGames());
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
