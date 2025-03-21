import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    try {
      const response = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );
      console.log("Auth response:", response.data);
      setMessage(response.data.message);

      if (isLogin && response.data.message === "Login successful") {
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Auth error:", error.response?.data);
      setMessage(error.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.authBox}>
        <h2 style={styles.heading}>{isLogin ? "Login" : "Signup"}</h2>
        <form onSubmit={handleAuth} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
        <p style={styles.message}>{message}</p>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={styles.switchButton}
        >
          {isLogin ? "Switch to Signup" : "Switch to Login"}
        </button>
      </div>
      <footer style={styles.footer}></footer>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    position: "relative",
    fontFamily: " Helvetica", // Font family set to Fraktur
  },
  authBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#0e0f0f", // Auth card background set to black
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "10px 7px 4px #1c1c1c",
    textShadow: "2px 2px 4px #08fcd0",
    color: "white",
  },
  heading: {
    fontSize: "27px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  label: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "280px",
    height: "40px",
    fontSize: "18px",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "14px",
    border: "1px solid #ccc",
    color: "white", // Input text color
  },

  button: {
    width: "270px",
    height: "45px",
    fontSize: "20px",
    background: "#0f0b00",
    color: "white",
    border: "1px solid #1f1e1d",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },

  switchButton: {
    marginTop: "10px",
    fontSize: "18px",
    background: "transparent",
    border: "none",
    color: "grey",
    cursor: "pointer",
  },
  message: {
    fontSize: "16px",
    color: "red", // Error message color remains red for visibility
    marginTop: "10px",
  },
  footer: {
    position: "absolute",
    bottom: "10px",
    width: "100%",
    textAlign: "center",
    fontSize: "16px",
    color: "#555",
  },
};

export default Auth;
