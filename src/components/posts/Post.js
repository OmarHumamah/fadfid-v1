import React, { useRef, useState, useContext } from "react";
import {
  Button,
  Card,
  Container,
  Stack,
  ListGroup,
  Badge,
  Image,
  Form,
  OverlayTrigger,
  Tooltip,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { SettingContext } from "../../context/Context";
import ImgModal from "./ImgModal";

export default function Post(props) {
  const {
    updateLike,
    dislike,
    user,
    allUsers,
    addComment,
    deleteComment,
    editComment,
    deletePost,
    deletePic,
    updatePrivacy,
  } = useContext(SettingContext);
  const email = props.content.email;
  // const takePic = allUsers.find(user => user.email === email ).pic
  // console.log(email,takePic);
  const img = props.content.picture;
  const anonymousPic =
    "https://friconix.com/png/fi-cnluxx-anonymous-user-circle.png";
  const cRef = useRef(null);
  const [imgModal, setImgModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentSlicer, setCommentSlicer] = useState(3);
  const [commentEditId, setCommentEditId] = useState(null);
  const [commentEdit, setCommentEdit] = useState("");
  const [showPrivacyF, setShowPrivacyF] = useState(false);
  const [privacy, setPrivacy] = useState(props.content.privacy);
  const addCommentHandler = () => {
    addComment(props.content, user, newComment);
    setNewComment("");
  };

  const editHandler = (id, text) => {
    setCommentEditId(id);
    setCommentEdit(text);
  };

  const saveEditHandler = (n) => {
    editComment(props.content, n, commentEdit);
    setCommentEditId(null);
  };

  const deletePostHandler = () => {
    deletePost(props.content.id);
    props.content.pictureName &&
      deletePic.deletePic(
        props.content.pictureName,
        props.content.userName,
        "post's_images"
      );
    // console.log("post deleted")
    // console.log("file",props.content.pictureName,"deleted")
  };

  const privacySubmit = () => {
    updatePrivacy(props.content.id, privacy);
    setShowPrivacyF(false);
  };
  const privacyCancel = () => {
    setPrivacy(props.content.privacy);
    setShowPrivacyF(false);
  };
  return (
    <div>
      <Container>
        <Card>
          <Card.Body>
            <Card.Title className="d-flex align-items-start">
              <Image
                roundedCircle
                width="40 rem"
                src={
                  allUsers.find((user) => user.email === email)
                    ? allUsers.find((user) => user.email === email).pic
                    : props.content.userPic
                }
              />
              <p>To {props.content.privacy}:</p>
              {props.content.userName}:
              {user.email === props.content.email && (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-basic"
                  >
                    . . .
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => deletePostHandler()}>
                      Delete post
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowPrivacyF(true)}>
                      Change privacy
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <Modal show={showPrivacyF} onHide={() => setShowPrivacyF(false)}>
                <div>
                  <Form.Check
                    label="All"
                    value="All"
                    name="privacy"
                    type="radio"
                    onClick={(e) => setPrivacy(e.target.value)}
                  />
                  <Form.Check
                    label="Friends"
                    value="Friends"
                    name="privacy"
                    type="radio"
                    onClick={(e) => setPrivacy(e.target.value)}
                  />
                  <Form.Check
                    label="Only me"
                    value="Private"
                    name="privacy"
                    type="radio"
                    onClick={(e) => setPrivacy(e.target.value)}
                  />
                  <Button onClick={() => privacySubmit()}>Save</Button>
                  <Button variant="secondary" onClick={() => privacyCancel()}>Cancel</Button>
                </div>
              </Modal>
            </Card.Title>
            <Card.Text className="d-flex justify-content-between align-items-start">
              {props.content.text}
            </Card.Text>
            {img && <Card.Img onClick={() => setImgModal(true)} src={img} />}
            <Stack direction="horizontal" gap={2}>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip>
                    {props.content.likes.map((like, n) => (
                      <p key={n}>{like.liker}</p>
                    ))}
                  </Tooltip>
                }
              >
                <div className="bg-light border">
                  likes <Badge>{props.content.likes.length}</Badge>
                </div>
              </OverlayTrigger>

              <div className="bg-light border ms-auto">
                <Badge>{props.content.comments.length}</Badge> comments
              </div>
            </Stack>
            <hr />
            <Stack direction="horizontal" gap={2}>
              <div>
                {!props.content.likes.some(
                  (liker) => liker.email === user.email
                ) ? (
                  <Button
                    onClick={() => updateLike(props.content, user)}
                    variant="outline-secondary"
                  >
                    Like
                  </Button>
                ) : (
                  <Button
                    onClick={() => dislike(props.content, user)}
                    variant="secondary"
                  >
                    Like
                  </Button>
                )}
              </div>
              <div className="vr" />
              <div>
                <Button
                  variant="outline-secondary"
                  onClick={() => cRef.current.focus()}
                >
                  comment
                </Button>
              </div>
            </Stack>
          </Card.Body>
          <Card.Body>
            <Card>
              <Card.Body>
                <Stack direction="horizontal" gap={3}>
                  <Image
                    roundedCircle
                    width="35 rem"
                    src={
                      allUsers
                        ? allUsers.find((u) => u.email === user.email)
                          ? allUsers.find((u) => u.email === user.email).pic
                          : user.picture
                        : user.pic
                    }
                  />
                  <Form.Control
                    ref={cRef}
                    className="me-auto"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button
                    disabled={newComment === ""}
                    onClick={() => addCommentHandler()}
                    variant="secondary"
                  >
                    Enter
                  </Button>
                </Stack>
              </Card.Body>
            </Card>
            <ListGroup as="ol">
              {props.content.comments
                .slice(0, commentSlicer)
                .map((comment, n) => (
                  <ListGroup.Item
                    key={n}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <p className="fw-bold">
                        <Image
                          roundedCircle
                          width="35 rem"
                          src={
                            allUsers
                              ? allUsers.find(
                                  (user) => user.email === comment.email
                                )
                                ? allUsers.find(
                                    (user) => user.email === comment.email
                                  ).pic
                                : anonymousPic
                              : anonymousPic
                          }
                        />
                        {comment.commenter}:{" "}
                      </p>
                      {!(commentEditId === comment.time) && (
                        <p>{comment.text}</p>
                      )}
                      {commentEditId === comment.time && (
                        <div>
                          <Form.Control
                            ref={cRef}
                            className="me-auto"
                            placeholder={comment.text}
                            value={commentEdit}
                            onChange={(e) => setCommentEdit(e.target.value)}
                          />
                          <div>
                            <Button onClick={() => saveEditHandler(n)}>
                              Save
                            </Button>
                            <Button onClick={() => setCommentEditId(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                      {!(commentEditId === comment.time) && (
                        <div>
                          {comment.email === user.email && (
                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                editHandler(comment.time, comment.text)
                              }
                            >
                              Edit
                            </Button>
                          )}

                          {(comment.email === user.email ||
                            props.content.email === user.email) && (
                            <Button
                              onClick={() =>
                                deleteComment(props.content, comment)
                              }
                              variant="outline-secondary"
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                      )}

                      <p>{comment.time}</p>
                      {comment.editTime && <p>Edited at:{comment.time}</p>}
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
            {props.content.comments.length > 3 &&
              commentSlicer < props.content.comments.length && (
                <Link onClick={() => setCommentSlicer(commentSlicer + 3)}>
                  Show more {props.content.comments.length - commentSlicer}{" "}
                  comment
                  {props.content.comments.length - commentSlicer > 1 && "s"}
                </Link>
              )}
          </Card.Body>
        </Card>
      </Container>
      <ImgModal img={img} imgModal={imgModal} setImgModal={setImgModal} />
    </div>
  );
}
