import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { SettingContext } from "../../context/Context";
import Post from "../posts/Post";
import PostForm from "./PostForm";


export default function Wall() {
  const {posts} = useContext( SettingContext )
  return (
    <div>
      <Container>
      <PostForm/>
    </Container>
      <Container>
        {posts.map(post => <Post content={post}/> )}
      </Container>
    </div>
  );
}
