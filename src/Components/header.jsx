import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsFilePost } from 'react-icons/bs';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>Crypto Exchange</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
          <div style={{ position: 'relative', display: 'inline-block' }}>
          <BsFilePost size={37} style={{color: 'darkolivegreen'}}/>
        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
