import { React, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

import logo from "./logo.jpeg";
import "../App.css";
import "../bootstrap.min.css";
import { useUser } from "../context/userContext";

function Header() {
  const userdata = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(userdata);
  }, []);
  const logoutHandler = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <header
      style={{
        backgroundColor: "#7840a8",
      }}
    >
      <Navbar bg="purple" variant="dark">
        <Container>
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Navbar.Brand>
                <img
                  src={logo}
                  // width="30"
                  left="0"
                  height="34"
                  // className="d-inline-block align-top"
                  alt="LOGO"
                />
                <span style={{ fontSize: "1.5rem", marginLeft: "0.3rem" }}>
                  ThinkTank
                </span>
              </Navbar.Brand>
            </LinkContainer>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>
                  <span style={{ fontSize: "1rem" }}>Home</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer className="nav-link" to="/exams">
                <Nav.Link>
                  <span style={{ fontSize: "1rem" }}>Exams</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>
                  <span style={{ fontSize: "1rem" }}>About us</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className="ml-auto" style={{ fontSize: "1rem" }}>
              {user ? (
                <NavDropdown title={user.name} id="username">
                  <NavDropdown.Item>
                    <span style={{ fontSize: "1rem" }}>{user.name}</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <span style={{ fontSize: "1rem" }}>Logout</span>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>
                    <span style={{ fontSize: "1rem" }}>Sign In</span>
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
