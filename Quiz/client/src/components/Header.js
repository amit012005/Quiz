import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser, FaHome, FaClipboardList, FaInfoCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import logo from "./logo.jpeg";
import "../App.css"; // Keep this if you have other global styles
import "../bootstrap.min.css";

function Header() {
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, []);

  const logoutHandler = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <header className="header">
      <Navbar bg="dark" variant="dark" expand="lg" className="compact-navbar">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <img
                src={logo}
                height="25"
                alt="LOGO"
                className="d-inline-block align-top"
              />
              <span className="ms-2 brand-text">ThinkTank</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link className="d-flex align-items-center">
                  <FaHome className="me-1" /> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/exams">
                <Nav.Link className="d-flex align-items-center">
                  <FaClipboardList className="me-1" /> Exams
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link className="d-flex align-items-center">
                  <FaInfoCircle className="me-1" /> About Us
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ms-auto">
              {user ? (
                <NavDropdown
                  title={
                    <span className="d-flex align-items-center">
                      <FaUser className="me-1" />
                      {user.name}
                    </span>
                  }
                  id="username"
                >
                  <NavDropdown.Item disabled className="d-flex align-items-center">
                    <FaUser className="me-1" />
                    {user.name}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler} className="d-flex align-items-center">
                    <FaSignOutAlt className="me-1" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="d-flex align-items-center">
                    <FaSignInAlt className="me-1" />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
