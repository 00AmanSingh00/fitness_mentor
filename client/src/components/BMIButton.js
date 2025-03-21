import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BMIButton = () => {
  const navigate = useNavigate();
  return (
    <Button variant="contained" onClick={() => navigate("/bmi")} sx={{ mt: 2, backgroundColor: "#494a32", color: "#fff" }}>
      Check BMI
    </Button>
  );
};

export default BMIButton;
