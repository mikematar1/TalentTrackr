import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import GetProfile from "../api-client/ProfileSeeker/GetProfile";

const ProfileSeeker = () => {
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("temppass"); // Track password separately
  const [fileChanged, setFileChanged] = useState(false); // Track if file is changed
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  const {
    status,
    error,
    data: profileData,
  } = useQuery({
    queryKey: ["profiledata"],
    queryFn: GetProfile,
    refetchOnWindowFocus: false, // Disable refetch on window focus
    staleTime: Infinity, // Never re-fetch based on staleness
    cacheTime: Infinity, // Keep the cache forever
  });
  useEffect(() => {
    if (status === "success" && profileData) {
      setUsername(profileData.first_name + " " + profileData.last_name);
      setEmail(profileData.email);
      setDob(profileData.dob);
      setLinkedIn(profileData.linkedin);
      setLoading(false);
    } else if (error) {
      console.log(error);
    }
  }, [profileData, status, error]);

  const handleClick = () => {
    document.getElementById("file-input").click(); // Trigger file input click
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    navigate("/"); // Redirect to home on logout
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileChanged(true); // Mark that file has been changed
    }
  };

  const isButtonDisabled = () => {
    const isPasswordInvalid = password === "" || password.length < 6;
    return isPasswordInvalid || (!fileChanged && password === "temppass");
  };

  return (
    <div className={`home-container seeker ${loaded ? "loaded" : ""}`}>
      {loading ? (
        <div className="buffer-space">
          <div className="buffer-loader"></div>
        </div>
      ) : (
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
                value={username}
                readOnly // Make the input read-only
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="login-input profile"
                value={email}
                readOnly // Make the input read-only
              />
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                className="login-input profile"
                value={dob}
                readOnly // Make the input read-only
              />
              <input
                type="text"
                name="linkedIn"
                placeholder="LinkedIn URL"
                className="login-input profile"
                value={linkedIn}
                readOnly // Make the input read-only
              />
              <input
                type="password"
                name="password"
                placeholder="Change Password"
                className="login-input profile-password"
                value={password} // Use the password state
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPassword("")}
              />
              <div className="custom-file-button profile" onClick={handleClick}>
                <span className="custom-file-button-text">
                  {file ? file.name : "Upload Resume"}
                </span>
                <input
                  type="file"
                  id="file-input"
                  className="hidden-file-input"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange} // Handle file change
                />
              </div>
            </div>
          </div>

          <button
            className="login-btn"
            disabled={isButtonDisabled()}
            style={{
              opacity: isButtonDisabled() ? 0.7 : 1,
            }}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSeeker;
