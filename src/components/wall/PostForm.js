import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SettingContext } from "../../context/Context";
import {
  Modal,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Menu,
  IconButton,
  CardMedia,
  CircularProgress,
  CardActions,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CreateIcon from "@mui/icons-material/Create";
import {
  AddAPhotoRounded,
  DeleteForeverRounded,
  ExpandMore,
} from "@mui/icons-material";
import ActionAlert from "../alert/Alert";
import SuccessAlert from "../alert/SuccessAlert";

const postModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PostForm(props) {
  const {
    user,
    deletePic,
    createPost,
    uploadPostsImg,
    uploadProgress,
    maleAvatar,
    femaleAvatar,
  } = useContext(SettingContext);

  const userId = props.userId;

  const [showFormOfPost, setShowFormOfPost] = useState(false);
  const [text, setText] = useState(null);
  const [picture, setPicture] = useState("");
  const [privacy, setPrivacy] = useState("All");
  const [postTime, setPostTime] = useState(false);
  const [pictureName, setPictureName] = useState(null);
  const [progress, setProgress] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);

  const handelCloseAlert = () => {
    setOpenAlert(false);
  };
  const handelCloseSuccessAlert = () => {
    window.location.reload(true);
  };
  const open = Boolean(anchorEl);

  const post = {
    userName: userId.userName,
    subId: user.sub,
    likes: [],
    comments: [],
    postTime,
    privacy,
    text,
    picture,
    pictureName,
    anonymous: userId.anonymous,
  };

  useEffect(() => {
    setPostTime(new Date());
  }, [text, picture,]);
  const postHandler = () => {
    createPost(post);
    // console.log(post);
    setOpenSuccessAlert(true);
    setShowFormOfPost(false);
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
    <>
      <Card body>
        <Stack
          p={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Box flex={1}>
            <Link to={`/profile`}>
              <Avatar
                src={userId.pic}
                // sx={{width:"75%", height: "75%"}}
              />
            </Link>
          </Box>
          <Box flex={6}>
            <TextField
              onClick={() => setShowFormOfPost(true)}
              id="filled-basic"
              label={`What's in your heart, ${userId.firstName}?`}
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Box>
        </Stack>
        <Divider />
        <Stack p={2} direction="row" justifyContent="space-around">
          <Box>
            <Button
              startIcon={<AddPhotoAlternateIcon />}
              variant="outlined"
              color="inherit"
              onClick={() => setShowFormOfPost(true)}
            >
              Photo
            </Button>
          </Box>
          <Box>
            <Button
              endIcon={<CreateIcon />}
              variant="outlined"
              color="inherit"
              onClick={() => setShowFormOfPost(true)}
            >
              Thought
            </Button>
          </Box>
        </Stack>
      </Card>

      <Modal open={showFormOfPost} onClose={() => discardPostHandler()}>
        <Card sx={postModalStyle}>
          <Stack direction="row" alignItems="center">
            <Box>
              <Avatar
                sx={{ width: "60px", height: "60px" }}
                src={
                  userId.anonymous
                    ? userId.gender === "Male"
                      ? maleAvatar
                      : femaleAvatar
                    : userId.pic
                }
              />
            </Box>
            <Box>
              <Typography>
                {userId.anonymous
                  ? "Anonymous Post"
                  : `${userId.firstName} ${userId.lastName}`}
              </Typography>
              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                variant="secondary"
                startIcon={<ExpandMore />}
              >
                {privacy}
              </Button>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={(e) => {
                    setPrivacy(e.target.innerText);
                    setAnchorEl(null);
                  }}
                >
                  All
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={(e) => {
                    setPrivacy(e.target.innerText);
                    setAnchorEl(null);
                  }}
                >
                  Friends
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={(e) => {
                    setPrivacy(e.target.innerText);
                    setAnchorEl(null);
                  }}
                >
                  Private
                </MenuItem>
              </Menu>
            </Box>
          </Stack>
          <Box mt={-2} p={4}>
            <Box mb={1}>
              {privacy === "Private" && (
                <Typography color="text.secondary">
                  Only you could see this post.
                </Typography>
              )}
              {privacy === "Friends" && (
                <Typography color="text.secondary">
                  Only your friends could see this post.
                </Typography>
              )}
              {privacy === "All" && (
                <Typography color="text.secondary">
                  All users could see this post.
                </Typography>
              )}
            </Box>
            <TextField
              margin="5px"
              label={`What's in your heart, ${userId.firstName}?`}
              sx={{ width: "270px" }}
              multiline
              maxRows={4}
              onChange={(e) => setText(e.target.value)}
            />
            {!progress && (
              <>
                <input
                  style={{ display: "none" }}
                  id="imgInput"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  name="postPhoto"
                  onChange={(e) => uploadImgHandler(e)}
                />
                <label style={{ cursor: "pointer" }} for="imgInput">
                  <IconButton disabled>
                    <AddAPhotoRounded />
                    <Typography p={1} color="text.secondary">
                      Add a Photo
                    </Typography>
                  </IconButton>
                </label>
              </>
            )}
            {pictureName && (
              <Box mt={1}>
                <Card>
                  <CardMedia component="img" height="auto" image={picture} />
                </Card>
                <IconButton onClick={() => deleteSelectedPic()}>
                  <DeleteForeverRounded />
                  <Typography p={1} color="text.secondary">
                    Delete
                  </Typography>
                </IconButton>
              </Box>
            )}
            {progress && !picture && (
              <CircularProgress
                sx={{ position: "relative", mt: "15%", left: "41%" }}
                variant="determinate"
                value={uploadProgress}
              />
            )}
          </Box>
          <Divider />
          <CardActions>
            <Button
              disabled={!text && !pictureName}
              color="success"
              variant="contained"
              onClick={() => postHandler()}
            >
              Post
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenAlert(true)}
            >
              Discard
            </Button>
            <ActionAlert
              openAlert={openAlert}
              action={discardPostHandler}
              content={"Discard Post. Are you sure?"}
              closeAlert={handelCloseAlert}
            />
          </CardActions>
        </Card>
      </Modal>
      <SuccessAlert
        openAlert={openSuccessAlert}
        content={"Your post was shared."}
        closeAlert={handelCloseSuccessAlert}
        action={handelCloseSuccessAlert}
      />
    </>
  );
}
