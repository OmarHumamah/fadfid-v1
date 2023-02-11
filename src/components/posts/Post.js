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
    formatDate,
    maleAvatar,
    femaleAvatar,
  } = useContext(SettingContext);

  const userId = allUsers.find((u) => u.subId === user.sub);
  const postOwner = allUsers.find((u) => u.subId === props.content.subId);

  const img = props.content.picture;
  const cRef = useRef(null);
  const [imgModal, setImgModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentSlicer, setCommentSlicer] = useState(3);
  const [commentEditId, setCommentEditId] = useState(null);
  const [commentEdit, setCommentEdit] = useState("");
  const [showPrivacyF, setShowPrivacyF] = useState(false);
  const [privacy, setPrivacy] = useState(props.content.privacy);
  const addCommentHandler = (e) => {
    e.preventDefault();
    addComment(props.content, user, newComment);
    setNewComment("");
  };

  const editHandler = (id, text) => {
    setCommentEditId(id);
    setCommentEdit(text);
  };

  const saveEditHandler = (n, e) => {
    e.preventDefault();
    editComment(props.content, n, commentEdit);
    setCommentEditId(null);
  };

  const deletePostHandler = () => {
    deletePost(props.content.id);
    props.content.pictureName &&
      deletePic(
        props.content.pictureName,
        props.content.subId,
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
      <Container fluid>
        <Card id={props.content.id}>
          <Card.Header style={{ display: "flex" }}>
            <a
              style={{ display: "flex" }}
              href={`${
                props.content.anonymous
                  ? "#"
                  : userId && userId.userName === postOwner.userName
                  ? "/profile"
                  : "/" + postOwner.userName
              }`}
            >
              <Image
                roundedCircle
                width="40 rem"
                src={
                  props.content.anonymous
                    ? postOwner.gender === "Male"
                      ? maleAvatar
                      : femaleAvatar
                    : userId && postOwner.pic
                }
              />
              <p>To {props.content.privacy}:</p>
              {props.content.anonymous
                ? "Anonymous post"
                : userId && `${postOwner.firstName} ${postOwner.lastName}`}
              :
            </a>
            {formatDate(props.content.postTime)}
            {user.sub === props.content.subId && (
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
              <Card>
                <Card.Header>Change Privacy</Card.Header>
                <Card.Body>
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
                </Card.Body>
                <Card.Footer>
                  <Button onClick={() => privacySubmit()}>Save</Button>
                  <Button variant="secondary" onClick={() => privacyCancel()}>
                    Cancel
                  </Button>
                </Card.Footer>
              </Card>
            </Modal>
          </Card.Header>
          <Card.Title className="d-flex align-items-start"></Card.Title>
          <Card.Body>
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
                      <p key={n}>
                        {like.anonymous
                          ? "Anonymous"
                          : `${
                              allUsers.find((u) => u.subId === like.id)
                                .firstName
                            } ${
                              allUsers.find((u) => u.subId === like.id).lastName
                            }`}
                      </p>
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
                {!props.content.likes.some((liker) => liker.id === user.sub) ? (
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
                      userId && userId.anonymous
                        ? userId.gender === "Male"
                          ? maleAvatar
                          : femaleAvatar
                        : userId.pic
                    }
                  />
                  <form style={{ display: "flex" }}>
                    <Form.Control
                      ref={cRef}
                      className="me-auto"
                      placeholder={`Write a comment ${
                        userId && userId.anonymous ? "anonymously" : ""
                      }...`}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                      disabled={newComment === ""}
                      onClick={(e) => addCommentHandler(e)}
                      variant="secondary"
                      type="submit"
                    >
                      Enter
                    </Button>
                  </form>
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
                    <div style={{ display: "flex" }} className="ms-2 me-auto">
                      <div>
                        <a
                          href={`/${comment.anonymous?"#":
                            userId && userId.subId === comment.id
                              ? "profile"
                              : allUsers.find((u) => u.subId === comment.id)
                                  .userName
                          }`}
                        >
                          <p className="fw-bold">
                            <Image
                              roundedCircle
                              width="35 rem"
                              src={
                                comment.anonymous
                                  ? allUsers.find(
                                      (user) => user.subId === comment.id
                                    ).gender === "Male"
                                    ? maleAvatar
                                    : femaleAvatar
                                  : allUsers.find(
                                      (user) => user.subId === comment.id
                                    ).pic
                              }
                            />
                            {comment.anonymous
                              ? "Anonymous comment"
                              : `${
                                  allUsers.find(
                                    (user) => user.subId === comment.id
                                  ).firstName
                                } ${
                                  allUsers.find(
                                    (user) => user.subId === comment.id
                                  ).lastName
                                }`}
                            :
                          </p>
                        </a>
                        <p>{formatDate(comment.time)}</p>
                        {comment.editTime && (
                          <p>Edited {formatDate(comment.editTime)}</p>
                        )}
                      </div>

                      {!(commentEditId === comment.time) && (
                        <p style={{ padding: 30 }}>{comment.text}</p>
                      )}
                      {commentEditId === comment.time && (
                        <form>
                          <Form.Control
                            ref={cRef}
                            className="me-auto"
                            placeholder={comment.text}
                            value={commentEdit}
                            onChange={(e) => setCommentEdit(e.target.value)}
                          />
                          <div>
                            <Button
                              disabled={
                                commentEdit === "" ||
                                commentEdit === comment.text
                              }
                              onClick={(e) => saveEditHandler(n, e)}
                              type="submit"
                            >
                              Save
                            </Button>
                            <Button onClick={() => setCommentEditId(null)}>
                              Cancel
                            </Button>
                          </div>
                        </form>
                      )}
                      {!(commentEditId === comment.time) && (
                        <div>
                          {comment.id === user.sub && (
                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                editHandler(comment.time, comment.text)
                              }
                            >
                              Edit
                            </Button>
                          )}

                          {(comment.id === user.sub ||
                            props.content.subId === user.sub) && (
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
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
            {props.content.comments.length > 3 &&
              commentSlicer < props.content.comments.length && (
                <a onClick={() => setCommentSlicer(commentSlicer + 3)}>
                  Show more {props.content.comments.length - commentSlicer}{" "}
                  comment
                  {props.content.comments.length - commentSlicer > 1 && "s"}
                </a>
              )}
          </Card.Body>
        </Card>
      </Container>
      <ImgModal img={img} imgModal={imgModal} setImgModal={setImgModal} />
    </div>
  );
}
