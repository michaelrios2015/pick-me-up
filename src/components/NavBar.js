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
        <Link className='nav-link' to='/stats'>My Stats</Link>
        <Link className='nav-link' to='/account'>My Account</Link>
        <Link className='nav-link' to='/'>Logout</Link>
      
      </div>
      </div>
    )
  }
	// we got location is a different way in class but could not replicate so used this
// 	console.log(process.env)
// 	let pathname = useLocation().pathname;
// 	return (
// 		<div>
// 			<header>
// 				<h1>PICK ME UP</h1>
// 			</header>
// 			<nav>
// 				<Link to="/" className={pathname === "/" ? "selected" : ""}>
// 					Home
// 				</Link>
// 				<Link
// 					to="/request"
// 					className={pathname === "/request" ? "selected" : ""}
// 				>
// 					Pick Up
// 				</Link>
// 				<Link to="/games" className={pathname === "/games" ? "selected" : ""}>
// 					Find a Game
// 				</Link>
// 				<Link to="/stats" className={pathname === "/stats" ? "selected" : ""}>
// 					My Stats
// 				</Link>
// 				<Link
// 					to="/account"
// 					className={pathname === "/account" ? "selected" : ""}
// 				>
// 					My Account
// 				</Link>
// 				<Link to="/login">Login</Link>
// 			</nav>
// 		</div>
// 	);
// };

const mapState = (state) => {
	return state;
};
const mapDispatch = (dispatch) => {
	return {};
};

export default connect(mapState, mapDispatch)(Navbar);
