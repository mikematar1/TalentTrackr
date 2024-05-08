import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FetchCred from "../api-client/Auth/FetchCred";
import axios from "axios";

const Login = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
  }, []);

  //Validators
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Apply overflow: hidden to body during transition
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [loaded]);

  // Function to handle login
  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (!validatePassword(password)) {
      if (!password) {
        setError("Please enter your password");
        return;
      }
      setError("Password must be at least 8 characters long.");
      return;
    }

    const data = { email, password };
    let response = FetchCred(data);
    response.then((res) => {
      if (res.data.status === "error") {
        setError("Wrong credentials, Try again");
      } else {
        let token = res.data.authorisation.token;
        localStorage.setItem("token", "Bearer " + token);
        localStorage.setItem("usertype", res.data.user.user_type);
        localStorage.setItem("shouldReload", "false");
        axios.defaults.headers.common["Authorization"] = "Bearer" + token;
        const userType =
          res.data.user.user_type === 1
            ? "seeker"
            : res.data.user.user_type === 0
            ? "recruiter"
            : "nouser";

        if (userType === "seeker") {
          navigate("/seekerhome");
        } else if (userType === "recruiter") {
          localStorage.setItem("id", res.data.user.id);
          navigate("/recruiterhome");
        }
      }
    });
  };

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
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
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
            onFocus={() => {
              setError("");
            }}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            onFocus={() => {
              setError("");
            }}
          />
        </div>
        <div className="error-space">
          {error && <p className="error-message">{error}</p>}
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
