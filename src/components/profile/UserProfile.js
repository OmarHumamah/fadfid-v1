import React, { useContext, useEffect } from "react";
import {
  Card,
  Container,
  Image,
  Stack,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { SettingContext } from "../../context/Context";
import Post from "../posts/Post";
export default function UserProfile() {
  const { getAllUsers, allUsers, posts, getPosts, updateUser, user } =
    useContext(SettingContext);
  const { userName } = useParams();
  const userProfileId = allUsers.find((u) => u.userName === userName);
  const userId = allUsers.find((u) => u.subId === user.sub);
  useEffect(() => {
    getAllUsers();
    getPosts();
  }, []);

  const sendFriendReq = () => {
    updateUser(userProfileId.id, {
      pendingFriendsReq: [...userProfileId.pendingFriendsReq, { id: user.sub }],
    });
  };
  const unSendFriendReq = () => {
    updateUser(userProfileId.id, {
      pendingFriendsReq: userProfileId.pendingFriendsReq.filter(
        (u) => u.id !== user.sub
      ),
    });
  };
  const acceptFriendReqHandler = () => {
    updateUser(userId.id, {
      pendingFriendsReq: userId.pendingFriendsReq.filter(
        (u) => u.id !== userProfileId.subId
      ),
      friends: [...userId.friends, { id: userProfileId.subId }],
    });
    updateUser(userProfileId.id, {
      friends: [...userProfileId.friends, { id: userId.subId }],
    });
  };
  const unFriendHandler = ()=>{
    updateUser(userId.id, {
      friends: userId.friends.filter(
        (u) => u.id !== userProfileId.subId
      ),
    })
    updateUser(userProfileId.id, {
      friends: userProfileId.friends.filter(
        (u) => u.id !== userId.subId
      ),
    })
  }  
  const isISentHim = userProfileId.pendingFriendsReq.some(
    (u) => u.id === user.sub
  );
  const isHeSentMe = userId.pendingFriendsReq.some(
    (u) => u.id === userProfileId.subId
  );
  const isHeMyFriend = userId.friends.some((u) => u.id === userProfileId.subId);
  return (
    <div>
      <Container>
        <Card>
          <Card.Img variant="top" src={userProfileId.cover} />
          <Card.Body>
            <Card.Title>
              <Stack direction="horizontal" gap={3}>
                <div>
                  <Image
                    roundedCircle
                    width="120 rem"
                    src={userProfileId.pic}
                  />
                </div>
                <div>
                  <p>{`${userProfileId.firstName} ${userProfileId.lastName}`}</p>
                  <p>{userProfileId.gender}</p>
                </div>
              </Stack>
            </Card.Title>
            <Card.Text>{userProfileId.bio}</Card.Text>
            <Card.Text>{userProfileId.birthday}</Card.Text>
          </Card.Body>
          <Card.Footer>
            {isHeMyFriend
              ? false
              : !isISentHim &&
                !isHeSentMe && (
                  <Button onClick={() => sendFriendReq()}>
                    Send friend request
                  </Button>
                )}
            {}
            {userProfileId.pendingFriendsReq.find((u) => u.id === user.sub) && (
              <Button
                variant="outline-primary"
                onClick={() => unSendFriendReq()}
              >
                Unsent friend request
              </Button>
            )}
            {isHeSentMe && (
              <ButtonGroup>
                <Button onClick={() => acceptFriendReqHandler()}>Accept</Button>
                <Button
                  onClick={() =>
                    updateUser(userId.id, {
                      pendingFriendsReq: userId.pendingFriendsReq.filter(
                        (u) => u.id !== userProfileId.subId
                      ),
                    })
                  }
                >
                  X
                </Button>
              </ButtonGroup>
            )}
            { isHeMyFriend&&
              <Button onClick={()=>unFriendHandler()}>Unfriend</Button>
              }
          </Card.Footer>
        </Card>
        <Card>
          <Stack direction="horizontal">
            {userProfileId.interests &&
              userProfileId.interests.map((i, n) => (
                <div key={n} className="bg-light border">
                  {i}
                </div>
              ))}
          </Stack>
        </Card>
      </Container>
      <Container>
        {posts
          .filter((post) => post.userName === userName)
          .map((post, n) => (
            <Post key={n} content={post} />
          ))}
      </Container>
    </div>
  );
}
