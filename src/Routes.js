import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { MyStats, Home, RequestForm, MyProfile, Login } from "./components";

/**
 * COMPONENT
 */
class Routes extends Component {
	// there was a router but I don't know how to use that router
	render() {
		// console.log(location)
		// console.log(history)
		return (
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/stats" component={MyStats} />
				<Route path="/request" component={RequestForm} />
				<Route exact path="/account" component={MyProfile} />
				<Route path="/" component={Home} />
				{/* <Route exact path='/account' component={ MyProfile } /> */}
				{/* <Route exact path='/account' component={ MyAccount } /> */}
				<Redirect to="/home" />
			</Switch>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return state;
};

const mapDispatch = (dispatch) => {
	return {};
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
