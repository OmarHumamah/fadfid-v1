import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Image,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Modal,
  Card,
} from "react-bootstrap";
import { SettingContext } from "../../context/Context";

export default function PostForm() {
  const {user, posts, setPosts } = useContext(SettingContext)
  const [showFormOfPost, setShowFormOfPost] = useState(false);

  const [text, setText] = useState("");
  const [picture, setPicture] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [privacy, setPrivacy] = useState("All");


  const  post = {
    userName : user.name,
    userPic : user.picture,
    privacy,
    text,
    picture,
    likes,
    comments,
  }
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
                    src={user.picture}
                  />
                </Link>
              </Form.Group>
            </Col>
            <Col xs={10}>
              <Form.Group className="mb-3">
                <Form.Control
                  onClick={() => setShowFormOfPost(true)}
                  placeholder={`what in your heart, ${user.given_name}?`}
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
                        src={user.picture}
                      />
                    </Link>
                  </Col>
                  <Col>
                    <h6>{user.name}</h6>
                    <DropdownButton onClick={e=>setPrivacy(e.target.innerText)} title={privacy} id="bg-nested-dropdown">
                      <Dropdown.Item >All</Dropdown.Item>
                      <Dropdown.Item >Friends</Dropdown.Item>
                      <Dropdown.Item >Private</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </Row>
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="textarea">
              {
                privacy==="Private" &&
              <Form.Text className="text-muted">
                Only you will see this post.
              </Form.Text>
              }
              {
                privacy==="Friends" &&
              <Form.Text className="text-muted">
                Only your friends will see this post.
              </Form.Text>
              }
              {
                privacy==="All" &&
              <Form.Text className="text-muted">
                All users can see this post.
              </Form.Text>
              }
              <Form.Control onChange={ e => setText(e.target.value)} as="textarea" placeholder={`what in your heart, ${user.given_name}?`} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="photoLabel">
              <Form.Label>Share Photo</Form.Label>
            </Form.Group>
            <input type="file" name="postPhoto" onChange={e=> console.log(e.target.files)} />
            <hr />
            {/* {console.log(post)}
            {console.log(posts)} */}
            <Button variant="primary" onClick={()=>setPosts([post,...posts])}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
