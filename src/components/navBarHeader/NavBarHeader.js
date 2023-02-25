import {
  AppBar,
  Avatar,
  IconButton,
  styled,
  SwipeableDrawer,
  Toolbar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useContext, useState } from "react";
import { SettingContext } from "../../context/Context";
import { Link } from "react-router-dom";
import logo from "../../assets/FadFid-logo-5.png";
import logo2 from "../../assets/FadFid-logo-3.png";
import SideBar from "./SideBar";
import LogoutButton from "../login/LogoutButton";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: theme.palette.backgroundColor,
}));
const Brand = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));
const XsLogo = styled("img")(({ theme }) => ({
  width: "100px",
  position: "relative",
  top: "30%",
  left: "10%",
}));
const SmLogo = styled("img")(({ theme }) => ({
  width: "100px",
}));
export default function NavBarHeader() {
  const {
    allUsers,
    user,

    updateUser,
    posts,
    formatDate,
  } = useContext(SettingContext);

  const [openSideBar, setOpenSideBar] = useState(false);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  const userId = allUsers.find((u) => u.subId === user.sub);

  const StyledLink = styled(Link)(({ theme }) => ({
    ...theme.link
  }));
  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Brand>
            <IconButton
              onClick={() => setOpenSideBar(true)}
              sx={{ display: { xs: "block", lg: "none" } }}
            >
              <Badge
                color="error"
                variant="dot"
                invisible={!userId.pendingFriendsReq.length}
              >
                <MenuIcon />
              </Badge>
            </IconButton>
            <Link to="/">
              <SmLogo
                sx={{ display: { xs: "none", lg: "block" } }}
                alt="FadFid"
                src={logo2}
              />
              <XsLogo
                sx={{ display: { xs: "block", lg: "none" } }}
                alt="FadFid"
                src={logo}
              />
            </Link>
          </Brand>
          <IconButton
            onClick={() => setOpenAccountMenu(true)}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={openAccountMenu ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openAccountMenu ? "true" : undefined}
          >
            <Avatar
              sx={{ display: { xs: "block", sm: "block" } }}
              src={userId.pic}
            />
          </IconButton>

          <Menu
            anchorEl={openAccountMenu}
            id="account-menu"
            open={openAccountMenu}
            onClose={() => setOpenAccountMenu(false)}
            onClick={() => setOpenAccountMenu(false)}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <MenuItem onClick={() => setOpenAccountMenu(false)}>
              <StyledLink to="/profile">
                <Avatar
                  sx={{ display: { xs: "block", sm: "block" } }}
                  src={userId.pic}
                />
                Profile
              </StyledLink>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => setOpenAccountMenu(false)}>
              <LogoutButton />
            </MenuItem>
          </Menu>
        </StyledToolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={openSideBar}
        onClose={() => setOpenSideBar(false)}
        onOpen={() => setOpenSideBar(true)}
      >
        <Box p={2} overflow="hidden">
          {userId && <SideBar
            userId={userId}
            allUsers={allUsers}
            updateUser={updateUser}
            posts={posts}
            formatDate={formatDate}
          />}
        </Box>
      </SwipeableDrawer>
    </>
  );
}
