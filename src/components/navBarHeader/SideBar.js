import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
  List,
  ListItem,
  Typography,
  styled,
  ListItemAvatar,
  ListItemText,
  Chip,
  ListItemIcon,
  Badge,
  Box,
} from "@mui/material";
import {
  GroupAdd,
  ExpandMore,
  PersonAdd,
  EmojiPeopleSharp,
  GroupsSharp,
} from "@mui/icons-material/";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import Settings from "../settings/Settings";
import Search from "./Search";
import logo from "../../assets/FadFid-logo-3.png";
import { Link } from "react-router-dom";

const Logo = styled("img")(({ theme }) => ({
  width: "137px",
}));
const StyledLink = styled("a")(({ theme }) => ({
  ...theme.link
}));
const StyledDiv = styled("div")(({ theme }) => ({
  height: "200px",
  overflow: "scroll",
}));
const StyledDiv1 = styled("div")(({ theme }) => ({
  overflow: "scroll",
}));
const BottomDivStyle = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor,
  position: "fixed",
  bottom: 0,
  width: "300px",
  display: "flex",
  justifyContent: "center",
  // boxShadow: "0px 0px 10px 0px black",
  borderTop: "solid 1px grey",
  // margin: "-3px -15px",
  color: "grey",
}));
export default function SideBar(props) {
  const acceptFriendReqHandler = (req) => {
    props.updateUser(props.userId.id, {
      pendingFriendsReq: props.userId.pendingFriendsReq.filter(
        (u) => u.id !== req.id
      ),
      friends: [...props.userId.friends, { id: req.id }],
    });
    props.updateUser(props.allUsers.find((u) => u.subId === req.id).id, {
      friends: [
        ...props.allUsers.find((u) => u.subId === req.id).friends,
        { id: props.userId.subId },
      ],
    });
  };
  const suggestionsArr = props.allUsers.filter(
    (u) => u.subId !== props.userId.subId
  );
  suggestionsArr.filter(
    (u) => !props.userId.friends.some((f) => f.id === u.subId)
  );
  

  return (
    <>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Link to="/">
          <Logo src={logo} />
        </Link>
      </Box>
      <StyledDiv1
        sx={{ width: { xs: "300px", sm: "300px" } }}
        style={{
          overflow: "scroll",
          height: "90%",
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <Search
            posts={props.posts}
            userId={props.userId}
            allUsers={props.allUsers}
            formatDate={props.formatDate}
          />
        </Box>
        <Accordion>
          <AccordionSummary
            expandIcon={
              <Badge
                color="error"
                variant="dot"
                invisible={!props.userId.pendingFriendsReq.length}
              >
                <ExpandMore />
              </Badge>
            }
          >
            <Typography>Friends</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Accordion>
              <AccordionSummary>
                <ListItem>
                  <ListItemIcon>
                    <GroupsSharp />
                  </ListItemIcon>
                  <Typography>
                    ALL Friends {`(${props.userId.friends.length})`}
                  </Typography>
                </ListItem>
              </AccordionSummary>
              <AccordionDetails>
                <StyledDiv>
                  <List>
                    {props.userId.friends.length === 0 && (
                      <ListItem>
                        <Typography>
                          You have no friends, find some from Suggestions.
                        </Typography>
                      </ListItem>
                    )}
                    {props.userId.friends.map((f, n) => (
                      <div key={n}>
                        <StyledLink
                          href={
                            "/" +
                            props.allUsers.find((u) => u.subId === f.id)
                              .userName
                          }
                        >
                          <ListItem key={n} alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar
                                src={
                                  props.allUsers.find((u) => u.subId === f.id)
                                    .pic
                                }
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${
                                props.allUsers.find((u) => u.subId === f.id)
                                  .firstName
                              } ${
                                props.allUsers.find((u) => u.subId === f.id)
                                  .lastName
                              }`}
                              secondary={
                                <React.Fragment>
                                  {
                                    props.allUsers.find((u) => u.subId === f.id)
                                      .userName
                                  }
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </StyledLink>
                        <Divider variant="inset" component="li" />
                      </div>
                    ))}
                  </List>
                </StyledDiv>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>
                <ListItem>
                  <ListItemIcon>
                    <Badge
                      badgeContent={props.userId.pendingFriendsReq.length}
                      color="error"
                    >
                      <EmojiPeopleSharp />
                    </Badge>
                  </ListItemIcon>
                  <Typography>{`Friend Requests`}</Typography>
                </ListItem>
              </AccordionSummary>
              <AccordionDetails>
                <StyledDiv>
                  <List>
                    {props.userId.pendingFriendsReq.length === 0 && (
                      <ListItem>You have no friend requests!</ListItem>
                    )}
                    {props.userId.pendingFriendsReq.map((req, n) => (
                      <div key={n}>
                        <ListItem key={n}>
                          <div>
                            <StyledLink
                              href={`/${
                                props.allUsers.find((u) => u.subId === req.id)
                                  .userName
                              }`}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  src={
                                    props.allUsers.find(
                                      (u) => u.subId === req.id
                                    ).pic
                                  }
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={`${
                                  props.allUsers.find((u) => u.subId === req.id)
                                    .firstName
                                } ${
                                  props.allUsers.find((u) => u.subId === req.id)
                                    .lastName
                                }`}
                                secondary={
                                  <React.Fragment>
                                    {
                                      props.allUsers.find(
                                        (u) => u.subId === req.id
                                      ).userName
                                    }
                                  </React.Fragment>
                                }
                              />
                            </StyledLink>
                            <Chip
                              label="Accept"
                              color="success"
                              onClick={() => acceptFriendReqHandler(req)}
                              onDelete={() =>
                                props.updateUser(props.userId.id, {
                                  pendingFriendsReq:
                                    props.userId.pendingFriendsReq.filter(
                                      (u) => u.id !== req.id
                                    ),
                                })
                              }
                              icon={<GroupAdd />}
                            />
                          </div>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                    ))}
                  </List>
                </StyledDiv>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>
                <ListItem>
                  <ListItemIcon>
                    <PersonAdd />
                  </ListItemIcon>
                  <Typography>Suggestions</Typography>
                </ListItem>
              </AccordionSummary>
              <AccordionDetails>
                <StyledDiv>
                  <List>
                    {suggestionsArr
                      .filter(
                        (u) =>
                          !props.userId.friends.some((f) => f.id === u.subId)
                      )
                      .map((u, n) => (
                        <div key={n}>
                          <ListItem key={n} alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar src={u.pic} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${u.firstName} ${u.lastName}`}
                              secondary={
                                <React.Fragment>
                                  {!props.userId.pendingFriendsReq.find(
                                    (x) => x.id === u.subId
                                  ) && (
                                    <>
                                      <StyledLink href={`/${u.userName}`}>
                                        <p>Send a Friend request!</p>
                                      </StyledLink>
                                    </>
                                  )}
                                  {props.userId.pendingFriendsReq.find(
                                    (x) => x.id === u.subId
                                  ) && (
                                    <>
                                      <StyledLink href={`/${u.userName}`}>
                                        <p>{`${u.firstName} has sent you a friend request!`}</p>
                                      </StyledLink>
                                    </>
                                  )}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </div>
                      ))}
                  </List>
                </StyledDiv>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<SettingsIcon />}>
            <Typography>Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <StyledDiv>
              <Settings user={props.userId} updateUser={props.updateUser} />
            </StyledDiv>
          </AccordionDetails>
        </Accordion>
      </StyledDiv1>
      <BottomDivStyle>
        <p style={{ marginTop: "5px", marginBottom: "10px" }}>
          FadFid v1 Beta © {new Date().getFullYear()}
        </p>
      </BottomDivStyle>
    </>
  );
}
