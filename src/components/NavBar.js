import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  // we got location is a different way in class but could not replicate so used this
  let pathname = useLocation().pathname;
  return (
    <div className='bg-danger text-center'>
    <header>
        <h1 className='display-1 text-dark'>PICK ME UP</h1>
    </header>
    <div className='nav nav-tabs justify-content-around'>
			<Link className='nav-link' to='/'>Home</Link>
			<Link className='nav-link' to='/request'>Pick Up</Link>
			<Link className='nav-link' to='/games'>Find a Game</Link>
			<Link className='nav-link' to='/mygames'>My Games</Link>
			<Link className='nav-link' to='/stats'>My Stats</Link>
			<Link className='nav-link' to='/account'>My Account</Link>
			<Link className='nav-link' to="/login">Login</Link>
			<Link className='nav-link' to='/'>Logout</Link>
		
		</div>
		</div>
	)
}

const mapState = (state) => {
	return state;
};
const mapDispatch = (dispatch) => {
	return {};
};

export default connect(mapState, mapDispatch)(Navbar);
