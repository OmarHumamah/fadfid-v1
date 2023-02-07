import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { SettingContext } from "../../context/Context";
import Post from "../posts/Post";
import ProfileCard from "./ProfileCard";

export default function Profile() {
  const { posts, getPosts, user, getAllUsers } = useContext(SettingContext);
  useEffect(() => {
    getAllUsers();
    getPosts();
  }, []);

  return (
    <div>
      <Container>
        <ProfileCard />
      </Container>
      <Container>
        {posts
          .filter((post) => post.subId === user.sub)
          .map((post, n) => (
            <Post key={n} content={post} />
          ))}
      </Container>
    </div>
  );
}
