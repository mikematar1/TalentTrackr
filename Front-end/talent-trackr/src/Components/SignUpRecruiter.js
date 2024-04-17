import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SignUpRecruiter = () => {
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
    <div className={`signup-container ${loaded ? "loaded" : ""}`}>
      <div className="signup main">
        <img className="login-img" src="/title.png" alt="logo" />
        <p className="login-p">Please fill in your company's information</p>
        <div className="login-inputs">
          <input type="text" placeholder="Name" className="login-input" />
          <input
            type="text"
            placeholder="Linkedin URL"
            className="login-input"
          />
          <input
            type="text"
            placeholder="Description"
            className="login-input"
          />
          <input
            type="file"
            accept="image/*"
            placeholder="Company Logo"
            className="login-input"
          />
        </div>
        <div className="login-btn-ctn">
          <Link to="/verificationrecruiter">
            <button className="login-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpRecruiter;
