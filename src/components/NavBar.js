import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { SideBarData } from './SideBarData'
import { IconContext } from 'react-icons'

import { clearUser } from "../store/users";
import { useHistory } from "react-router";


const Navbar = (props) => {
  // we got location is a different way in class but could not replicate so used this
  const [sidebar, setSidebar] = useState(false)
  
  
    

  const showSidebar = () => setSidebar(!sidebar) 
  
  // console.log(props.users.single);
  const user = props.users.single;
  const history = useHistory();
  // console.log(history)

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
     <FaIcons.FaBars onClick={()=>showSidebar()}/> 
     </Link> 
    </div>
     <nav className= {sidebar ? 'nav-menu active' : 'nav-menu'}>       
        <ul className='nav-menu-items' onClick={()=>showSidebar()}>
          <li className='navbar-toggle'>
            <Link className='menu-bars'>
               <AiIcons.AiOutlineClose />
              </Link>              
            </li>
            <Link> <span class="nav-text text-white">  {props.users.single.name} </span></Link>
            <br />
            <Link> <img style={{ width:"50px" }} src={props.users.single.photo} alt="profile-image"></img> </Link>
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
    

      <div className=' nav nav-tabs justify-content-around'>
        <Link className='nav-link text-dark' to='/'>Home</Link>
        <button className = "nav-link btn btn-danger text-dark" onClick={()=>props.logout(history)}>logout</button>
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

const mapState = (state ) => {
 	return state;
};
const mapDispatch = (dispatch) => {
	return {    
    logout(history) {
      // console.log(history)
      localStorage.clear();
      dispatch(clearUser());
      history.push('/');
    }
  }   

};


export default connect(mapState, mapDispatch)(Navbar);
