import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MyStats, Home, RequestForm } from './components';

/**
 * COMPONENT
 */
class Routes extends Component {

  render() {

    return (
      <div>
          <Switch>
            <Route exact path='/home' component={ Home } />
            <Route exact path='/stats' component={ MyStats } />
            <Route exact path='/request' component={ RequestForm } />
            {/* <Route exact path='/account' component={ MyAccount } /> */}
            <Redirect to='/home' />
          </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return state
}

const mapDispatch = dispatch => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Routes)
