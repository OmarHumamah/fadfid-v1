import React, { useState } from "react";
import {
  Form,
  Card,
  Container,
  ButtonGroup,
  ToggleButton,
  ListGroup,
  Image,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

export default function Search(props) {
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [radioValue, setRadioValue] = useState("1");
  const posts = props.posts;
  const users = props.allUsers;
  const userId = props.userId;
  const radios = [
    {
      name:
        "Posts" +
        `(${
          searchResults
            .filter((res) => res.postTime)
            .filter((p) => p.privacy !== "Private")
            .filter((p) =>
              p.privacy === "Friends"
                ? userId.friends.find((u) => u.id === p.subId)
                : p.privacy === "All"
            ).length
        })`,
      value: "1",
    },
    {
      name:
        "People" +
        `(${
          searchResults
            .filter((res) => res.cover)
            .filter((u) => u.subId !== userId.subId).length
        })`,
      value: "2",
    },
  ];
  const searchHandler = (e) => {
    if (e !== "") {
      setSearch(true);
      setSearchResults(searchArray(e, posts, users));
    } else {
      setSearchResults([]);
      setSearch(false);
    }
  };
  const searchArray = (event, posts, users) => {
    const searchTerm = event.toLowerCase();
    const results = [];

    for (const post of posts) {
      if (post.text.toLowerCase().includes(searchTerm)) {
        results.push(post);
      }
    }

    for (const user of users) {
      if (user.userName.toLowerCase().includes(searchTerm)) {
        results.push(user);
      } else if (user.firstName.toLowerCase().includes(searchTerm)) {
        results.push(user);
      } else if (user.lastName.toLowerCase().includes(searchTerm)) {
        results.push(user);
      }
    }

    return results;
  };

  return (
    <div>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => searchHandler(e.target.value)}
        />
      </Form>
      {search && (
        <Container>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-secondary" : "outline-secondary"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          {radioValue === "2" && (
            <ListGroup>
              {searchResults
                .filter((res) => res.cover)
                .filter((u) => u.subId !== userId.subId)
                .map((res, n) => (
                  <ListGroup.Item key={n}>
                    <a href={`/${res.userName}`}>
                      <div style={{ display: "flex" }}>
                        <Image src={res.pic} roundedCircle width={40} />
                        <p>{`${res.firstName} ${res.lastName}`}</p>
                      </div>
                      <p>{res.userName}</p>
                    </a>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
          {radioValue === "1" && (
            <ListGroup>
              {searchResults
                .filter((res) => res.postTime)
                .sort((a, b) => b.postTime - a.postTime)
                .filter((p) => p.privacy !== "Private")
                .filter((p) =>
                  p.privacy === "Friends"
                    ? userId.friends.find((u) => u.id === p.subId)
                    : p.privacy === "All"
                )
                .map((res, n) => (
                  <ListGroup.Item key={n}>
                    <a href={"/#"+res.id}>
                      <Card>
                        <CardHeader style={{ display: "flex" }}>
                          <Image
                            src={users.find((u) => u.subId === res.subId).pic}
                            roundedCircle
                            width={35}
                          />
                          <p>{`${
                            users.find((u) => u.subId === res.subId).firstName
                          } ${
                            users.find((u) => u.subId === res.subId).lastName
                          }`}</p>
                        </CardHeader>
                        <Card.Body>
                          <Card.Title>
                            <Image src={res.picture} rounded width={100} />
                          </Card.Title>
                          <Card.Text>
                            {`${res.text.slice(0, 45)}${
                              res.text.length > 45 ? ". . .read more" : ""
                            }`}
                            <hr />
                            {props.formatDate(res.postTime)}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </a>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </Container>
      )}
    </div>
  );
}
