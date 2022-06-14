import React from 'react'
import { Link, withRouter } from 'react-router-dom';

const currentTab = (history, path) => {
  if(history.location.path === path){
    return {color:"#FFFFFF"}
  }else{
    return {color:"#d1d1d1"}
  }
}
const Nav = () => {
  return (
    <div>
      <ul className="nav nav-tabs bg-light">
        <li className="nav-item text-dark">
          <Link className="nav-link links" to="/" style={{"textDecoration":'none'}}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/">Admin Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/">Sign up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/">Sign out</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/">Sign In</Link>
        </li>
      </ul>
    </div>
  )
}

export default Nav