import React from "react";
import * as bootstrap from "bootstrap";
import "./custom.scss";
import { Link } from "react-router-dom";

function Nav() {
  const NavStyle = {
    color: "white",
  };

  return (
    <nav className="navbar navbar-expand-sm navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/">
          <h5 className="navbar-brand" href="#">
            PiFko.pl
          </h5>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to="/">
              <li className="nav-item nav-link active">Home</li>
            </Link>
            <Link to="/about">
              <li className="nav-item nav-link active">About</li>
            </Link>
            <Link to="/shop">
              <li className="nav-item nav-link active">Shop</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>

    /**     <nav className="navbar navbar-dark bg-dark">
      <Link style={NavStyle} to="/">
        <h3>Logo</h3>
      </Link>

      <ul className="nav-links">
        <Link style={NavStyle} to="/">
          <h3>Home</h3>
        </Link>
        <Link style={NavStyle} to="/about">
          <li>About</li>
        </Link>
        <Link style={NavStyle} to="/shop">
          <li>Shop</li>
        </Link>
      </ul>
    </nav> */
  );
}

export default Nav;
