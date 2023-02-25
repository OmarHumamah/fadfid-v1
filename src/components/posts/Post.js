import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  styled,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  Stack,
  Box,
  TextField,
  Button,
  List,
  Paper,
  ListItem,
  Modal,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import React, { useRef, useState, useContext } from "react";
import { SettingContext } from "../../context/Context";
import ActionAlert from "../alert/Alert";
// import ImgModal from "./ImgModal";
const StyledLink = styled("a")(({ theme }) => ({
  ...theme.link,
}));

const postModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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
  // const [imgModal, setImgModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentSlicer, setCommentSlicer] = useState(3);
  const [commentEditId, setCommentEditId] = useState(null);
  const [commentEdit, setCommentEdit] = useState("");
  const [showPrivacyF, setShowPrivacyF] = useState(false);
  const [privacy, setPrivacy] = useState(props.content.privacy);
  const [anchorEl, setAnchorEl] = useState(null);
  const openPostMenu = Boolean(anchorEl);
  const [openComments, setOpenComments] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const addCommentHandler = (e) => {
    e.preventDefault();
    if (newComment.length) {
      addComment(props.content, user, newComment);
    }
    setNewComment("");
    e.target.value = "";
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
    handleCloseAlert();
    // console.log("post deleted")
    // console.log("file",props.content.pictureName,"deleted")
  };

  const handleCloseAlert = () => {
    handleClose();
    setOpenAlert(false);
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
    <>
      <Card id={props.content.id} sx={{ Width: 100 }}>
        <CardHeader
          avatar={
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              color="success"
              badgeContent={props.content.privacy}
            >
              <Avatar
                src={
                  props.content.anonymous
                    ? postOwner.gender === "Male"
                      ? maleAvatar
                      : femaleAvatar
                    : userId && postOwner.pic
                }
              />
            </Badge>
          }
          action={
            user.sub === props.content.subId && (
              <>
                <IconButton
                  onClick={(e) => handleClick(e)}
                  aria-label="settings"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={openPostMenu}
                  onClose={() => handleClose()}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={() => setOpenAlert(true)}>
                    Delete post
                  </MenuItem>
                  <ActionAlert
                    content={"Delete this post permanently.\n Are you sure?"}
                    openAlert={openAlert}
                    closeAlert={handleCloseAlert}
                    action={deletePostHandler}
                  />
                  <MenuItem
                    onClick={() => {
                      setShowPrivacyF(true);
                      handleClose();
                    }}
                  >
                    Change privacy
                  </MenuItem>
                </Menu>
              </>
            )
          }
          title={
            <StyledLink
              href={`${
                props.content.anonymous
                  ? `#${props.content.id}`
                  : userId.userName === postOwner.userName
                  ? "/profile"
                  : "/" + postOwner.userName
              }`}
            >
              {props.content.anonymous
                ? "Anonymous post"
                : userId && `${postOwner.firstName} ${postOwner.lastName}`}
            </StyledLink>
          }
          subheader={formatDate(props.content.postTime)}
        />
        <CardMedia component="img" height="auto" image={img} />
        <CardContent>
          <Typography variant="body2">{props.content.text}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          {!props.content.likes.some((liker) => liker.id === user.sub) ? (
            <IconButton
              onClick={() => updateLike(props.content, user)}
              aria-label="add to favorites"
            >
              <FavoriteBorder />
            </IconButton>
          ) : (
            <IconButton
              color="error"
              onClick={() => dislike(props.content, user)}
              aria-label="add to favorites"
            >
              <Favorite />
            </IconButton>
          )}
          <Tooltip
            title={props.content.likes.map((like, n) => (
              <StyledLink
                key={n}
                href={`${
                  like.anonymous
                    ? `#${props.content.id}`
                    : userId.userName ===
                      allUsers.find((u) => u.subId === like.id).userName
                    ? "/profile"
                    : "/" + allUsers.find((u) => u.subId === like.id).userName
                }`}
              >
                <p>
                  {like.anonymous
                    ? "Anonymous"
                    : `${allUsers.find((u) => u.subId === like.id).firstName} ${
                        allUsers.find((u) => u.subId === like.id).lastName
                      }`}
                </p>
              </StyledLink>
            ))}
          >
            <Typography color="text.secondary">
              {props.content.likes.length}
            </Typography>
          </Tooltip>
          <IconButton
            disabled={!props.content.comments.length}
            onClick={() => setOpenComments(!openComments)}
          >
            <CommentRoundedIcon />
          </IconButton>
          <Tooltip
            title={props.content.comments.map((c, n) => (
              <StyledLink
                key={n}
                href={`${
                  c.anonymous
                    ? `#${props.content.id}`
                    : userId.userName ===
                      allUsers.find((u) => u.subId === c.id).userName
                    ? "/profile"
                    : "/" + allUsers.find((u) => u.subId === c.id).userName
                }`}
              >
                <p>
                  {c.anonymous
                    ? "Anonymous"
                    : `${allUsers.find((u) => u.subId === c.id).firstName} ${
                        allUsers.find((u) => u.subId === c.id).lastName
                      }`}
                </p>
              </StyledLink>
            ))}
          >
            <Typography color="text.secondary">
              {props.content.comments.length}
            </Typography>
          </Tooltip>
        </CardActions>
        <Divider />
        <CardContent>
          <Stack p={1} direction="row" alignItems="center">
            <Box flex={1}>
              <Avatar
                src={
                  userId && userId.anonymous
                    ? userId.gender === "Male"
                      ? maleAvatar
                      : femaleAvatar
                    : userId.pic
                }
              />
            </Box>
            <Box flex={9}>
              <form>
                <Stack
                  p={1}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <TextField
                    id="outlined-basic"
                    value={newComment}
                    label={`Write a comment ${
                      userId && userId.anonymous ? "anonymously" : ""
                    }...`}
                    variant="outlined"
                    sx={{ width: "80%" }}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    endIcon={<CommentRoundedIcon />}
                    onClick={(e) => addCommentHandler(e)}
                  >
                    enter
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
          <Divider />

          <Collapse in={openComments}>
            <List>
              {props.content.comments
                .slice(0, commentSlicer)
                .map((comment, n) => (
                  <ListItem key={n}>
                    <Stack p={1} direction="row" justifyContent="space-between">
                      <Box flex={1}>
                        <Avatar
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
                      </Box>
                      <Box flex={10}>
                        <Paper sx={{ padding: "5px" }} elevation={5}>
                          <Typography sx={{ fontSize: "14px" }}>
                            <StyledLink
                              href={`/${
                                comment.anonymous
                                  ? "#"
                                  : userId && userId.subId === comment.id
                                  ? "profile"
                                  : allUsers.find((u) => u.subId === comment.id)
                                      .userName
                              }`}
                            >
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
                            </StyledLink>
                          </Typography>
                          <Typography paragraph color="text.secondary">
                            {!(commentEditId === comment.time) && comment.text}
                            {commentEditId === comment.time && (
                              <form>
                                <TextField
                                  ref={cRef}
                                  multiline
                                  variant="standard"
                                  label={comment.text}
                                  value={commentEdit}
                                  onChange={(e) =>
                                    setCommentEdit(e.target.value)
                                  }
                                />
                              </form>
                            )}
                          </Typography>
                        </Paper>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {formatDate(comment.time)}
                        </Typography>
                        {comment.editTime && (
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Edited {formatDate(comment.editTime)}
                          </Typography>
                        )}
                      </Box>
                      <Box flex={1}>
                        {!(commentEditId === comment.time) && (
                          <>
                            {(comment.id === user.sub ||
                              props.content.subId === user.sub) && (
                              <IconButton
                                size="small"
                                onClick={(e) =>
                                  deleteComment(props.content, comment)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                            {comment.id === user.sub && (
                              <IconButton
                                size="small"
                                onClick={() =>
                                  editHandler(comment.time, comment.text)
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            )}
                          </>
                        )}
                        {commentEditId === comment.time && (
                          <>
                            <IconButton
                              size="small"
                              onClick={(e) => saveEditHandler(n, e)}
                              type="submit"
                            >
                              <CheckRoundedIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => setCommentEditId(null)}
                              type="submit"
                            >
                              <CloseRoundedIcon />
                            </IconButton>
                          </>
                        )}
                      </Box>
                    </Stack>
                  </ListItem>
                ))}
            </List>
            {props.content.comments.length > 3 &&
              commentSlicer < props.content.comments.length && (
                <Button
                  size="small"
                  onClick={() => setCommentSlicer(commentSlicer + 3)}
                >
                  More ({props.content.comments.length - commentSlicer}) comment
                  {props.content.comments.length - commentSlicer > 1 && "s"}
                </Button>
              )}
            <StyledLink href={`${window.location.pathname?window.location.pathname:"/"}#${props.content.id}`}>
              <Button
                onClick={() => {
                  setOpenComments(!openComments);
                  setCommentSlicer(3);
                }}
              >
                Hide Comments
              </Button>
            </StyledLink>
          </Collapse>
        </CardContent>
      </Card>

      <Modal open={showPrivacyF} onClose={() => setShowPrivacyF(false)}>
        <Card sx={postModalStyle}>
          <CardHeader title="Change Privacy" />
          <Box paddingX={3}>
            <RadioGroup
              name="language"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
            >
              <FormControlLabel
                value="All"
                checked={privacy === "All"}
                control={<Radio />}
                label="All"
              />
              <FormControlLabel
                label="Friends"
                value="Friends"
                checked={privacy === "Friends"}
                control={<Radio />}
              />
              <FormControlLabel
                label="Only me"
                value="Private"
                checked={privacy === "Private"}
                control={<Radio />}
              />
            </RadioGroup>
          </Box>
          <CardActions>
            <Button
              variant="secondary"
              endIcon={<CheckRoundedIcon />}
              onClick={() => privacySubmit()}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              startIcon={<CloseRoundedIcon />}
              onClick={() => privacyCancel()}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Modal>
      {/* <ImgModal img={img} imgModal={imgModal} setImgModal={setImgModal} /> */}
    </>
  );
}
