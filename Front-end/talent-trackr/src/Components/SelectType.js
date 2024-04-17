import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SelectType = () => {
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
        <div className="signup-box">
          <div className="signup-box-h1">
            <h1>Who are you?</h1>
          </div>
          <div className="signup-box-btns">
            <Link to="/seekersignup">
              <button className="select-btn">Job Seeker</button>
            </Link>
            <Link to="/recruitersignup">
              <button className="select-btn">Job Recruiter</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectType;
