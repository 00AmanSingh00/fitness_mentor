import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Logo from "../assets/images/Logo.png";
import Logout from "./Logout";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => (
  <Stack
    direction="row"
    justifyContent="space-between" // Changed to space-between to push logout to the right
    sx={{
      gap: { sm: "123px", xs: "20px" },
      mt: { sm: "32px", xs: "20px" },
      px: "20px",
      alignItems: "center",
    }}
  >
    <Link to="/">
      <img
        src={Logo}
        alt="logo"
        style={{ width: "48px", height: "48px", margin: "0px 20px" }}
      />
    </Link>
    <Stack
      direction="row"
      gap={{ sm: "40px", xs: "20px" }}
      fontFamily="Alegreya"
      fontSize={{ sm: "24px", xs: "18px" }}
      alignItems="center"
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          fontSize: { sm: "33px", xs: "24px" },
          fontFamily: "Arial",
          textShadow: "2px 2px 4px #08fcd0",
    color: "white",
          borderBottom: "3px solid #8e9091",
        }}
      >
        Home
      </Link>
      <a
        href="#exercises"
        style={{
          textDecoration: "none",
          fontSize: { sm: "21px", xs: "18px" },
          fontFamily: "Arial",
          textShadow: "2px 2px 4px #08fcd0",
    color: "white",
        }}
      >
        Exercises
      </a>
    </Stack>
    {isAuthenticated && (
      <Logout
        setIsAuthenticated={setIsAuthenticated}
        sx={{ fontSize: { sm: "21px", xs: "18px" } }}
      />
    )}
  </Stack>
);

export default Navbar;