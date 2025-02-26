import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate("/auth", { replace: true }); // Ensure redirect to auth page
    } catch (error) {
      console.error("Logout failed:", error.response?.data);
    }
  };

  return (
    <button onClick={handleLogout} style={styles.button}>Logout</button>
  );
};

const styles = {
  button: {
    fontSize: "21px",
    paddingBottom: "7px",
    fontFamily: "Arial",
    color: "#3A1212",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
};

export default Logout;
