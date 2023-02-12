import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { SettingContext } from "../../context/Context";
import Post from "../posts/Post";
import PostForm from "./PostForm";

export default function Wall(props) {
  const { allUsers, user } = useContext(SettingContext);

  const userId = allUsers.find((u) => u.subId === user.sub);
  const posts = props.posts;
  return (
    <div>
      <Container>{userId && <PostForm userId={userId} />}</Container>
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
