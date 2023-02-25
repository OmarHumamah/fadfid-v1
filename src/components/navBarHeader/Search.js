import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
const StyledLink = styled(Link)(({ theme }) => ({
  ...theme.link,
}));
const StyledDiv = styled("div")(({ theme }) => ({
  height: "400px",
  overflow: "scroll",
}));

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
      if (post.text)
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
    <Accordion>
      <AccordionSummary expandIcon={<SearchIcon />}>
        <InputBase
          placeholder="Search..."
          onChange={(e) => searchHandler(e.target.value)}
        />
      </AccordionSummary>
      {search && (
        <AccordionDetails>
          <ToggleButtonGroup
            fullWidth
            value={radioValue}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radios.map((r, n) => (
              <ToggleButton key={n} value={r.value}>
                {r.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {radioValue === "2" && (
            <List>
              {searchResults
                .filter((res) => res.cover)
                .filter((u) => u.subId !== userId.subId)
                .map((res, n) => (
                  <>
                    <StyledLink href={`/${res.userName}`}>
                      <ListItem key={n} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar src={res.pic} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${res.firstName} ${res.lastName}`}
                          secondary={
                            <React.Fragment>{res.userName}</React.Fragment>
                          }
                        />
                      </ListItem>
                    </StyledLink>
                    <Divider variant="inset" component="li" />
                  </>
                ))}
            </List>
          )}
          {radioValue === "1" && (
            <StyledDiv>
              <List>
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
                    <>
                      <ListItem key={n}>
                        <StyledLink href={`${window.location.pathname?window.location.pathname:"/"}#${res.id}`}>
                          <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                              avatar={
                                <Avatar
                                  src={
                                    res.anonymous
                                      ? ""
                                      : users.find((u) => u.subId === res.subId)
                                          .pic
                                  }
                                />
                              }
                              title={
                                res.anonymous
                                  ? "Anonymous post"
                                  : `${
                                      users.find((u) => u.subId === res.subId)
                                        .firstName
                                    } ${
                                      users.find((u) => u.subId === res.subId)
                                        .lastName
                                    }`
                              }
                              subheader={props.formatDate(res.postTime)}
                            />
                            {res.picture && (
                              <CardMedia
                                component="img"
                                height="194"
                                image={res.picture}
                              />
                            )}
                            <CardContent>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {`${res.text.slice(0, 45)}${
                                  res.text.length > 45 ? ". . .read more" : ""
                                }`}
                              </Typography>
                            </CardContent>
                          </Card>
                        </StyledLink>
                      </ListItem>
                    </>
                  ))}
              </List>
            </StyledDiv>
          )}
        </AccordionDetails>
      )}
    </Accordion>
  );
}
