import React, { useState, useEffect } from "react";
import { Button, Popover, Typography, Slider } from "@mui/material";

function Filter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(5); // Default 5 feet
  const [bmi, setBmi] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isPaused, setIsPaused] = useState(false);
  const [currentReps, setCurrentReps] = useState(0);
  const [currentSets, setCurrentSets] = useState(0);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // BMI Calculation
  useEffect(() => {
    const heightInMeters = height * 0.3048;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue);
  }, [weight, height]);

  // Helper function to determine BMI category
  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return "underweight";
    if (bmi >= 18.5 && bmi < 25) return "normal";
    return "obese";
  };

  // Reps & Sets Calculation
  const getRepSetByAge = (age) => {
    if (age <= 10) return { sets: 0, reps: 0 };
    if (age > 60) return { sets: 3, reps: 3 };
    if (age > 55) return { sets: 5, reps: 4 };
    if (age > 35) return { sets: 8, reps: 5 };
    return { sets: 10, reps: 7 };
  };

  const getRepSetByWeight = (weight) => {
    if (weight < 40) return { sets: 3, reps: 5 };
    if (weight >= 40 && weight < 60) return { sets: 5, reps: 6 };
    if (weight >= 60 && weight < 80) return { sets: 7, reps: 8 };
    if (weight >= 80 && weight < 100) return { sets: 9, reps: 10 };
    return { sets: 10, reps: 12 };
  };

  const repSetByAge = getRepSetByAge(age);
  const repSetByWeight = getRepSetByWeight(weight);
  const avgSets = Math.round((repSetByAge.sets + repSetByWeight.sets) / 2);
  const avgReps = Math.round((repSetByAge.reps + repSetByWeight.reps) / 2);

  // Timer & Exercise Logic
  useEffect(() => {
    let timerInterval;
    let repInterval;

    if (timerActive && !isPaused && !exerciseCompleted) {
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      repInterval = setInterval(() => {
        setCurrentReps((prevReps) => {
          if (prevReps + 1 >= avgReps) {
            setCurrentSets((prevSets) => {
              const newSetCount = prevSets + 1;
              if (newSetCount >= avgSets) {
                clearInterval(timerInterval);
                clearInterval(repInterval);
                setTimerActive(false);
                if (!exerciseCompleted && !alertShown) {
                  setExerciseCompleted(true);
                  setAlertShown(true);
                  alert("Exercise Set is completed!");
                }
                return avgSets;
              }
              return newSetCount;
            });
            return 0;
          }
          return prevReps + 1;
        });
      }, 2000);
    }

    return () => {
      clearInterval(timerInterval);
      clearInterval(repInterval);
    };
  }, [timerActive, isPaused, exerciseCompleted, alertShown, avgReps, avgSets]);

  const startTimer = () => {
    setTimerActive(true);
    setIsPaused(false);
    setTimeLeft(300);
    setCurrentReps(0);
    setCurrentSets(0);
    setExerciseCompleted(false);
    setAlertShown(false);
    setAnchorEl(null);
  };

  const pauseTimer = () => setIsPaused(!isPaused);

  const stopTimer = () => {
    setTimerActive(false);
    setTimeLeft(0);
    setCurrentReps(0);
    setCurrentSets(0);
    setExerciseCompleted(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {timerActive && (
        <div>
          <Typography variant="h6">
            Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </Typography>
          <Typography variant="h6">
            Set: {currentSets}/{avgSets} | Reps: {currentReps}/{avgReps}
          </Typography>
          <Button variant="contained" onClick={pauseTimer}>
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={stopTimer}
            style={{ marginLeft: "10px" }}
          >
            Stop
          </Button>
        </div>
      )}

      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        style={{ marginTop: "20px", backgroundColor: "#494a32", color: "#fff" }}
      >
        Filter
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ padding: "20px", width: "250px", backgroundColor: "#c8cc68" }}>
          <Typography variant="subtitle1">Select Age</Typography>
          <Typography>Age: {age}</Typography>
          <Slider
            min={10}
            max={100}
            value={age}
            onChange={(e, newValue) => setAge(newValue)}
            valueLabelDisplay="auto"
            style={{ color: "#474740" }}
          />

          <Typography variant="subtitle1" style={{ marginTop: "15px" }}>
            Select Weight
          </Typography>
          <Typography>Weight: {weight} kg</Typography>
          <Slider
            min={30}
            max={150}
            value={weight}
            onChange={(e, newValue) => setWeight(newValue)}
            valueLabelDisplay="auto"
            style={{ color: "#474740" }}
          />

          <Typography variant="subtitle1" style={{ marginTop: "15px" }}>
            Select Height
          </Typography>
          <Typography>Height: {height} ft</Typography>
          <Slider
            min={2}
            max={8}
            step={0.1}
            value={height}
            onChange={(e, newValue) => setHeight(newValue)}
            valueLabelDisplay="auto"
            style={{ color: "#474740" }}
          />

          <Typography variant="body1" style={{ marginTop: "10px", fontWeight: "bold" }}>
            BMI: {bmi.toFixed(2)} ({((bmi / 40) * 100).toFixed(2)}%) {getBmiCategory(bmi)}
          </Typography>

          <Typography variant="body1" style={{ marginTop: "10px", fontWeight: "bold" }}>
            Final Workout: {avgSets} Sets of {avgReps} Reps
          </Typography>

          <Button variant="contained" onClick={startTimer} style={{ marginTop: "15px", backgroundColor: "#474740", color: "#fff" }}>
            Start 5 Min Timer
          </Button>
        </div>
      </Popover>
    </div>
  );
}

export default Filter;