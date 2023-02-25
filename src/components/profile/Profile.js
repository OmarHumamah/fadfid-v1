import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { SettingContext } from "../../context/Context";
import Search from "../navBarHeader/Search";
import SideBar from "../navBarHeader/SideBar";
import Post from "../posts/Post";
import ProfileCard from "./ProfileCard";

export default function Profile(props) {
  const {
    updateUser,
    formatDate,
    posts,
    getPosts,
    user,
    getAllUsers,
    allUsers,
  } = useContext(SettingContext);
  useEffect(() => {
    getAllUsers();
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userId = allUsers.find((u) => u.subId === user.sub);

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
        <Box flex={4} sx={{ padding: { xs: 0, sm: 2 }, height: "200%" }}>
          <Box mb={2}>
            <ProfileCard
              userId={userId}
              setFriendsModal={props.setFriendsModal}
            />
          </Box>
          {!posts.filter((post) => post.subId === user.sub).length && (
            <Box sx={{ height: { xs: "567px", sm: "190px" } }}>
              <Typography textAlign="center" color="GrayText">
                You have no posts yet!
              </Typography>
            </Box>
          )}
          {posts
            .filter((post) => post.subId === user.sub)
            .sort((a, b) => b.postTime - a.postTime)
            .map((post, n) => (
              <Box key={n} mb={1}>
                <Post content={post} />
              </Box>
            ))}
          {posts.filter((post) => post.subId === user.sub).length === 1 && (
            <Box sx={{ height: { xs: "250px", sm: "0" } }}></Box>
          )}
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
