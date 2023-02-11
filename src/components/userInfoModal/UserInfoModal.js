import React, { useContext, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SettingContext } from "../../context/Context";

export default function UserInfoModal() {
  const { user, allUsers, createUser, getAllUsers } =
    useContext(SettingContext);

  useEffect(() => {
    getAllUsers();
  }, []);
  const userId = allUsers.find((u) => u.subId === user.sub);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("Male");

  const generateUsername = () => {
    let fAndLName = newUser.firstName && newUser.lastName;
    let randomUserName = fAndLName
      ? newUser.firstName + newUser.lastName
      : user.nickname;
    // console.log(allUsers.find((u) => u.userName === randomUserName));
    while (allUsers.find((u) => u.userName === randomUserName)) {
      randomUserName =
        randomUserName + Math.floor(Math.random() * (1000 - 1) + 1);
    }
    return randomUserName;
  };

  const setUserNameHandler = (e) => {
    let userN = e.target.value.replace(/\s/g, "");
    setUserName(userN);
  };
  const femaleAvatar =
    "https://firebasestorage.googleapis.com/v0/b/omar-f.appspot.com/o/users_pics_and_covers%2Fanonymous%2FfemaleAvatar.png?alt=media&token=91a3c821-140c-49b0-9570-08ec29af763f";
  const maleAvatar =
    "https://firebasestorage.googleapis.com/v0/b/omar-f.appspot.com/o/users_pics_and_covers%2Fanonymous%2FmaleAvatar.png?alt=media&token=3cef83c0-7810-4d16-b821-93bed68d83d8";
  const newUser = {
    subId: user.sub,
    userName,
    firstName: firstName ? firstName : user.given_name,
    lastName: lastName ? lastName : user.family_name,
    language: user.locale ? user.locale : "en-GB",
    gender,
    interests: [],
    pendingFriendsReq:[],
    friends: [],
    anonymous:false,
    mood:false,
    friendsHide: false,
    pic: gender === "Male" ? maleAvatar : femaleAvatar,
    email: user.email,
    cover: "https://via.placeholder.com/900x200.png",
  };

  return (
    <div>
      <Modal show={!userId}>
        <Modal.Header>
          <Modal.Title>
            Welcome {user.given_name ? user.given_name : user.nickname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First name</Form.Label>
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={user.given_name}
            />
            {!firstName && (
              <Form.Text className="text-muted">Pick Name!</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>LastName</Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              placeholder={user.family_name}
            />
            {!lastName && (
              <Form.Text className="text-muted">Pick a LastName!</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={userName}
              onClick={() => setUserName(generateUsername())}
              onChange={(e) => setUserNameHandler(e)}
              placeholder={generateUsername()}
            />
            {allUsers.find((u) => u.userName === userName) && (
              <Form.Text className="text-muted">
                {userName} is used ,try {generateUsername()}!
              </Form.Text>
            )}
            {userName && userName.length <= 5 && (
              <Form.Text className="text-muted">
                Username should be 6 characters or more!
              </Form.Text>
            )}
            {!userName && (
              <Form.Text className="text-muted">Pick a UserName!</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="gender">Gender</Form.Label>
            <br />
            <Form.Check
              inline
              //   checked= {gender === "Male"}
              defaultChecked
              value="Male"
              label="Male"
              name="gender"
              type="radio"
              onClick={(e) => setGender(e.target.value)}
            />
            <Form.Check
              inline
              label="Female"
              value="Female"
              name="gender"
              type="radio"
              onClick={(e) => setGender(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={
              (userName.length >= 6
                ? allUsers.find((u) => u.userName === userName)
                : true) || !(newUser.firstName && newUser.lastName)
            }
            variant="primary"
            onClick={() => createUser(newUser)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
