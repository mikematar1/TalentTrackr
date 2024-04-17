import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loaded, setLoaded] = useState(false);

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

  return (
    <div className={`login-container ${loaded ? "loaded" : ""}`}>
      <div className="left-side login">
        <img src="/title.png" alt="logo" />
        <p>Log in to access your account</p>
        <div className="login-inputs">
          <input type="text" placeholder="Email" className="login-input" />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />
        </div>
        <div className="login-no-acc">
          <p>Don’t have an account?</p>
          <Link className="signup-link" to="/signupmain">
            Sign Up
          </Link>
        </div>
        <button>Sign In</button>
      </div>

      <div className="right-side login">
        <img src="/login-img.jpg" alt="logo" />
      </div>
    </div>
  );
};

export default Login;
