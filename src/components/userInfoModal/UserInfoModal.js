import {
  Card,
  CardActions,
  Modal,
  Stack,
  TextField,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { SettingContext } from "../../context/Context";

const postModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserInfoModal() {
  const { user, allUsers, createUser, getAllUsers } =
    useContext(SettingContext);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userId = allUsers.find((u) => u.subId === user.sub);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("Male");

  const generateUsername = () => {
    let fAndLName = newUser.firstName && newUser.lastName;
    let randomUserName = fAndLName
      ? newUser.firstName + newUser.lastName
      : user.nickname;
    // eslint-disable-next-line no-loop-func
    while (allUsers.find((u) => u.userName === randomUserName)) {
      randomUserName =
        randomUserName + Math.floor(Math.random() * (1000 - 1) + 1);
    }
    return randomUserName;
  };

  const setUserNameHandler = (e) => {
    let userN = e.target.value.replace(/\s/g, "");
    userN.length <= 70 && setUserName(userN);
  };
  const femaleAvatar =
    "https://firebasestorage.googleapis.com/v0/b/omar-f.appspot.com/o/users_pics_and_covers%2Fanonymous%2FfemaleAvatar.png?alt=media&token=91a3c821-140c-49b0-9570-08ec29af763f";
  const maleAvatar =
    "https://firebasestorage.googleapis.com/v0/b/omar-f.appspot.com/o/users_pics_and_covers%2Fanonymous%2FmaleAvatar.png?alt=media&token=3cef83c0-7810-4d16-b821-93bed68d83d8";
  const newUser = {
    subId: user.sub,
    userName,
    firstName: firstName.length ? firstName : user.given_name,
    lastName: lastName.length ? lastName : user.family_name,
    language: user.locale ? user.locale : "en-GB",
    gender,
    interests: [],
    pendingFriendsReq: [],
    friends: [],
    anonymous: false,
    mood: false,
    friendsHide: false,
    pic: gender === "Male" ? maleAvatar : femaleAvatar,
    email: user.email,
    cover: "https://via.placeholder.com/900x200.png",
  };

  return (
    <div>
      <Modal open={!userId}>
        <Card sx={postModalStyle}>
          <Typography>
            Welcome {user.given_name ? user.given_name : user.nickname}
          </Typography>
          <Stack direction="row" spacing={1} py={3}>
            <TextField
              label="First name"
              onChange={(e) => setFirstName(e.target.value)}
              defaultValue={user.given_name}
              helperText={!firstName && "Pick Name!"}
            />
            <TextField
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              defaultValue={user.family_name}
              helperText={!lastName && "Pick a LastName!"}
            />
          </Stack>
          <TextField
            sx={{ width: "100%" }}
            label="Username"
            value={userName ? userName : generateUsername()}
            onClick={() => setUserName(generateUsername())}
            onChange={(e) => setUserNameHandler(e)}
            helperText={!userName && "Pick a UserName!"}
          />
          {allUsers.find((u) => u.userName === userName) && (
            <Typography fontSize={12} color="red">
              {userName} is used ,try again!
            </Typography>
          )}
          {userName && userName.length <= 5 && (
            <Typography fontSize={12} color="red">
              Username should be 6 characters or more!
            </Typography>
          )}

          <Typography>Gender</Typography>
          <RadioGroup
            row
            name="gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel
              checked={gender === "Male"}
              value="Male"
              control={<Radio />}
              label="Male"
            />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>

          <CardActions>
            <Button
              disabled={
                (userName.length >= 6
                  ? allUsers.find((u) => u.userName === userName)
                  : true) || !(newUser.firstName && newUser.lastName)
              }
              variant="contained"
              color="success"
              onClick={() => createUser(newUser)}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}
