// import React, {useContext} from "react";
import { Container } from "react-bootstrap";
// import Post from "../posts/Post";
import ProfileCard from "./ProfileCard";
// import { SettingContext } from "../../context/Context";


export default function Profile() {
  // const {user ,posts} = useContext( SettingContext )
  // const userPosts =  will get filtered post from DB based on username
  return (
    <div>
      <Container>
        <ProfileCard />
      </Container>
      <Container>
      {/* {userPosts.map(post => <Post content={post}/>)} */}
      </Container>
    </div>
  );
}
