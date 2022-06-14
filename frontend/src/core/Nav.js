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
          <Link className="nav-link links" to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/admindashboard">Admin Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/signup">Sign up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/signin">Sign In</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/signout">Sign out</Link>
        </li>

      </ul>
    </div>
  )
}

export default Nav