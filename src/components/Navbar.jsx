import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuthContext } from "../contexts/AuthContext";
import logoName from "../assets/svg/logoName.svg";
import user from "../assets/svg/user.svg";
import { NavDropdown } from "react-bootstrap";

const Navigation = () => {
  const { currentUser } = useAuthContext();
  return (
    <Navbar expand="sm">
      <Container>
        <Link
          to={currentUser ? "/projects" : "/login"}
          className="navbar-brand"
        >
          <img src={logoName} alt="logo" style={{ width: 150 }} />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser && (
              <>
                <NavDropdown
                  title={
                    <span className="pull-left">
                      <img
                        className="thumbnail-image me-2"
                        src={user}
                        alt="user pic"
                      />

                      {currentUser.displayName || currentUser.email}
                    </span>
                  }
                  id="basic-nav-dropdown"
                  className="bg-light rounded font-weight-bold px-2 py-1"
                >
                  <NavLink to={`/logout`} className="dropdown-item">
                    Log Out
                  </NavLink>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
