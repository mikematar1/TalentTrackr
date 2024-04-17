import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const VerificationRecruiter = () => {
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
        <p className="login-p verification">
          Thank you for your interest in our website! Once your account is
          verified, you'll be able to log in.
        </p>

        <div className="login-btn-ctn">
          <Link to="/">
            <button className="login-btn">Return to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationRecruiter;
