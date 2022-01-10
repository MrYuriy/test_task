import React from "react";
import AddNewApartment from "./AddNewApartModal";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  Button,
  Container,
  Form,
  FormControl,
  Navbar,
  Nav,
} from "react-bootstrap";

const Header = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid style={{ maxWidth: "90%" }}>
        <Navbar.Brand href="#">Homepage</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "300px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
          </Nav>

          <AddNewApartment />

          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
