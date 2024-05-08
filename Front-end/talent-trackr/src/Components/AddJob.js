import React, { useState, useEffect } from "react";
import AddListing from "../api-client/HomeRecruiter/AddListing";

const AddJob = () => {
  const [loaded, setLoaded] = useState(false);
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState(""); // Store base64 string
  const [error, setError] = useState(false); // Store base64 string
  const [fileChanged, setFileChanged] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false); // Track whether the template has been downloaded

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    document.getElementById("file-input").click(); // Trigger the hidden file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setFileChanged(true);

      // Convert the file to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;

        // Extract the base64 content by splitting on the first comma
        const base64Only = base64Data.split(",")[1]; // Get the base64 part

        setBase64(base64Only); // Store only the base64-encoded data
      };

      reader.readAsDataURL(file); // Start reading the file to get the base64 data
    }
  };
  const isButtonDisabled = () => {
    return !fileChanged;
  };
  const handleDownloadClick = () => {
    setTimeout(() => {
      setHasDownloaded(true); // Set state after 1 second delay
    }, 1000); // Timeout in milliseconds
  };

  const handleUpload = () => {
    const data_recruiter = {};
    if (fileChanged) {
      data_recruiter.base64 = base64;
    }

    let response = AddListing(data_recruiter);
    response.then((res) => {
      if (res.status === 500) {
        setError(true);
      } else {
        setError(false);
        localStorage.setItem("shouldReload", true);
      }
      setChangesMade(true);
      setFileChanged(false);
      setFile(null);
      document.getElementById("file-input").value = ""; // Reset file input
      setTimeout(() => setChangesMade(false), 2000); // Hide message after 2 seconds
    });
  };

  return (
    <div className={`home-container seeker ${loaded ? "loaded" : ""}`}>
      <div className="profile-edit">
        <div className="profile-header">
          <h1>Add Job</h1>
          {/* Download Button */}
          <a
            href={hasDownloaded ? null : "/job_posting_template.doc"}
            download="job_posting_template.doc"
            onClick={handleDownloadClick} // Set the state when clicked
          >
            <button
              className="login-btn"
              disabled={hasDownloaded} // Disable button if downloaded
              style={{
                opacity: hasDownloaded ? 0.7 : 1, // Change opacity to indicate disabled state
              }}
            >
              Download Template
            </button>
          </a>
        </div>
        <div className="add-description">
          <p>
            To add a new job listing, please download the template, fill in the
            required information, and re-upload the completed file. Ensure the
            details are correct before uploading.
          </p>
        </div>
        {/* File Upload Input */}
        <div className="login-inputs-profile">
          <div className="login-inputs">
            <div className="custom-file-button profile" onClick={handleClick}>
              <span className="custom-file-button-text">
                {file ? file.name : "Upload Template"}
              </span>
              <input
                type="file"
                id="file-input"
                className="hidden-file-input"
                accept=".doc,.docx"
                onChange={handleFileChange} // Handle the file change event
              />
            </div>
          </div>
        </div>
        {/* Upload Button */}
        <button
          className="login-btn"
          onClick={handleUpload}
          disabled={isButtonDisabled()}
          style={{
            opacity: isButtonDisabled() ? 0.7 : 1,
          }}
        >
          Save Changes
        </button>
        {changesMade ? (
          error ? (
            <div className="change-message error">
              <p>Invalid File</p>{" "}
            </div>
          ) : (
            <div className="change-message add">
              <p>Job Added</p>{" "}
            </div>
          )
        ) : null}{" "}
      </div>
    </div>
  );
};

export default AddJob;
