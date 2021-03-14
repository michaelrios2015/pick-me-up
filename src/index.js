import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import {HashRouter, Router, BrowserRouter} from 'react-router-dom';
import { NavBar } from './components';
import Routes from './Routes';
import history from './history';
import store from './store/index';

class _App extends Component{
  constructor(){
    super();
    this.state = {};
  }

  //hashrouter has the most functionality at the moment but has the hash that looks
  // slightly funny.  Will use this for the moment
  render(){
    return (
      <HashRouter>
      <div>
        <NavBar />
        <Routes />
      </div>
     </HashRouter>
    );
  }
}

// not sure if I need either of these maybe if I want length??
const mapStateToProps = (state) => {
  return state;
}


const App = connect(mapStateToProps)(_App);

//so this just takes care of rendering and should be passing history but does not seem too

// console.log(history)

//the router should have worked but does not and I have no way of testing it 
// so we are using the simplier hashrouter 
render(
  <Provider store = {store}>
    {/* <Router history = {history}> */}
      <App />
    {/* </Router> */}
  </Provider>, 
  document.querySelector('#root')
);

