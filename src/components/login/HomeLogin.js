import { AppBar, Box, styled, Toolbar, Typography } from "@mui/material";
import React from "react";
import LoginButton from "./LoginButton";
import logo2 from "../../assets/FadFid-logo-3.png";
import logo from "../../assets/FadFid-logo-2.png";
import bg from "../../assets/bg-welcome.png";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: theme.palette.backgroundColor,
}));
const SmLogo = styled("img")(({ theme }) => ({
  width: "100px",
}));
const Image = styled("img")(({ theme }) => ({
  width: "140px",
}));
const BgDiv = styled("img")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: -1,
  height: "100%",
   overflow: "hidden"
}));
const Text = styled(Typography)(({ theme }) => ({
  textAlign: "justify",
  fontSize: 10,
  color: "GrayText",
  padding: 12,
  flex: 1,
}));
const BottomDivStyle = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  borderTop: "solid 1px grey",
  color: "grey",
}));

const BodyStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {xs:320, sm:550},
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: 2,
  // backgroundImage: `url(${bg})`
};

export default function HomeLogin(props) {
  return (
    <div>
      
      <AppBar position="sticky">
        <StyledToolbar>
          <SmLogo alt="FadFid" src={logo2} />
          <LoginButton />
        </StyledToolbar>
      </AppBar>
      <Box sx={BodyStyle}>
        <Image src={logo} />
        <Typography color={"#3B9190"} fontWeight={"bold"} fontSize={25}>
          WELCOME!
        </Typography>
        <Typography fontSize={14} color={"GrayText"}>
          We're excited to have you join our community and connect with people
          from all over the world.
        </Typography>
        <Box sx={{display: {xs: "block", md:"flex"}}} justifyContent="space-between">
          <Text>
            Our platform is designed to help you share your interests, connect
            with friends and family, and discover new things to love.
          </Text>
          <Text>
            You can quickly create a profile, find and add friends, and start
            sharing your thoughts and photos.
          </Text>
          <Text>
            Personal information is protected and your privacy is respected. Our
            platform has various features that enable you to control your
            account settings and customize your experience.
          </Text>
          <Text>
            The anonymous mood feature allows users to express themselves more
            freely without fear of judgment. This can provide a safe space for
            users to share their opinions.
          </Text>
        </Box>
        <LoginButton />
      </Box>
      <BottomDivStyle>
        <p style={{ marginTop: "5px", marginBottom: "10px" }}>
          FadFid v1 Beta © {new Date().getFullYear()}
        </p>
      </BottomDivStyle>
      <BgDiv sx={{width: {xs:410,sm:900, lg:1050}}} src={bg}/>
    </div>
  );
}
