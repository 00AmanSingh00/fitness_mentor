import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import logout from "../assets/icons/logout.png";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isRotating, setIsRotating] = React.useState(false); // State to control rotation
  const [isClicked, setIsClicked] = React.useState(false); // State to track if the button is clicked

  const handleLogout = async () => {
    try {
      // Trigger rotation and color change
      setIsClicked(true);
      setIsRotating(true);

      // Wait for the rotation animation to complete (1 second)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Perform logout
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error.response?.data);
    } finally {
      // Reset rotation and click state
      setIsRotating(false);
      setIsClicked(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      sx={{
        fontSize: { sm: "14px", xs: "11px" },
        fontFamily: "Arial",
        color: isClicked ? "black" : "#3A1212", // Change color to black when clicked
        background: "transparent",
        border: "none",
        cursor: "pointer",
        marginLeft: "auto",
        transform: isRotating ? "rotateY(180deg)" : "rotateY(0deg)", // Side-by-side rotation
        transition: "transform 1s ease, color 0.3s ease", // Smooth transition for rotation and color
        "&:hover": {
          background: "transparent", // Remove hover effect
        },
      }}
    >
      <img
        src={logout}
        alt="logout"
        style={{ width: "41px", height: "41px", margin: "0px 20px" }}
      />
    </Button>
  );
};

export default Logout;