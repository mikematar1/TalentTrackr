import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SignUpSeeker = () => {
  const [loaded, setLoaded] = useState(false);
  const [fileName, setFileName] = useState(""); // State for storing the file name

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file selected
    if (file) {
      setFileName(file.name); // Set the state to the file name
    }
  };

  const handleClick = () => {
    document.getElementById("file-input").click(); // Trigger file input click
  };

  return (
    <div className={`signup-container ${loaded ? "loaded" : ""}`}>
      <div className="signup main">
        <img className="login-img" src="/title.png" alt="logo" />
        <p className="login-p">Please fill in your information</p>
        <div className="login-inputs">
          <input
            type="date"
            placeholder="Date of Birth"
            className="login-input"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            className="login-input"
          />

          <div className="custom-file-button" onClick={handleClick}>
            <span className="custom-file-button-text">
              {fileName ? fileName : "Upload Resume"}{" "}
              {/* Conditionally render the text */}
            </span>
            <input
              type="file"
              id="file-input"
              className="hidden-file-input"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange} // Handle the file change event
            />
          </div>
        </div>

        <div className="login-btn-ctn">
          <Link to="/seekerhome">
            <button className="login-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpSeeker;
