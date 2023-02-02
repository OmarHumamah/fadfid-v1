import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { SettingContext } from "../../context/Context";
import Post from "../posts/Post";
import PostForm from "./PostForm";

export default function Wall() {
  const { posts, getPosts,getAllUsers } = useContext( SettingContext )

  useEffect(() => {
    getAllUsers()
    getPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div>
      <Container>
      <PostForm/>
    </Container>
      <Container>
        {posts.map((post,n) => <Post key={n} content={post}/> )}
      </Container>
    </div>
  );
}
