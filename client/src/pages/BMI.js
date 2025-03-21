import React, { useState, useEffect } from "react";
import { Box, Typography, Slider, Card, CardContent, Button } from "@mui/material";

const BMI = () => {
  const [height, setHeight] = useState(5);
  const [weight, setWeight] = useState(60);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState("");

  // List of colors to use for the gradient
  const colors = [
    "#d6ab33", "#4ab6f0", "#04314a", "#a67367", "#bac767", "#1c1f0d", "#5c5e4f", 
    "#c8e60b", "#fa1d11", "#1199fa", "#07eded", "#13f21f", "#65d907", "#ff7f50", 
    "#8a2be2", "#ff1493", "#00ced1", "#ffd700", "#7cfc00","#a84742","#422d2c","#4d0502","#f75216","#947063","#f0910c","#857604","#11ed14","#29f078","#05f7db","#043cb5","#9e11f5","#ed34fa","#f707a7","#f5206a","#f04152","#f05348","#f2190a","#f06429","#63250a","#f27a0a","#f5d41b","#fad502","#cbf71b","#72fa0a","#06d61b","#025c0b","#10ebad","#27f1f5","#03061f","#34035e","#7e038f","#f00eb4","#360228","#570328","#ed0946","#730211"
  ];

  useEffect(() => {
    const heightInMeters = height * 0.3048;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue >= 18.5 && bmiValue < 25) setCategory("Normal");
    else setCategory("Obese");
  }, [height, weight]);

  const exercises = {
    Underweight: ["Push-ups: 5 sets of 8 reps", "Squats: 4 sets of 10 reps", "Lunges: 3 sets of 12 reps"],
    Normal: ["Jump Rope: 10 min", "Burpees: 5 sets of 15 reps", "Deadlifts: 4 sets of 8 reps"],
    Obese: ["Walking: 30 min", "Swimming: 20 min", "Bodyweight Squats: 3 sets of 10 reps"]
  };

  const diet = {
    Underweight: ["Eggs", "Milk", "Avocados", "Nuts"],
    Normal: ["Chicken", "Brown Rice", "Vegetables", "Greek Yogurt"],
    Obese: ["Oatmeal", "Salads", "Lean Protein", "Fruits"]
  };

  return (
    <Box sx={{ maxWidth: "600px", mx: "auto", mt: 5, textAlign: "center", p: 3 }}>
      <Typography variant="h4" fontWeight="bold" sx={{  textShadow: "2px 2px 4px #08fcd0",
    color: "white", }}>
        BMI Calculator
      </Typography>
      <Typography variant="h6" sx={{ color: "white" }}>
        Adjust the sliders to calculate your BMI
      </Typography>

      <Box sx={{ mx: "auto", width: "80%", mt: 3 }}>
        <Typography variant="h6" sx={{ color: "#cae6e8" }}>Height: {height} ft</Typography>
        <Slider
          min={2} max={8} step={0.1} value={height}
          onChange={(e, newValue) => setHeight(newValue)}
          valueLabelDisplay="auto"
          sx={{ width: "80%", mx: "auto", color: "#43fadf" }}
        />

        <Typography variant="h6" sx={{ color: "#cae6e8", mt: 3 }}>Weight: {weight} kg</Typography>
        <Slider
          min={30} max={150} value={weight}
          onChange={(e, newValue) => setWeight(newValue)}
          valueLabelDisplay="auto"
          sx={{ width: "80%", mx: "auto", color: "#43fadf" }}
        />
      </Box>

      <Typography variant="h5" mt={3} fontWeight="bold" sx={{ color: "#e1e3e3" }}>
        Your BMI: {bmi} ({category})
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          mt: 5,
          p: 3,
          borderRadius: 2,
          background: `linear-gradient(45deg, ${colors.join(", ")})`,
          backgroundSize: "400% 400%",
          animation: "gradientFlow 15s ease infinite",
          marginLeft: { xs: "30px", sm: 0 }, // Shift 30px to the right on small screens
        }}
      >
        <Card sx={{ width: { xs: "100%", sm: 300 }, p: 2, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#494a32" }}>
              Recommended Exercises
            </Typography>
            {exercises[category]?.map((exercise, index) => (
              <Typography key={index} sx={{ color: "#474740" }}>{exercise}</Typography>
            ))}
          </CardContent>
        </Card>

        <Card sx={{ width: { xs: "100%", sm: 300 }, p: 2, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#494a32" }}>
              Recommended Diet
            </Typography>
            {diet[category]?.map((food, index) => (
              <Typography key={index} sx={{ color: "#474740" }}>{food}</Typography>
            ))}
          </CardContent>
        </Card>
      </Box>

      

      {/* CSS for gradient animation */}
      <style>
        {`
          @keyframes gradientFlow {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default BMI;