import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Card } from "react-bootstrap";
export default function PostForm() {
  const [showFormOfPost, setShowFormOfPost] = useState(false);
  return (
    <div>
      <Container>
        <Card body>
          <Row>
            <Col xs={2}>
              <Form.Group className="mb-3">
                <Link to="/profile">
                  <Image
                    roundedCircle
                    width="50 rem"
                    src="https://thumbs.dreamstime.com/b/anonymous-business-man-profile-picture-white-background-57594504.jpg"
                  />
                </Link>
              </Form.Group>
            </Col>
            <Col xs={10}>
              <Form.Group className="mb-3">
                <Form.Control
                  onClick={() => setShowFormOfPost(true)}
                  placeholder="Share . . ."
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Button onClick={() => setShowFormOfPost(true)} variant="light">
                Image
              </Button>
            </Col>
            <Col>
              <Button onClick={() => setShowFormOfPost(true)} variant="light">
                Thought
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>

      <Modal show={showFormOfPost} onHide={() => setShowFormOfPost(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Post your idea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="label">
              <Form.Label>
                <Row>
                  <Col>
                    <Link to="/profile">
                      <Image
                        roundedCircle
                        width="50 rem"
                        src="https://thumbs.dreamstime.com/b/anonymous-business-man-profile-picture-white-background-57594504.jpg"
                      />
                    </Link>
                  </Col>
                  <Col>
                    <p>User name</p>
                    <DropdownButton title="Dropdown" id="bg-nested-dropdown">
                      <Dropdown.Item eventKey="1">friends</Dropdown.Item>
                      <Dropdown.Item eventKey="2">all</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Private</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </Row>
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="textarea">
              <Form.Control as="textarea" placeholder="what in your heart?" />
              <Form.Text className="text-muted">
                Will change based on the privacy setting.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="photoLabel">
              <Form.Label>Share Photos</Form.Label>
            </Form.Group>
            <input type="file" />
            <hr />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
