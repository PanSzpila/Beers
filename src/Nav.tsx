import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import {Link} from "react-router-dom";

function Nav2() {
  return (
    <div>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container>
          <Link to="/">PiFko.pl</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <div style={{
                  display: "flex",
                  gap: "10px"
              }}>
                                <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/Shop">Shop</Link>
              </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Nav2;
