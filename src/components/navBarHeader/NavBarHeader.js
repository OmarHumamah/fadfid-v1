import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Stack from "react-bootstrap/Stack";
import Settings from "../settings/Settings";
import LogoutButton from "../login/LogoutButton";

export default function NavBarHeader(props) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div>
      <Container fluid>
        <Stack direction="horizontal" gap={3}>
          <div className="bg-light border">
            <Link to="/">
              <h1>FadFid</h1>
            </Link>
          </div>
          <div className="bg-light border ms-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder={"Search"}
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </div>
          <div className="bg-light border">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  <Link to="/profile">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link onClick={() => setShowSettings(true)}>Settings</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <LogoutButton />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        </Stack>
      </Container>
      <Settings show={showSettings} handleShow={setShowSettings} />
      <nav></nav>
    </div>
  );
}
