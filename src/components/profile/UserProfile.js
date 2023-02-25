import {
  FemaleRounded,
  MaleRounded,
  PersonAddDisabledRounded,
  PersonAddRounded,
  PersonRemoveRounded,
  TagRounded,
} from "@mui/icons-material";
import {
  Button,
  Card,
  Stack,
  Box,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  CardActions,
  Chip,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SettingContext } from "../../context/Context";
import ActionAlert from "../alert/Alert";
import Search from "../navBarHeader/Search";
import SideBar from "../navBarHeader/SideBar";
import Post from "../posts/Post";
export default function UserProfile(props) {
  const {
    formatDate,
    getAllUsers,
    allUsers,
    posts,
    getPosts,
    updateUser,
    user,
  } = useContext(SettingContext);
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const { userName } = useParams();
  const userProfileId = allUsers.find((u) => u.userName === userName);
  const userId = allUsers.find((u) => u.subId === user.sub);
  useEffect(() => {
    getAllUsers();
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendFriendReq = () => {
    updateUser(userProfileId.id, {
      pendingFriendsReq: [...userProfileId.pendingFriendsReq, { id: user.sub }],
    });
  };
  const unSendFriendReq = () => {
    updateUser(userProfileId.id, {
      pendingFriendsReq: userProfileId.pendingFriendsReq.filter(
        (u) => u.id !== user.sub
      ),
    });
  };
  const acceptFriendReqHandler = () => {
    updateUser(userId.id, {
      pendingFriendsReq: userId.pendingFriendsReq.filter(
        (u) => u.id !== userProfileId.subId
      ),
      friends: [...userId.friends, { id: userProfileId.subId }],
    });
    updateUser(userProfileId.id, {
      friends: [...userProfileId.friends, { id: userId.subId }],
    });
  };
  const unFriendHandler = () => {
    updateUser(userId.id, {
      friends: userId.friends.filter((u) => u.id !== userProfileId.subId),
    });
    updateUser(userProfileId.id, {
      friends: userProfileId.friends.filter((u) => u.id !== userId.subId),
    });
    handleCloseAlert();
  };
  const isISentHim = userProfileId.pendingFriendsReq.some(
    (u) => u.id === user.sub
  );
  const isHeSentMe = userId.pendingFriendsReq.some(
    (u) => u.id === userProfileId.subId
  );
  const isHeMyFriend = userId.friends.some((u) => u.id === userProfileId.subId);
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Stack direction="row" justifyContent="space-between ">
        <Box
          sx={{ display: { xs: "none", lg: "block" } }}
          flex={2}
          bgcolor={(theme) => theme.palette.backgroundColor}
          p={1}
          borderRight="solid 1px lightGray"
        >
          <Box position="fixed" height="95%">
            <SideBar
              userId={userId}
              allUsers={allUsers}
              updateUser={updateUser}
              posts={posts}
              formatDate={formatDate}
            />
          </Box>
        </Box>
        <Box flex={4} sx={{ padding: { xs: 0, sm: 2 } }}>
          <Box pb>
            <Card>
              <CardMedia sx={{ height: 140 }} image={userProfileId.cover} />
              <CardContent>
                <Stack mt={-3} direction="row" alignItems="center">
                  <Box flex={2}>
                    <Avatar
                      sx={{ width: "120px", height: "120px" }}
                      src={userProfileId.pic}
                    />
                  </Box>
                  <Box flex={5}>
                    <Typography gutterBottom variant="h5" component="div">
                      {`${userProfileId.firstName} ${userProfileId.lastName}`}
                      {userProfileId.gender === "Male" ? (
                        <MaleRounded />
                      ) : (
                        <FemaleRounded />
                      )}
                    </Typography>
                    <Typography color="text.secondary">
                      {userProfileId.birthday}
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    {isHeMyFriend
                      ? false
                      : !isISentHim &&
                        !isHeSentMe && (
                          <Chip
                            color="success"
                            variant="outlined"
                            label="Add Friend"
                            icon={<PersonAddRounded />}
                            onClick={() => sendFriendReq()}
                          />
                        )}
                    {}
                    {userProfileId.pendingFriendsReq.find(
                      (u) => u.id === user.sub
                    ) && (
                      <Chip
                        variant="outlined"
                        color="success"
                        onClick={() => unSendFriendReq()}
                        label="Cancel Request"
                        icon={<PersonAddDisabledRounded />}
                      />
                    )}
                    {isHeSentMe && (
                      <Chip
                        color="success"
                        label="Accept"
                        onClick={() => acceptFriendReqHandler()}
                        onDelete={() =>
                          updateUser(userId.id, {
                            pendingFriendsReq: userId.pendingFriendsReq.filter(
                              (u) => u.id !== userProfileId.subId
                            ),
                          })
                        }
                      />
                    )}
                    {isHeMyFriend && (
                      <>
                        <Chip
                          icon={<PersonRemoveRounded />}
                          variant="outlined"
                          color="error"
                          onClick={() => setOpenAlert(true)}
                          label="Unfriend"
                        />
                        <ActionAlert
                          content={`Are you sure you want to remove ${userProfileId.firstName} ${userProfileId.lastName} as your friend?`}
                          openAlert={openAlert}
                          closeAlert={handleCloseAlert}
                          action={unFriendHandler}
                        />
                      </>
                    )}
                    <Button
                      variant="secondary"
                      onClick={() =>
                        !userProfileId.friendsHide &&
                        props.setFriendsModal({
                          show: true,
                          friends: userProfileId.friends,
                        })
                      }
                    >{`Friends(${userProfileId.friends.length})`}</Button>
                  </Box>
                </Stack>
                <Box mr={5} ml={18}>
                  <Typography variant="body2" color="text.secondary">
                    {userProfileId.bio}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                {userProfileId.interests && (
                  <Stack direction="row" spacing={1}>
                    {userProfileId.interests.map((i, n) => (
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
          </Box>
          {!posts.filter((post) => post.userName === userName).length && (
            <Box sx={{ height: { xs: "567px", sm: "190px" } }}>
              <Typography textAlign="center" color="GrayText">
                You have no posts yet!
              </Typography>
            </Box>
          )}
          {posts
            .filter((post) => post.userName === userName)
            .filter((post) => !post.anonymous)
            .sort((a, b) => b.postTime - a.postTime)
            .filter((p) => p.privacy !== "Private")
            .filter((p) =>
              p.privacy === "Friends"
                ? userId.friends.find((u) => u.id === p.subId)
                : p.privacy === "All"
            )
            .map((post, n) => (
              <Box key={n} mb={1}>
                <Post content={post} />
              </Box>
            ))}
            {posts.filter((post) => post.userName === userName).length===1 &&<Box sx={{ height: { xs: "250px", sm: "0" } }}>
              
              </Box>}
        </Box>
        <Box
          sx={{ display: { xs: "none", sm: "flex" } }}
          flex={2}
          bgcolor={(theme) => theme.palette.backgroundColor}
          justifyContent="center"
          borderLeft="solid 1px lightGray"
          p={1}
        >
          <Box position="fixed" height="80%">
            <Search
              posts={posts}
              userId={userId}
              allUsers={allUsers}
              formatDate={formatDate}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
