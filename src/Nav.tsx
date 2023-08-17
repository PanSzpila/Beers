import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

function Nav2() {
  return (
    <div>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">PiFko.pl</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#shop">Shop</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Nav2;
