import styled from "@emotion/styled";
import {
  Avatar,
  Card,
  Divider,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";

const StyledLink = styled("a")(({ theme }) => ({
  ...theme.link,
  margin: 5,
}));
const postModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FriendsModal(props) {
  let friendsModal = props.friendsModal;
  let setFriendsModal = props.setFriendsModal;
  let user = props.user;
  let allUsers = props.allUsers;
  return (
    <div>
      <Modal
        open={friendsModal.show}
        onClose={() => setFriendsModal({ show: false, friends: [] })}
      >
        <Card sx={postModalStyle}>
          <Typography>Friends</Typography>
          <List>
            {friendsModal.friends.map((f, n) => (
              <>
                <ListItem key={n}>
                  <Avatar src={allUsers.find((u) => u.subId === f.id).pic} />
                  <StyledLink
                    href={
                      "/" + user &&
                      allUsers.find((u) => u.subId === user.sub).subId === f.id
                        ? "profile"
                        : allUsers.find((u) => u.subId === f.id).userName
                    }
                  >
                    {`${allUsers.find((u) => u.subId === f.id).firstName} ${
                      allUsers.find((u) => u.subId === f.id).lastName
                    }`}
                  </StyledLink>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Card>
      </Modal>
    </div>
  );
}
