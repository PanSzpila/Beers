import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  const NavStyle = {
    color: "white",
  };

  return (
    <nav className="navbar navbar-expand-sm navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          PiFko.pl
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
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/shop">
                Shop
              </Link>
            </li>
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
