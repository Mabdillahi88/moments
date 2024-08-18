import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";  // Import NavLink from react-router-dom
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" exact>
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link as={NavLink} to="/" exact>
              <i className="fas fa-home"></i> Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/signin">
              <i className="fas fa-sign-in-alt"></i> Sign in
            </Nav.Link>
            <Nav.Link as={NavLink} to="/signup">
              <i className="fas fa-user-plus"></i> Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
