import { Box, Stack } from "@mui/material";
import React, { useContext } from "react";
import { SettingContext } from "../../context/Context";
import Search from "../navBarHeader/Search";
import SideBar from "../navBarHeader/SideBar";
import Post from "../posts/Post";
import PostForm from "./PostForm";

export default function Wall(props) {
  const { allUsers, user, updateUser, formatDate } = useContext(SettingContext);

  const userId = allUsers.find((u) => u.subId === user.sub);
  const posts = props.posts;
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
            {userId && (
              <SideBar
                userId={userId}
                allUsers={allUsers}
                updateUser={updateUser}
                posts={posts}
                formatDate={formatDate}
              />
            )}
          </Box>
        </Box>
        <Box flex={4} sx={{ padding: { xs: 0, sm: 2 } }}>
          <Box mb={1}>{userId && <PostForm userId={userId} />}</Box>

          {posts
            .sort((a, b) => b.postTime - a.postTime)
            .filter((p) => p.privacy !== "Private")
            .filter((p) =>
              p.privacy === "Friends"
                ? userId.friends.find((u) => u.id === p.subId)
                : p.privacy === "All"
            )
            .map((post, n) => (
              <Box mb={1}>
                {" "}
                <Post key={n} content={post} />
              </Box>
            ))}
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
