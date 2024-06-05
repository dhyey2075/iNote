import React,{useEffect, useContext, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import noteContext from "./../context/notes/noteContext";
const Navbar = () => {
  let con = useContext(noteContext);
  let { token, setToken } = con

  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-light white m-0 p-0 border border-dark" style={{ width: '100vw' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"bg-primary":""}`} aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"bg-primary":""}`} to="/about">
                  About
                </Link>
              </li>
              {token==="" && (<>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/signup"?"bg-primary":""}`} to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/login"?"bg-primary":""}`} to="/login">
                  Login
                </Link>
              </li>
              </>)}
              {token!=="" && (<>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"bg-primary":""}`} to="/login">
                  Logout
                </Link>
              </li>
              </>)}
              
            </ul> 
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
