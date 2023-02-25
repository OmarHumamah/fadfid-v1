import {
  AddAPhotoRounded,
  AddCircleRounded,
  CalendarMonthRounded,
  CheckRounded,
  CloseRounded,
  CreateRounded,
  FemaleRounded,
  MaleRounded,
  PanoramaRounded,
  TagRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Button,
  Chip,
  Modal,
  Badge,
  IconButton,
  CircularProgress,
  Divider,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { SettingContext } from "../../context/Context";
import ActionAlert from "../alert/Alert";
import SuccessAlert from "../alert/SuccessAlert";

const postModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "auto", sm: 650 },
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProfileCard(props) {
  const { updateUser, uploadPic, deletePic } = useContext(SettingContext);
  const userId = props.userId;

  const [openEdit, setOpenEdit] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [interest, setInterest] = useState("");
  const [interestsArr, setInterestsArr] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicName, setProfilePicName] = useState(null);
  const [profileCover, setProfileCover] = useState(null);
  const [profilePiCoverName, setProfileCoverName] = useState(null);
  const [uploadedPic, setUploadedPic] = useState(null);
  const [uploadedCover, setUploadedCover] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  let [updateObj, setUpdateObject] = useState({});

  const handelCloseAlert = () => {
    setOpenAlert(false);
  };
  const handelCloseSuccessAlert = () => {
    window.location.reload(true);
  };
  const editHandel = () => {
    setOpenEdit(true);
  };
  const picUploadHandler = (pic) => {
    if (pic.type === "image/jpeg") {
      uploadPic(pic, setProfilePic, setProfilePicName, userId.subId);
      setUploadedPic(true);
    } else {
      alert("Only files with the file extension jpeg are allowed");
    }
  };
  const deleteSelectedPic = () => {
    deletePic(profilePicName, userId.subId, "users_pics_and_covers");
    setProfilePic(null);
    setUploadedPic(null);
  };
  const coverUploadHandler = (cover) => {
    if (cover.type === "image/jpeg") {
      uploadPic(cover, setProfileCover, setProfileCoverName, userId.subId);
      setUploadedCover(true);
    } else {
      alert("Only files with the file extension jpeg are allowed");
    }
  };
  const deleteSelectedCover = () => {
    deletePic(profilePiCoverName, userId.subId, "users_pics_and_covers");
    setProfileCover(null);
    setUploadedCover(null);
  };
  const addInterest = (i, e) => {
    e.preventDefault();
    interestsArr.push(i);
    updateObj = {
      ...updateObj,
      interests: [...userId.interests, ...interestsArr],
    };
    setInterest("");
    setUpdateObject(updateObj);
  };
  const deleteInterest = (arr, n) => {
    console.log(n);
    arr.splice(n, 1);
    updateObj = {
      ...updateObj,
      interests: [...userId.interests, ...interestsArr],
    };
    setUpdateObject(updateObj);
  };
  const discardChanges = () => {
    profilePic && deleteSelectedPic();
    profileCover && deleteSelectedCover();
    setOpenEdit(false);
    setUploadedCover(null);
    setUploadedPic(null);
    setUpdateObject({});
    setInterestsArr([]);
    handelCloseAlert();
    // window.location.reload(!(profilePic && profileCover));
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
    <>
      <Card>
        <CardMedia sx={{ height: 140 }} image={userId.cover} />
        <CardContent>
          <Stack mt={-4} direction="row" alignItems="center">
            <Box flex={2}>
              <Avatar
                sx={{ width: "120px", height: "120px" }}
                src={userId.pic}
              />
            </Box>
            <Box flex={5}>
              <Typography gutterBottom variant="h5" component="div">
                {`${userId.firstName} ${userId.lastName}`}
                {userId.gender === "Male" ? <MaleRounded /> : <FemaleRounded />}
              </Typography>
              <Typography color="text.secondary">{userId.birthday}</Typography>
            </Box>
            <Box flex={1}>
              <Button
                variant="secondary"
                startIcon={<CreateRounded />}
                onClick={() => editHandel()}
              >
                Edit
              </Button>
              <Button
                variant="secondary"
                sx={{ display: { xs: "none", sm: "block" } }}
                onClick={() =>
                  props.setFriendsModal({ show: true, friends: userId.friends })
                }
              >{`Friends(${userId.friends.length})`}</Button>
            </Box>
          </Stack>
          <Box mr={5} ml={18}>
            <Typography variant="body2" color="text.secondary">
              {userId.bio}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          {userId.interests && (
            <Stack direction="row" spacing={1}>
              {userId.interests.map((i, n) => (
                <Chip
                  key={n}
                  icon={<TagRounded />}
                  size="small"
                  variant="outlined"
                  label={i}
                />
              ))}
            </Stack>
          )}
        </CardActions>
      </Card>

      <Modal open={openEdit}>
        <Card sx={postModalStyle}>
          <Typography>Edit Profile</Typography>
          <Divider />
          <Stack sx={{ flexDirection: { xs: "column", sm: "row" } }}>
            <Box>
              {!profileCover && (
                <>
                  <label style={{ cursor: "pointer" }} for="cPic">
                    <IconButton disabled>
                      <PanoramaRounded sx={{ width: "50px", height: "50px" }} />

                      <Typography pl={2}>Change Cover picture</Typography>
                    </IconButton>
                  </label>
                  <input
                    style={{ display: "none" }}
                    disabled={uploadedCover}
                    id="cPic"
                    accept="image/x-png,image/gif,image/jpeg"
                    type="file"
                    onChange={(e) => coverUploadHandler(e.target.files[0])}
                  />
                </>
              )}

              {profileCover ? (
                <>
                  <Card>
                    <CardMedia sx={{ height: 140 }} image={profileCover} />
                  </Card>
                  <IconButton
                    disabled={typeof profileCover !== "string"}
                    onClick={() => deleteSelectedCover()}
                    color="error"
                    sx={{ mt: -3, position: "relative", left: "90%" }}
                  >
                    <CloseRounded />
                  </IconButton>
                </>
              ) : (
                uploadedCover && (
                  <CircularProgress
                    color="inherit"
                    sx={{ position: "absolute", left: "40%", mt: "55px" }}
                  />
                )
              )}
              <br />
              {!profilePic && (
                <>
                  <label style={{ cursor: "pointer" }} for="pPic">
                    <IconButton disabled>
                      <Badge
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={<AddAPhotoRounded />}
                      >
                        <Avatar sx={{ width: "50px", height: "50px" }} />
                      </Badge>

                      <Typography pl={2}>Change Profile Picture</Typography>
                    </IconButton>
                  </label>
                  <input
                    style={{ display: "none" }}
                    disabled={uploadedPic}
                    id="pPic"
                    accept="image/x-png,image/gif,image/jpeg"
                    type="file"
                    onChange={(e) => picUploadHandler(e.target.files[0])}
                  />
                </>
              )}
              {profilePic ? (
                <>
                  <Badge
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <IconButton
                        disabled={typeof profilePic !== "string"}
                        onClick={() => deleteSelectedPic()}
                        color="error"
                        sx={{ mt: -3 }}
                      >
                        <CloseRounded />
                      </IconButton>
                    }
                  >
                    <Avatar
                      sx={{ width: "50px", height: "50px" }}
                      src={profilePic}
                    />
                  </Badge>
                </>
              ) : (
                uploadedPic && (
                  <CircularProgress
                    color="inherit"
                    sx={{ position: "absolute", left: "40%", mt: "55px" }}
                  />
                )
              )}
              <Stack p={2} direction="row" spacing={2}>
                <Box>
                  <Typography>Gender</Typography>
                  <RadioGroup
                    name="gender"
                    onChange={(e) =>
                      setUpdateObject({ ...updateObj, gender: e.target.value })
                    }
                  >
                    <FormControlLabel
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
                </Box>
                <vr />
                <Box>
                  <label for="birthday">
                    <IconButton disabled>
                      <CalendarMonthRounded />
                      <Typography>Birthday</Typography>
                    </IconButton>
                  </label>
                  <br />
                  <input
                    // style={{display:"none"}}
                    id="birthday"
                    type="date"
                    onChange={(e) =>
                      setUpdateObject({
                        ...updateObj,
                        birthday: e.target.value,
                      })
                    }
                  />
                </Box>
              </Stack>
            </Box>
            <Box>
              <TextField
                label="Bio"
                defaultValue={
                  userId.bio ? userId.bio : "Tell more about yourself ..."
                }
                multiline
                rows={3}
                sx={{ m: 2, width: "90%" }}
                onChange={(e) =>
                  setUpdateObject({ ...updateObj, bio: e.target.value })
                }
              />
              <br />

              <form style={{ marginLeft: "16px" }}>
                <TextField
                  label="Interests"
                  id="message"
                  name="message"
                  value={interest}
                  onChange={(event) => setInterest(event.target.value)}
                />
                <IconButton
                  disabled={interest === ""}
                  type="submit"
                  onClick={(e) => addInterest(interest, e)}
                >
                  <AddCircleRounded />
                </IconButton>
              </form>

              {userId.interests.map((i, n) => (
                <Chip
                  key={n}
                  size="small"
                  label={i}
                  variant="outlined"
                  onDelete={() => deleteInterest(userId.interests, n)}
                />
              ))}
              {interestsArr.map((i, n) => (
                <Chip
                  key={n}
                  size="small"
                  label={i}
                  variant="outlined"
                  onDelete={() => deleteInterest(interestsArr, n)}
                />
              ))}
            </Box>
          </Stack>

          <CardActions>
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
              variant="outlined"
              color="inherit"
              endIcon={<CheckRounded />}
            >
              Save
            </Button>
            <Button
              startIcon={<CloseRounded />}
              variant="outlined"
              color="inherit"
              onClick={() => setOpenAlert(true)}
            >
              discard
            </Button>
            <ActionAlert
              openAlert={openAlert}
              action={discardChanges}
              content={"Discard changes. Are you sure?"}
              closeAlert={handelCloseAlert}
            />
          </CardActions>
        </Card>
      </Modal>
      <SuccessAlert
        openAlert={addUser}
        content={"Your information has been updated successfully."}
        closeAlert={handelCloseSuccessAlert}
      />
    </>
  );
}
