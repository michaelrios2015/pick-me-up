import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MyStats, Home, RequestForm } from './components';

/**
 * COMPONENT
 */
class Routes extends Component {

  render() {

    return (
      <Switch>
        <Route path='/stats' component={ MyStats } />
        <Route path='/request' component={ RequestForm } />
        <Route path='/' component={ Home } />
        {/* <Route exact path='/account' component={ MyAccount } /> */}
        <Redirect to='/home' />
      </Switch>
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

export default withRouter(connect(mapState, mapDispatch)(Routes))
