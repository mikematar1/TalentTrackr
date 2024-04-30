import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SelectType = () => {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  let navigate = useNavigate();

  const { data } = location.state || {}; // Destructure the data object from the location's state

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

  const handleSeeker = () => {
    navigate("/signupseeker", {
      state: { data },
    });
  };

  const handleRecruiter = () => {
    navigate("/signuprecruiter", {
      state: { data },
    });
  };

  return (
    <div className={`signup-container ${loaded ? "loaded" : ""}`}>
      <div className="signup main">
        <img className="login-img" src="/title.png" alt="logo" />
        <div className="signup-box">
          <div className="signup-box-h1">
            <h1>Who are you?</h1>
          </div>
          <div className="signup-box-btns">
            <button onClick={handleSeeker} className="select-btn">
              Job Seeker
            </button>
            <button onClick={handleRecruiter} className="select-btn">
              Job Recruiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectType;
