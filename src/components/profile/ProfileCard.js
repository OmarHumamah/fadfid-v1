import userEvent from "@testing-library/user-event";
import React, { useContext, useState } from "react";
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
  const { user, profileVar, profileHandler } = useContext(SettingContext);
  const [openEdit, setOpenEdit] = useState(false);

  const [message, setMessage] = useState("");
  const [bd, setBd] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    profileHandler.setInterests([...profileVar.interests, message]);
  };

  return (
    <div>
      <Container>
        <Card>
          <Card.Img variant="top" src={profileVar.cover} />
          <Card.Body>
            <Card.Title>
              <Stack direction="horizontal" gap={3}>
                <div>
                  <Image
                    roundedCircle
                    width="120 rem"
                    src={profileVar.pic ? profileVar.pic : user.picture}
                  />
                </div>
                <div>{user.name}</div>
              </Stack>
            </Card.Title>
            <Card.Text>{profileVar.bio}</Card.Text>
            <Card.Text>{profileVar.birthday}</Card.Text>
            <Button onClick={() => setOpenEdit(true)}>Edit profile</Button>
          </Card.Body>
        </Card>
        <Card>
          <Stack direction="horizontal" gap={3}>
            {profileVar.interests.map((i) => {
              return <div className="bg-light border">{i}</div>;
            })}
          </Stack>
        </Card>
      </Container>
      <Modal show={openEdit} onHide={() => setOpenEdit(false)}>
        <Modal.Body>
          <Form>
            <fieldset>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="pic">Change profile picture</Form.Label>
                <br />
                <input id="pic" type="file" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="pic">Change Cover picture</Form.Label>
                <br />
                <input id="pic" type="file" />
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
                  type="date"
                  onChange={(event) => setBd(event.target.value)}
                />
                <input
                  type="button"
                  value="confirm"
                  onClick={() => profileHandler.setBirthday(bd)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="interests">Interests</Form.Label>
                <Stack direction="horizontal"></Stack>
                <form>
                  <input
                    type="text"
                    id="message"
                    name="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                  <input type="submit" onClick={handleSubmit} value="Add" />
                </form>
              </Form.Group>
              <Button type="submit">Submit</Button>
            </fieldset>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
