import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSeeker = () => {
  const [loaded, setLoaded] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Seeker",
    email: "seeker@example.com",
    dateOfBirth: "1990-01-01",
    linkedIn: "https://www.linkedin.com",
    resume: null, // Handle the uploaded file
  });
  let navigate = useNavigate();

  const handleClick = () => {
    document.getElementById("file-input").click(); // Trigger file input click
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      resume: e.target.files[0], // Store the uploaded file
    }));
  };

  return (
    <div className={`home-container seeker ${loaded ? "loaded" : ""}`}>
      <div className="profile-edit">
        <div className="profile-header">
          <h1>Edit Profile</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
        <div className="login-inputs-profile">
          <div className="login-inputs">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="login-input profile"
              value={profileData.fullName}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="login-input profile"
              value={profileData.email}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              className="login-input profile"
              value={profileData.dateOfBirth}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="linkedIn"
              placeholder="LinkedIn URL"
              className="login-input profile"
              value={profileData.linkedIn}
              onChange={handleInputChange}
            />
            <div className="custom-file-button profile" onClick={handleClick}>
              <span className="custom-file-button-text">
                {profileData.resume ? profileData.resume.name : "Upload Resume"}
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
        </div>

        <button className="login-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default ProfileSeeker;
