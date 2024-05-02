import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Register from "../api-client/Auth/Register";

const SignUpRecruiter = () => {
  const [loaded, setLoaded] = useState(false);
  const [companyName, setCompanyName] = useState(""); // State for company name
  const [linkedinURL, setLinkedinURL] = useState(""); // State for LinkedIn URL
  const [description, setDescription] = useState(""); // State for company description
  const [fileName, setFileName] = useState(""); // State for uploaded file name
  const [logo_base64, setLogoUrl] = useState(""); // State to store base64-encoded image
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

  const validateName = (name) => {
    return name.length > 3;
  };

  const validateDescription = (desc) => {
    return desc.length <= 100 && desc.length > 10;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Store the file name

      // Convert the file to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;

        // Extract the base64 content by splitting on the first comma
        const base64Only = base64Data.split(",")[1]; // Get the base64 part

        setLogoUrl(base64Only); // Store only the base64-encoded data
      };

      reader.readAsDataURL(file); // Start reading the file to get the base64 data
    }
  };

  const handleClick = () => {
    setError("");
    document.getElementById("file-input").click(); // Trigger the hidden file input
  };

  const handleSignUp = () => {
    setError("");

    if (!companyName) {
      setError("Please enter your company's name.");
      return;
    }
    if (!validateName(companyName)) {
      setError("Please enter a valid name.");
      return;
    }

    if (!linkedinURL) {
      setError("Please enter your company's LinkedIn URL.");
      return;
    }

    if (!validateURL(linkedinURL)) {
      setError("Please enter a valid LinkedIn profile URL.");
      return;
    }

    if (!description) {
      setError("Please enter your company's description.");
      return;
    }
    if (!validateDescription(description)) {
      setError("Please enter a valid description.");
      return;
    }
    if (!fileName) {
      setError("Please provide your company's logo.");
      return;
    }

    const data_recruiter = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      type: 0,
      password: data.password,
      company_name: companyName,
      company_linkedin: linkedinURL,
      description,
      logo_base64,
    };

    let response = Register(data_recruiter);
    response.then((res) => {
      if (res.status === 422) {
        setError("The email has already been taken");
      } else {
        let token = res.data.authorisation.token;
        localStorage.setItem("token", "Bearer " + token);
        localStorage.setItem("usertype", 0);
        axios.defaults.headers.common["Authorization"] = "Bearer" + token;
        navigate("/recruiterhome");
      }
    });
  };

  return (
    <div className={`signup-container ${loaded ? "loaded" : ""}`}>
      <div className="signup main">
        <img className="login-img" src="/title.png" alt="logo" />
        <p className="login-p">Please fill in your company's information</p>
        <div className="login-inputs">
          <input
            type="text"
            placeholder="Company Name"
            className="login-input"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
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
          <input
            type="text"
            placeholder="Company Description"
            className="login-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => {
              setError("");
            }}
          />

          {/* Custom file input button for image upload */}
          <div className="custom-file-button" onClick={handleClick}>
            <span className="custom-file-button-text">
              {fileName || "Upload Company Logo"}{" "}
              {/* Display file name or default */}
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

export default SignUpRecruiter;
