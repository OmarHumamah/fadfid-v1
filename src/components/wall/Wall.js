import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { SettingContext } from "../../context/Context";
import Post from "../posts/Post";
import PostForm from "./PostForm";

export default function Wall() {
  const { posts, getPosts, getAllUsers, allUsers, user } = useContext(SettingContext);

  useEffect(() => {
    getAllUsers();
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userId = allUsers.find((u) => u.subId === user.sub);

  return (
    <div>
      <Container>
        <PostForm />
      </Container>
      <Container>
        {posts
          .sort((a, b) => b.postTime - a.postTime)
          .filter((p) => p.privacy !== "Private")
          .filter((p) =>
            p.privacy === "Friends"
              ? userId.friends.find((u) => u.id === p.subId)
              : p.privacy === "All"
          )
          .map((post, n) => (
            <Post key={n} content={post} />
          ))}
      </Container>
    </div>
  );
}
