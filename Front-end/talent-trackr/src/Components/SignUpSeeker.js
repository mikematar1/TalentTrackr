import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Register from "../api-client/Auth/Register";

const SignUpSeeker = () => {
  const [loaded, setLoaded] = useState(false);
  const [dob, setDob] = useState(""); // State for company name
  const [linkedinURL, setLinkedinURL] = useState(""); // State for LinkedIn URL
  const [fileName, setFileName] = useState(""); // State for uploaded file name
  const [resume, setResume] = useState(""); // State to store base64-encoded image
  const [error, setError] = useState(""); // State for error messages
  const location = useLocation();
  const navigate = useNavigate();

  const { data } = location.state || {}; // Destructure data from the previous page

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const validateURL = (url) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/.*$" // Simple LinkedIn URL pattern
    );
    return urlPattern.test(url); // Returns true if it matches
  };

  const validateDate = (dob) => {
    const ageLimit = 18;
    const parsedDate = Date.parse(dob);
    if (dob === "") {
      return false;
    }
    // Check if input is a valid date string
    if (isNaN(parsedDate)) {
      return false;
    }

    const inputDate = new Date(parsedDate);

    // Check if input date is in the future
    if (inputDate.getTime() > Date.now()) {
      return false;
    }

    const diff = Date.now() - inputDate.getTime();
    const age = new Date(diff);

    // Check if age is exactly 18 years old
    if (age.getUTCFullYear() - 1970 === ageLimit) {
      const todayYear = new Date().getFullYear();
      const isLeapYear = new Date(todayYear, 1, 29).getMonth() === 1;

      if (isLeapYear) {
        // Leap year, so February 29th is valid
        return inputDate.getMonth() === 1 && inputDate.getDate() === 29;
      } else {
        // Not a leap year, so February 28th is valid
        return inputDate.getMonth() === 1 && inputDate.getDate() === 28;
      }
    }

    return age.getUTCFullYear() - 1970 >= ageLimit;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Update the file name state

      // Convert the file to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        setResume(e.target.result); // Store the base64-encoded image
      };
      reader.readAsDataURL(file); // Trigger the reading process
    }
  };

  const handleClick = () => {
    setError("");
    document.getElementById("file-input").click(); // Trigger file input click
  };

  const handleSignUp = () => {
    setError("");

    if (!dob) {
      setError("Please enter your date of birth.");
      return;
    }
    if (!validateDate(dob)) {
      setError("Please enter a valid date of birth.");
      return;
    }
    if (!linkedinURL) {
      setError("Please enter your LinkedIn URL.");
      return;
    }

    if (!validateURL(linkedinURL)) {
      setError("Please enter a valid LinkedIn profile URL.");
      return;
    }
    if (!fileName) {
      setError("Please provide your resume.");
      return;
    }
    const data_seeker = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      type: 1,
      password: data.password,
      linkedin: linkedinURL,
      dob,
      resume,
    };

    let response = Register(data_seeker);
    response.then((res) => {
      if (res.status === 422) {
        setError("The email has already been taken");
      } else {
        let token = res.data.authorisation.token;
        localStorage.setItem("token", "Bearer " + token);
        localStorage.setItem("usertype", res.data.user.user_type);
        axios.defaults.headers.common["Authorization"] = "Bearer" + token;
        navigate("/seekerhome");
      }
    });
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
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            onFocus={() => {
              setError("");
            }}
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            className="login-input"
            value={linkedinURL}
            onChange={(e) => setLinkedinURL(e.target.value)}
            onFocus={() => {
              setError("");
            }}
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

        <div className="error-space">
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="login-btn-ctn">
          <button onClick={handleSignUp} className="login-btn">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpSeeker;
