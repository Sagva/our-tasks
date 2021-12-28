import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuthContext } from "../contexts/AuthContext";
import logoName from "../assets/svg/logoName.svg";
import { NavDropdown } from "react-bootstrap";

const Navigation = () => {
  const { currentUser } = useAuthContext();
  return (
    <Navbar expand="md">
      <Container>
        <Link to={`/`} className="navbar-brand">
          <img src={logoName} alt="logo" style={{ width: 150 }} />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser && (
              <>
                <NavDropdown
                  variant="dark"
                  title={currentUser.displayName || currentUser.email}
                  id="basic-nav-dropdown"
                >
                  {/* <NavLink to={`/update-profile`} className="dropdown-item">
                    Update Profile
                  </NavLink>

                  <NavDropdown.Divider /> */}
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
