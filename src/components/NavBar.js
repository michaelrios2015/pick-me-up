import React, {useState} from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { SideBarData } from './SideBarData'
import { IconContext } from 'react-icons'

const Navbar = (props) => {
  // we got location is a different way in class but could not replicate so used this
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar) 

  console.log(props.users.single);
  const user = props.users.single;

  return (
   
    <div className='bg-danger text-center'>
      
    <header>
        <h1 className='display-1 text-dark'>PICK ME UP</h1>
    </header> 
    {user.id ? (
    <div>
		
    <IconContext.Provider value={{ color: 'white'}}>
    <div className='navbar'>
    <Link className='menu-bars' > 
     <FaIcons.FaBars onClick={showSidebar}/> 
     </Link> 
    </div>
     <nav className= {sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link className='menu-bars'>
               <AiIcons.AiOutlineClose />
              </Link>
            </li>
             {SideBarData.map((item, index) => {
               return (
                 <li key={index} className ={item.cName}> 
                  <Link to={item.path}>
                    {item.icon}
                    <span>
                      {item.title}
                    </span>
                  </Link>
                 </li>
               )
             })}
          </ul> 
        </nav>
        </IconContext.Provider>
    
      <div className='nav nav-tabs justify-content-around'>
        <Link className='nav-link text-dark' to='/'>Home</Link>
			  <Link className='nav-link text-dark' to='/request'>Pick Up</Link>
			  <Link className='nav-link text-dark' to='/games'>Find a Game</Link>
			  <Link className='nav-link text-dark' to='/mygames'>My Games</Link>
        <button onClick={()=>localStorage.clear()}>logout</button>
      </div>
      </div>
      ) :
      (
        <Link className='nav-link text-dark' to="/login">Login</Link>
      )
      }
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
