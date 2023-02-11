import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function Settings(props) {
  let [anonymous, setAnonymous] = useState(props.user.anonymous);
  let [mood, setMood] = useState(props.user.mood);
  let [friendsHide, setFriendsHide] = useState(props.user.friendsHide);
  let [language, setLanguage] = useState(props.user.language);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [show, setShow] = useState(false);

  const updateObj = {
    anonymous,
    mood,
    friendsHide,
    language,
    firstName: firstName ? firstName : props.user.firstName,
    lastName: lastName ? lastName : props.user.lastName,
  };

  return (
    <div>
      <label htmlFor="mood">Light / Dark mood</label>
      <Form.Check
        id="mood"
        onChange={(e) => setMood(e.target.checked)}
        type="switch"
        checked={mood}
      />
      <hr />
      <div>
        <label htmlFor="language">language</label>
        <Form.Check
          type="radio"
          name="language"
          value={"en"}
          defaultChecked={props.user.language.includes("en")}
          label="English"
          onClick={() => setLanguage("en")}
        />
        <Form.Check
          type="radio"
          name="language"
          value={"ar"}
          defaultChecked={props.user.language.includes("ar")}
          label="Arabic"
          onClick={() => setLanguage("ar")}
        />
      </div>
      <hr />
      <label htmlFor="anonymous">anonymous</label>
      <Form.Check
        id="anonymous"
        onChange={(e) => setAnonymous(e.target.checked)}
        type="switch"
        checked={anonymous}
      />
      <hr />
      <label htmlFor="friends">Hide friends</label>
      <Form.Check
        id="friends"
        onChange={(e) => setFriendsHide(e.target.checked)}
        type="switch"
        checked={friendsHide}
      />
      <hr />
      <p onClick={() => setShow(!show)}>Change name</p>
      <hr />
      {show && (
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First name</Form.Label>
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={props.user.firstName}
            />
            {!firstName && (
              <Form.Text className="text-muted">Pick Name!</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>LastName</Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              placeholder={props.user.lastName}
            />
            {!lastName && (
              <Form.Text className="text-muted">Pick a LastName!</Form.Text>
            )}
          </Form.Group>
        </div>
      )}

      <Button
        variant="primary"
        onClick={() => props.updateUser(props.user.id, updateObj)}
      >
        Save Changes
      </Button>
    </div>
  );
}
