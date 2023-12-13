import { NavLink as RouterNavLink } from "react-router-dom";
// import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import "./styles.css";

import {
  Container,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";


const NavBar = () => {
  const { isUserLoggedIn, logout } = useAuth();

  // useEffect(() => {
  //   const checkUserLoggedIn = async () => {
  //     const token = localStorage.getItem('token');
  //     setIsUserLoggedIn(!!token);
  //   };

  //   checkUserLoggedIn();
  // }, []);

  return (
    <Container className="nav-container">
      <h1 className="company-name">FundHelp</h1>
      <Nav className="nav-items">
        <NavItem>
          <NavLink
            tag={RouterNavLink}
            to="/"
            exact
            activeClassName="router-link-exact-active"
          >
            <span className="home">Home</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            tag={RouterNavLink}
            to="/about"
            exact
            activeClassName="router-link-exact-active"
          >
            About
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            tag={RouterNavLink}
            to="/donate"
            exact
            activeClassName="router-link-exact-active"
          >
            Donate
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            tag={RouterNavLink}
            to="#"
            exact
            activeClassName="router-link-exact-active"
          >
            Contact
          </NavLink>
        </NavItem>
      </Nav>
      <Nav className="nav-items">
        <NavItem>
          {isUserLoggedIn ? (
            <NavLink
              tag={RouterNavLink}
              to="/profile"
              exact
              activeClassName="router-link-exact-active"
            >
              <span className="home">Profile</span>
            </NavLink>

          ) : (

            <NavLink
              tag={RouterNavLink}
              to="/login"
              exact
              activeClassName="router-link-exact-active"
            >
              <span className="home">Login/SignUp</span>
            </NavLink>

          )}
          </NavItem>
          <NavItem>
          {isUserLoggedIn && <NavLink
            tag={RouterNavLink}
            to="#"
            exact
            activeClassName="router-link-exact-active"
            onClick={()=>logout()}
          >
            Logout
          </NavLink>
          }
        </NavItem>
      </Nav>
    </Container>
  );
};

export default NavBar;
