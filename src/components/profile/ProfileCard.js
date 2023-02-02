import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Container,
  Image,
  Stack,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { SettingContext } from "../../context/Context";

export default function ProfileCard() {
  const {
    user,
    userProfileVar,
    profileHandler,
    createUser,
    updateUser,
    // getUser,
    getAllUsers,
    allUsers,
    userProfileConst,
    uploadPic,
    deletePic,
    setUserProfileConst,
  } = useContext(SettingContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [addUser, setAddUser] = useState(true);
  const [message, setMessage] = useState("");
  const [uploadedPic, setUploadedPic] = useState(null);
  const [uploadedCover, setUploadedCover] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    profileHandler.setInterests([...userProfileVar.interests, message]);
    setMessage("");
  };

  const deleteSelectedPic = () => {
    deletePic.deletePic(deletePic.picTime, userProfileVar.userName, "users_pics_and_covers");
    userProfileConst
      ? profileHandler.setPic(userProfileConst.pic)
      : profileHandler.setPic(user.picture);
    setUploadedPic(null);
  };

  const deleteSelectedCover = () => {
    deletePic.deletePic(deletePic.coverTime, userProfileVar.userName, "users_pics_and_covers");
    userProfileConst
      ? profileHandler.setCover(userProfileConst.cover)
      : profileHandler.setCover("https://via.placeholder.com/900x200.png");
    setUploadedCover(null);
  };
  const discardChanges = () => {
    deletePic.picTime && deleteSelectedPic();
    deletePic.coverTime && deleteSelectedCover();
    setOpenEdit(false);
    setUploadedCover(null);
    setUploadedPic(null);
  };
  const picUploadHandler = () => {
    uploadPic(
      userProfileVar.pic,
      profileHandler.setPic,
      deletePic.setPicTime,
      userProfileVar.userName
    );
    setUploadedPic(true);
  };

  const coverUploadHandler = () => {
    uploadPic(
      userProfileVar.cover,
      profileHandler.setCover,
      deletePic.setCoverTime,
      userProfileVar.userName
    );
    setUploadedCover(true);
  };
  useEffect(() => {
    profileHandler.setUserName(user.name);
    profileHandler.setFirstName(user.given_name);
    profileHandler.setLastName(user.family_name);
    profileHandler.setPic(user.picture);
    profileHandler.setEmail(user.email);
    profileHandler.setLanguage(user.locale);
    getAllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editHandel = (userC) => {
    setOpenEdit(true);
    while (userC) {
      profileHandler.setPic(userC.pic);
      profileHandler.setCover(userC.cover);
      profileHandler.setBio(userC.bio);
      profileHandler.setBirthday(userC.birthday);
      profileHandler.setGender(userC.gender);
      profileHandler.setInterests(userC.interests);
      break;
    }
  };

  const createHandler = () => {
    createUser(userProfileVar);
    setAddUser(false);
    setOpenEdit(false);
  };

  const updateHandler = () => {
    updateUser(userProfileConst.id, userProfileVar);
    setAddUser(false);
    setOpenEdit(false);
  };

  return (
    <div>
      {/* {console.log(userProfileConst)} */}
      {/* {console.log(userProfileVar)} */}
      {allUsers&&setUserProfileConst(allUsers.find((u) => u.email === user.email))}
      <Container>
        <Card>
          <Card.Img
            variant="top"
            src={
              userProfileConst
                ? userProfileConst.cover
                : "https://via.placeholder.com/900x200.png"
            }
          />
          <Card.Body>
            <Card.Title>
              <Stack direction="horizontal" gap={3}>
                <div>
                  <Image
                    roundedCircle
                    width="120 rem"
                    src={userProfileConst ? userProfileConst.pic : user.picture}
                  />
                </div>
                <div>
                  <p>
                    {userProfileConst ? userProfileConst.userName : user.name}
                  </p>
                  <p>{userProfileConst && userProfileConst.gender}</p>
                </div>
              </Stack>
            </Card.Title>
            <Card.Text>
              {userProfileConst ? userProfileConst.bio : ""}
            </Card.Text>
            <Card.Text>
              {userProfileConst ? userProfileConst.birthday : ""}
            </Card.Text>
            <Button onClick={() => editHandel(userProfileConst)}>
              Edit profile
            </Button>
          </Card.Body>
        </Card>
        {userProfileConst && (
          <Card>
            <Stack direction="horizontal">
              {userProfileConst.interests.map((i, n) => (
                <div key={n} className="bg-light border">
                  {i}
                </div>
              ))}
            </Stack>
          </Card>
        )}
      </Container>
      <Modal show={openEdit}>
        <Modal.Body>
          <div>
            <fieldset>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="pic">Change profile picture</Form.Label>
                <br />
                <input
                  disabled={uploadedPic}
                  id="pPic"
                  type="file"
                  onChange={(e) => profileHandler.setPic(e.target.files[0])}
                />
                <Button
                  disabled={uploadedPic}
                  onClick={() => picUploadHandler()}
                >
                  confirm
                </Button>
                {uploadedPic && (
                  <Button
                    disabled={typeof userProfileVar.pic !== "string"}
                    onClick={() => deleteSelectedPic()}
                  >
                    Delete
                  </Button>
                )}
                {typeof userProfileVar.pic !== "string" && (
                  <Button
                    disabled={uploadedPic}
                    onClick={() => profileHandler.setPic(userProfileConst.pic)}
                  >
                    deselect
                  </Button>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="pic">Change Cover picture</Form.Label>
                <br />
                <input
                  disabled={uploadedCover}
                  id="cPic"
                  type="file"
                  onChange={(e) => profileHandler.setCover(e.target.files[0])}
                />
                <Button
                  disabled={uploadedCover}
                  onClick={() => coverUploadHandler()}
                >
                  confirm
                </Button>
                {uploadedCover && (
                  <Button
                    disabled={typeof userProfileVar.cover !== "string"}
                    onClick={() => deleteSelectedCover()}
                  >
                    Delete
                  </Button>
                )}
                {typeof userProfileVar.cover !== "string" && (
                  <Button
                    disabled={uploadedCover}
                    onClick={() =>
                      profileHandler.setCover(userProfileConst.pic)
                    }
                  >
                    deselect
                  </Button>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="bio">Bio</Form.Label>
                <Form.Control
                  onChange={(e) => profileHandler.setBio(e.target.value)}
                  id="bio"
                  placeholder="Tell us more about your self ..."
                  as="textarea"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="birthday">Birthday</Form.Label>
                <br />
                <input
                  id="birthday"
                  type="date"
                  onChange={(event) =>
                    profileHandler.setBirthday(event.target.value)
                  }
                />
                {/* <input
                  type="button"
                  value="confirm"
                  onClick={() => profileHandler.setBirthday(bd)}
                /> */}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="gender">Gender</Form.Label>
                <br />
                <Form.Check
                  inline
                  value="Male"
                  label="Male"
                  name="gender"
                  type="radio"
                  onClick={(e) => profileHandler.setGender(e.target.value)}
                />
                <Form.Check
                  inline
                  label="Female"
                  value="Female"
                  name="gender"
                  type="radio"
                  onClick={(e) => profileHandler.setGender(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="interests">Interests</Form.Label>
                <form>
                  <input
                    type="text"
                    id="message"
                    name="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                  <input type="submit" onClick={handleSubmit} value="Add" />
                  <Stack direction="horizontal">
                    {userProfileVar.interests.map((i, n) => (
                      <div key={n} className="bg-light border">
                        {i}
                      </div>
                    ))}
                  </Stack>
                </form>
              </Form.Group>

              {!userProfileConst && (
                <Button
                  onClick={() => createHandler()}
                  disabled={
                    typeof userProfileVar.pic !== "string" ||
                    typeof userProfileVar.cover !== "string"
                  }
                >
                  Save
                </Button>
              )}
              {userProfileConst && (
                <Button
                  disabled={
                    typeof userProfileVar.pic !== "string" ||
                    typeof userProfileVar.cover !== "string"
                  }
                  onClick={() => updateHandler()}
                >
                  Save
                </Button>
              )}
              <Button onClick={() => discardChanges()}>discard</Button>
            </fieldset>
            {(typeof userProfileVar.pic !== "string" ||
              typeof userProfileVar.cover !== "string") && (
              <p>confirm or deselect selected pictures</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={!addUser}>
        <Modal.Header>
          <Modal.Title>Updated !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your information has been updated successfully.</Modal.Body>
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
