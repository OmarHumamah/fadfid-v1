import React from "react";
import { Container } from "react-bootstrap";
import profile from "../../assets/profile.png";
import Post from "../posts/Post";
import ProfileCard from "./ProfileCard";

export default function Profile() {
  return (
    <div>
      <Container>
        <ProfileCard />
      </Container>
      <Container>
        <Post />
      </Container>
      <img src={profile} />
    </div>
  );
}
