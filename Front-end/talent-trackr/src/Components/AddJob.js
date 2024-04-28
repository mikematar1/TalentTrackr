import React, { useState, useEffect } from "react";

const AddJob = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64File, setBase64File] = useState(""); // Store base64 string

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    document.getElementById("file-input").click(); // Trigger the hidden file input
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Store the uploaded file

    // Convert the file to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      setBase64File(event.target.result); // Store the base64 data
    };
    reader.readAsDataURL(file); // Trigger the file reading
  };

  const handleUpload = () => {
    // Perform an action with the base64 data (e.g., send it to the backend)
    if (base64File) {
      console.log("Base64 File:", base64File); // For demonstration purposes
    }
  };

  return (
    <div className={`home-container seeker ${loaded ? "loaded" : ""}`}>
      <div className="profile-edit">
        <div className="profile-header">
          <h1>Add Job</h1>
          {/* Download Button */}
          <a
            href="/job_posting_template.doc"
            download="job_posting_template.doc"
          >
            <button className="login-btn">Download Template</button>
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
                {selectedFile ? selectedFile.name : "Upload Template"}
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
        <button className="login-btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default AddJob;
