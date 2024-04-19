import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loaded, setLoaded] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  let navigate = useNavigate();

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Apply overflow: hidden to body during transition
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [loaded]);

  // Function to handle login
  const handleLogin = () => {
    // Simulate authentication (replace with actual authentication logic)
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Reset error messages
    setEmailError("");
    setPasswordError("");

    // Check for empty fields
    if (!email) {
      setEmailError("Please enter your email");
      return;
    }
    if (!password) {
      setPasswordError("Please enter your password");
      return;
    }

    // For demonstration, assuming user is either "seeker" or "recruiter"
    const userType = email === "seeker@example.com" ? "seeker" : "recruiter";

    // Redirect based on user type
    if (userType === "seeker") {
      navigate("/seekerhome");
    } else {
      navigate("/recruiter");
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  // Function to handle input focus
  const handleInputFocus = () => {
    setEmailError("");
    setPasswordError("");
  };

  return (
    <div className={`login-container ${loaded ? "loaded" : ""}`}>
      <div className="left-side login">
        <img className="login-img" src="/title.png" alt="logo" />
        <p className="login-p">Log in to access your account</p>

        <div className="login-inputs">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="login-input"
            onKeyDown={handleKeyPress}
            onFocus={handleInputFocus}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="login-input"
            onKeyDown={handleKeyPress}
            onFocus={handleInputFocus}
          />
        </div>
        <div className="error-space">
          {emailError && <p className="error-message">{emailError}</p>}
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        <div className="login-no-acc">
          <p>Don’t have an account?</p>
          <Link className="signup-link" to="/signupmain">
            Sign Up
          </Link>
        </div>
        <button className="login-btn" onClick={handleLogin}>
          Sign In
        </button>
      </div>

      <div className="right-side login">
        <img src="/login-img.jpg" alt="logo" />
      </div>
    </div>
  );
};

export default Login;
