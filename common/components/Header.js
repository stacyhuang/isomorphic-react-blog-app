import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <div className="wrapper">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Blog</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <LinkContainer to="/draft">
              <NavItem>New Post</NavItem>
            </LinkContainer>
          </Nav>
        </div>
      </Navbar>
    )
  }
}

export default Header;
