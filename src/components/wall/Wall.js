import React from "react";
import { Container } from "react-bootstrap";
import wall from "../../assets/home.png";
import Post from "../posts/Post";
import PostForm from "./PostForm";

export default function Wall() {
  return (
    <div>
      <Container>
      <PostForm/>
    </Container>
      <Container>
      <Post/>
      </Container>
      <img src={wall} />
    </div>
  );
}
