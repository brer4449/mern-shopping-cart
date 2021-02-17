import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Pro Shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>Cart
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
