import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const accessToken = localStorage.getItem("access");
  // const expirationTime = getAccessTokenExpiration();
  // && expirationTime > Date.now() / 1000
  const isLoggedIn = accessToken;
  console.log(isLoggedIn);

  return (
    <Navbar bg="info bg-opacity-25" variant="light" expand="lg">
      <Container>
        <Navbar.Brand>I-M DOC</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {isLoggedIn && (
              <>
                <Nav.Link>
                  <Link
                    className="text-decoration-none text-secondary fs-5"
                    to="/admin"
                  >
                    Admin
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    className="text-decoration-none text-secondary fs-5"
                    to="/receptionist"
                  >
                    Receptionist
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    className="text-decoration-none text-secondary fs-5"
                    to="/doctor"
                  >
                    Doctor
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    className="text-decoration-none text-secondary fs-5"
                    to="/pharmacist"
                  >
                    Pharmacist
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    className="text-decoration-none text-secondary fs-5"
                    to="/reports"
                  >
                    Reports
                  </Link>
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {!isLoggedIn && (
              <Nav.Link>
                <Link
                  className="text-decoration-none text-secondary fs-5"
                  to="/login"
                >
                  Login
                </Link>
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link>
                <Link
                  className="text-decoration-none text-secondary fs-5"
                  to="/logout"
                >
                  Logout
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
