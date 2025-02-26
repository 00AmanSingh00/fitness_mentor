import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";

import "./App.css";
import ExerciseDetail from "./pages/ExerciseDetail";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Auth from "./components/Auth";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Box width="400px" sx={{ width: { xl: "1488px" } }} m="auto">
     <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        {isAuthenticated === null ? (
          <></> // Show nothing until authentication is determined
        ) : isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/auth" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </>
        )}
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
