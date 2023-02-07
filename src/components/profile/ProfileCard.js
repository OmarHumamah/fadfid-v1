import React, { useContext, useState } from "react";
import {
  Card,
  Container,
  Image,
  Stack,
  Modal,
  Button,
  Form,
  CloseButton,
} from "react-bootstrap";
import { SettingContext } from "../../context/Context";

export default function ProfileCard() {
  const { user, updateUser, uploadPic, deletePic, allUsers } =
    useContext(SettingContext);
  const userId = allUsers.find((u) => u.subId === user.sub);

  const [openEdit, setOpenEdit] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [interest, setInterest] = useState("");
  const [interestsArr, setInterestArr] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicName, setProfilePicName] = useState(null);
  const [profileCover, setProfileCover] = useState(null);
  const [profilePiCoverName, setProfileCoverName] = useState(null);
  const [uploadedPic, setUploadedPic] = useState(null);
  const [uploadedCover, setUploadedCover] = useState(null);
  let [updateObj, setUpdateObject] = useState({});
  const editHandel = () => {
    setOpenEdit(true);
  };
  const picUploadHandler = (pic) => {
    uploadPic(pic, setProfilePic, setProfilePicName, userId.subId);
    setUploadedPic(true);
  };
  const deleteSelectedPic = () => {
    deletePic(profilePicName, userId.subId, "users_pics_and_covers");
    setProfilePic(null);
    setUploadedPic(null);
  };
  const coverUploadHandler = (cover) => {
    uploadPic(cover, setProfileCover, setProfileCoverName, userId.subId);
    setUploadedCover(true);
  };
  const deleteSelectedCover = () => {
    deletePic(profilePiCoverName, userId.subId, "users_pics_and_covers");
    setProfileCover(null);
    setUploadedCover(null);
  };
  const addInterest = (i) => {
    // console.log(i);
    interestsArr.push(i);
    // console.log([...userId.interests, ...interestsArr]);
    updateObj = {
      ...updateObj,
      interests: [...userId.interests, ...interestsArr],
    };
    setInterest("");
    // console.log(updateObj);
    setUpdateObject(updateObj);
  };
  const deleteInterest = (arr, n) => {
    // displayInterestsArr.pop()
    console.log(n);
    // console.log(i)
    // setInterestArr(
    // interestsArr.filter((x) => i !== x)
    arr.splice(n, 1);
    // )
    updateObj = {
      ...updateObj,
      interests: [...userId.interests, ...interestsArr],
    };
    // let x = {interests: arr };
    setUpdateObject(updateObj);
    console.log(updateObj);
    // updateUser(userId.id, updateObj);
  };
  const discardChanges = () => {
    profilePic && deleteSelectedPic();
    profileCover && deleteSelectedCover();
    setOpenEdit(false);
    setUploadedCover(null);
    setUploadedPic(null);
    setUpdateObject({});
    window.location.reload(!(profilePic&&profileCover))
  };
  const updateHandler = () => {
    while (typeof profilePic === "string") {
      updateObj = {
        ...updateObj,
        pic: profilePic,
        picName: profilePicName,
      };
      setUpdateObject(updateObj);
      break;
    }
    while (typeof profileCover === "string") {
      updateObj = {
        ...updateObj,
        cover: profileCover,
        coverName: profilePiCoverName,
      };
      setUpdateObject(updateObj);
      break;
    }
    updateUser(userId.id, updateObj);
    // console.log(userId.id, updateObj);
    setAddUser(true);
    setOpenEdit(false);
  };

  return (
    <div>
      <Container>
        <Card>
          <Card.Img variant="top" src={userId && userId.cover} />
          <Card.Body>
            <Card.Title>
              <Stack direction="horizontal" gap={3}>
                <div>
                  <Image
                    roundedCircle
                    width="120 rem"
                    src={userId && userId.pic}
                  />
                </div>
                <div>
                  <p>
                    {`${userId && userId.firstName} ${
                      userId && userId.lastName
                    }`}
                  </p>
                  <p>{userId && userId.gender}</p>
                </div>
              </Stack>
            </Card.Title>
            <Card.Text>{userId && userId.bio}</Card.Text>
            <Card.Text>{userId && userId.birthday}</Card.Text>
            <Button onClick={() => editHandel()}>Edit profile</Button>
          </Card.Body>
        </Card>
        {userId.interests && (
          <Card>
            <Stack direction="horizontal">
              {userId.interests.map((i, n) => (
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
                {!profilePic && (
                  <input
                    disabled={uploadedPic}
                    id="pPic"
                    type="file"
                    onChange={(e) => picUploadHandler(e.target.files[0])}
                  />
                )}
                <Image roundedCircle width="120 rem" src={profilePic} />
                {uploadedPic && (
                  <Button
                    disabled={typeof profilePic !== "string"}
                    onClick={() => deleteSelectedPic()}
                  >
                    Deselect
                  </Button>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="pic">Change Cover picture</Form.Label>
                <br />
                {!profileCover && (
                  <input
                    disabled={uploadedCover}
                    id="cPic"
                    type="file"
                    onChange={(e) => coverUploadHandler(e.target.files[0])}
                  />
                )}

                <Image width={400} src={profileCover} />
                {uploadedCover && (
                  <Button
                    disabled={typeof profileCover !== "string"}
                    onClick={() => deleteSelectedCover()}
                  >
                    Deselect
                  </Button>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="bio">Bio</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    setUpdateObject({ ...updateObj, bio: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUpdateObject({ ...updateObj, birthday: e.target.value })
                  }
                />
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
                  onClick={(e) =>
                    setUpdateObject({ ...updateObj, gender: e.target.value })
                  }
                />
                <Form.Check
                  inline
                  label="Female"
                  value="Female"
                  name="gender"
                  type="radio"
                  onClick={(e) =>
                    setUpdateObject({ ...updateObj, gender: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="interests">Interests</Form.Label>
                <form>
                  <input
                    type="text"
                    id="message"
                    name="message"
                    value={interest}
                    onChange={(event) => setInterest(event.target.value)}
                  />
                  <Button onClick={() => addInterest(interest)}>Add</Button>
                  <Stack direction="horizontal">
                    {userId.interests.map((i, n) => (
                      <div key={n} className="bg-light border">
                        <CloseButton
                          onClick={() => deleteInterest(userId.interests, n)}
                        />
                        <p>{i}</p>
                      </div>
                    ))}
                    {interestsArr.map((i, n) => (
                      <div key={n} className="bg-light border">
                        <CloseButton
                          onClick={() => deleteInterest(interestsArr, n)}
                        />
                        <p>{i}</p>
                      </div>
                    ))}
                  </Stack>
                </form>
              </Form.Group>
              <Button
                disabled={
                  !profilePic &&
                  !profileCover &&
                  !updateObj.bio &&
                  !updateObj.birthday &&
                  !updateObj.gender &&
                  !updateObj.interests
                }
                onClick={() => updateHandler()}
              >
                Save
              </Button>
              <Button onClick={() => discardChanges()}>discard</Button>
            </fieldset>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={addUser}>
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
