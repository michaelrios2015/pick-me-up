import React,{useState} from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as IconName  from "react-icons/bs";

export const SideBarData = [
  
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'MyStats',
    path: '/stats',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'GamesHosted',
    path: '/gameshosted',
    icon: <AiIcons.AiFillDatabase /> ,
    cName: 'nav-text'
  },
  {
    title: 'Account',
    path: '/account',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/login',
    icon: <IconName.BsFillXCircleFill /> ,
    cName: 'nav-text'
  }
  
  
]