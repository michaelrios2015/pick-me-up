import React,{useState} from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as IconName  from "react-icons/bs";

export const SideBarData = [
  
  {
    title: 'home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'mystats',
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
    title: 'account',
    path: '/account',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'logout',
    path: '/login',
    icon: <IconName.BsFillXCircleFill /> ,
    cName: 'nav-text'
  }
  
  
]