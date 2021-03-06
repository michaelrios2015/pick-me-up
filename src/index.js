import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './store';

class _App extends Component{
  constructor(){
    super();
    this.state = {};
  }



  //this works fine now need to figure out how to put my data into Material UI table and add search
  render(){
    return (
        <div>
          hi
          (adding this message for testing purposes)
        </div>
    );
  }
}

// not sure if I need either of these maybe if I want length??
const mapStateToProps = (state) => {
  return state;
}


const App = connect(mapStateToProps, null)(_App);

render(<Provider store = {store}><App /></Provider>, document.querySelector('#root'));
