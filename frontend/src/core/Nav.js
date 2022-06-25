import React from "react";
import { Link, withRouter, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.path === path) {
    return { color: "#FFFFFF" };
  } else {
    return { color: "#d1d1d1" };
  }
};
const Nav = () => {
  const history = useNavigate();
  return (
    <div>
      <ul className="nav nav-tabs bg-light">
        <li className="nav-item text-dark">
          <Link
            className="nav-link links"
            to="/"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/cart">
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links" to="/admindashboard">
            Admin Dashboard
          </Link>
        </li>
        {!isAuthenticated() && (
          <>
            {" "}
            
            <li className="nav-item">
              <Link className="nav-link links" to="/signup">
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link links" to="/signin">
                Sign In
              </Link>
            </li>
            
          </>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            {/* <Link className="nav-link links" to="/signout">Sign out</Link> */}
            <span
              className="nav-link links"
              onClick={() =>
                signout(() => {
                  history("/");
                })
              }
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Nav;
