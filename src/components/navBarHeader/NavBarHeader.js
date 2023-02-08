import { useContext, useEffect } from "react";
import {
  Image,
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { SettingContext } from "../../context/Context";
import LogoutButton from "../login/LogoutButton";
import Search from "./Search";

function NavBarHeader() {
  const {
    allUsers,
    user,
    updateUser,
    getAllUsers,
    getPosts,
    posts,
    formatDate,
  } = useContext(SettingContext);

  useEffect(() => {
    getAllUsers();
    getPosts();
  }, []);

  const userId = allUsers.find((u) => u.subId === user.sub);
  const acceptFriendReqHandler = (req) => {
    updateUser(userId.id, {
      pendingFriendsReq: userId.pendingFriendsReq.filter(
        (u) => u.id !== req.id
      ),
      friends: [...userId.friends, { id: req.id }],
    });
    updateUser(allUsers.find((u) => u.subId === req.id).id, {
      friends: [
        ...allUsers.find((u) => u.subId === req.id).friends,
        { id: userId.subId },
      ],
    });
  };

  const suggestionsArr = allUsers.filter((u) => u.subId !== userId.subId);
  suggestionsArr.filter((u) => !userId.friends.some((f) => f.id === u.subId));
  return (
    <>
      {
        <Navbar bg="light" expand={false} className="mb-3">
          <Container fluid>
            <Navbar.Brand>
              <Link to="/">FadFid</Link>
            </Navbar.Brand>
            <div style={{ display: "flex" }}>
              {userId && userId.pendingFriendsReq.length > 0 && (
                <p style={{ color: "red" }}>* You have friend requests</p>
              )}
              <Navbar.Toggle
                variant="primary"
                aria-controls={`offcanvasNavbar`}
              />
            </div>
            <Navbar.Offcanvas
              id={`offcanvasNavbar`}
              aria-labelledby={`offcanvasNavbarLabel`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <a href="/profile">
                  <Offcanvas.Title id={`offcanvasNavbarLabel`}>
                    <Image
                      src={userId && userId.pic}
                      roundedCircle
                      width={40}
                    />
                    {`${userId && userId.firstName} ${
                      userId && userId.lastName
                    }`}
                  </Offcanvas.Title>
                </a>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {posts && allUsers && (
                  <Search posts={posts} userId={userId} allUsers={allUsers} formatDate={formatDate}/>
                )}
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavDropdown title="Friends" id={`offcanvasNavbarDropdown`}>
                    <NavDropdown
                      title={`All Friends (${userId && userId.friends.length})`}
                    >
                      <ListGroup>
                        {userId && userId.friends.length === 0 && (
                          <ListGroup.Item>
                            You have no friends, find some from Suggestions
                          </ListGroup.Item>
                        )}
                        {userId &&
                          userId.friends.map((f, n) => (
                            <ListGroup.Item key={n}>
                              <a
                                href={
                                  "/" +
                                  allUsers.find((u) => u.subId === f.id)
                                    .userName
                                }
                              >
                                <Image
                                  src={
                                    allUsers.find((u) => u.subId === f.id).pic
                                  }
                                  roundedCircle
                                  width={40}
                                />
                                {`${
                                  allUsers.find((u) => u.subId === f.id)
                                    .firstName
                                } ${
                                  allUsers.find((u) => u.subId === f.id)
                                    .lastName
                                }`}
                              </a>
                            </ListGroup.Item>
                          ))}
                      </ListGroup>
                    </NavDropdown>
                    <NavDropdown
                      title={`Friend requests (${
                        userId && userId.pendingFriendsReq.length
                      })`}
                    >
                      <ListGroup>
                        {userId && userId.pendingFriendsReq.length === 0 && (
                          <ListGroup.Item>
                            You have no friend requests!
                          </ListGroup.Item>
                        )}
                        {userId &&
                          userId.pendingFriendsReq.map((req, n) => (
                            <ListGroup.Item key={n}>
                              <a
                                href={`/${
                                  allUsers.find((u) => u.subId === req.id)
                                    .userName
                                }`}
                              >
                                <Image
                                  src={
                                    allUsers.find((u) => u.subId === req.id).pic
                                  }
                                  roundedCircle
                                  width={40}
                                />
                                {`${
                                  allUsers.find((u) => u.subId === req.id)
                                    .firstName
                                } ${
                                  allUsers.find((u) => u.subId === req.id)
                                    .lastName
                                }`}
                              </a>
                              <hr />
                              <Button
                                onClick={() => acceptFriendReqHandler(req)}
                              >
                                Accept
                              </Button>
                              <Button
                                onClick={() =>
                                  updateUser(userId.id, {
                                    pendingFriendsReq:
                                      userId.pendingFriendsReq.filter(
                                        (u) => u.id !== req.id
                                      ),
                                  })
                                }
                              >
                                Delete
                              </Button>
                            </ListGroup.Item>
                          ))}
                      </ListGroup>
                    </NavDropdown>
                    <NavDropdown title="Suggestions">
                      <ListGroup>
                        {suggestionsArr
                          .filter(
                            (u) => !userId.friends.some((f) => f.id === u.subId)
                          )
                          .map((u, n) => (
                            <ListGroup.Item key={n}>
                              <a href={`/${u.userName}`}>
                                <Image src={u.pic} roundedCircle width={40} />
                                {`${u.firstName} ${u.lastName}`}
                                {!userId.pendingFriendsReq.find(
                                  (x) => x.id === u.subId
                                ) && (
                                  <>
                                    <p>Send Friend request!</p>
                                  </>
                                )}
                                {userId.pendingFriendsReq.find(
                                  (x) => x.id === u.subId
                                ) && (
                                  <>
                                    <p>{`${u.firstName} has sent you a friend request!`}</p>
                                  </>
                                )}
                              </a>
                              <hr />
                            </ListGroup.Item>
                          ))}
                      </ListGroup>
                    </NavDropdown>
                  </NavDropdown>
                  <NavDropdown title="Settings">
                    <p>Light / Dark mood</p>
                    <p>anonymous</p>
                    <p>language</p>
                    <p>Hide friends</p>
                    <p>Change name</p>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save Changes</Button>
                  </NavDropdown>
                  <LogoutButton />
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      }
    </>
  );
}

export default NavBarHeader;
