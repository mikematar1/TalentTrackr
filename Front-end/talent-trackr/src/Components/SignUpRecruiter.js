import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SignUpRecruiter = () => {
  const [loaded, setLoaded] = useState(false);
  const [fileName, setFileName] = useState(""); // State to store the file name

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Handle the file input change event to update the file name
  const handleFileChange = (event) => {
    const file = event.target.files[0];
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
        <p className="login-p">Please fill in your company's information</p>
        <div className="login-inputs">
          <input type="text" placeholder="Name" className="login-input" />
          <input
            type="text"
            placeholder="LinkedIn URL"
            className="login-input"
          />
          <input
            type="text"
            placeholder="Description"
            className="login-input"
          />

          {/* Custom file input button for image upload */}
          <div className="custom-file-button" onClick={handleClick}>
            <span className="custom-file-button-text">
              {fileName ? fileName : "Upload Company Logo"}{" "}
              {/* Display selected file name or default text */}
            </span>
            <input
              type="file"
              id="file-input"
              accept="image/*" // Accept all image types
              className="hidden-file-input"
              onChange={handleFileChange} // Handle file change
            />
          </div>
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
