import React, { useState, useContext, useEffect } from "react";
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
  ProgressBar,
} from "react-bootstrap";
import { SettingContext } from "../../context/Context";

export default function PostForm() {
  const {
    user,
    timeStamp,
    deletePic,
    createPost,
    uploadPostsImg,
    allUsers,
    uploadProgress,
    maleAvatar,
    femaleAvatar
  } = useContext(SettingContext);

  // const userC = allUsers.find((u) => u.email === user.email);
  const userId = allUsers.find((u) => u.subId === user.sub);

  // useEffect(() => {
  //   getAllUsers()
  // }, [])

  const [showFormOfPost, setShowFormOfPost] = useState(false);
  const [postedModel, setPostedModel] = useState(false);
  const [text, setText] = useState(null);
  const [picture, setPicture] = useState("");
  const [privacy, setPrivacy] = useState("All");
  const [postTime, setPostTime] = useState(false);
  const [pictureName, setPictureName] = useState(null);
  const [progress, setProgress] = useState(false);
  const post = {
    userName: userId && userId.userName,
    subId: user.sub,
    likes: [],
    comments: [],
    postTime,
    privacy,
    text,
    picture,
    pictureName,
    anonymous:userId && userId.anonymous,
  };

  useEffect(() => {
    setPostTime(new Date());
  }, [text, picture, timeStamp]);
  const postHandler = () => {
    createPost(post);
    // console.log(post);
    setShowFormOfPost(false);
    setPostedModel(true);
  };
  const discardPostHandler = () => {
    pictureName && deletePic(pictureName, userId.subId, "post's_images");
    window.location.reload(true);
  };
  const deleteSelectedPic = () => {
    deletePic(pictureName, userId.subId, "post's_images");
    setPicture("");
    setPictureName(null);
    setProgress(false);
  };
  const uploadImgHandler = (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif"
    ) {
      console.log("ok to upload: " + file.name);
      uploadPostsImg(file, userId.subId, setPicture, setPictureName);
      setProgress(true);
    } else {
      alert("Only images are allowed");
    }
  };
  return (
    <div>
      <Container>
        <Card body>
          <Row>
            <Col xs={2}>
              <Form.Group className="mb-3">
                <Link to={`/profile`}>
                  <Image
                    roundedCircle
                    width="50 rem"
                    src={userId && userId.pic}
                  />
                </Link>
              </Form.Group>
            </Col>
            <Col xs={10}>
              <Form.Group className="mb-3">
                <Form.Control
                  onClick={() => setShowFormOfPost(true)}
                  placeholder={`what in your heart, ${
                    userId && userId.firstName
                  }?`}
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

      <Modal show={showFormOfPost} onHide={() => discardPostHandler()}>
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
                        src={
                          userId && userId.anonymous?userId.gender==="Male"?maleAvatar:femaleAvatar: userId.pic}
                      />
                    </Link>
                  </Col>
                  <Col>
                    <h6>{ userId && userId.anonymous?'Anonymous Post':
                    `${ userId.firstName} ${
                      userId && userId.lastName
                    }`}</h6>
                    <DropdownButton
                      onClick={(e) => setPrivacy(e.target.innerText)}
                      title={privacy}
                      id="bg-nested-dropdown"
                    >
                      <Dropdown.Item>All</Dropdown.Item>
                      <Dropdown.Item>Friends</Dropdown.Item>
                      <Dropdown.Item>Private</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </Row>
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="textarea">
              {privacy === "Private" && (
                <Form.Text className="text-muted">
                  Only you will see this post.
                </Form.Text>
              )}
              {privacy === "Friends" && (
                <Form.Text className="text-muted">
                  Only your friends will see this post.
                </Form.Text>
              )}
              {privacy === "All" && (
                <Form.Text className="text-muted">
                  All users can see this post.
                </Form.Text>
              )}
              <Form.Control
                onChange={(e) => setText(e.target.value)}
                as="textarea"
                placeholder={`what in your heart, ${
                  userId && userId.firstName
                }?`}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="photoLabel">
              <Form.Label>Share Photo</Form.Label>
            </Form.Group>
            {!progress && (
              <input
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                name="postPhoto"
                onChange={(e) => uploadImgHandler(e)}
              />
            )}
            {pictureName && <Image width={466} src={picture} />}
            {progress && (
              <ProgressBar
                animated={!uploadProgress === 100}
                now={uploadProgress}
              />
            )}
            {pictureName && (
              <Button onClick={() => deleteSelectedPic()}>Delete</Button>
            )}
            <hr />
            {/* {console.log(post)}
            {console.log(posts)} */}
            <Button
              disabled={!text && !pictureName}
              variant="primary"
              onClick={() => postHandler()}
            >
              Post
            </Button>
            {/* {console.log(uploadProgress >= 0 && uploadProgress < 99)} */}
            <Button variant="secondary" onClick={() => discardPostHandler()}>
              Discard
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={postedModel} onHide={() => setPostedModel(false)}>
        <Modal.Header>
          <Modal.Title>Posted !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your post has been uploaded successfully.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => window.location.reload(true)}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
