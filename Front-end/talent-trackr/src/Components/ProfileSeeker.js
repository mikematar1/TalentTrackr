import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import GetProfile from "../api-client/ProfileSeeker/GetProfile";
import EditProfile from "../api-client/ProfileSeeker/EditProfile";

const ProfileSeeker = () => {
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);
  const [password, setPassword] = useState("temppass"); // Track password separately
  const [fileChanged, setFileChanged] = useState(false); // Track if file is changed
  const [passChanged, setPassChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [changesMade, setChangesMade] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

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

        setResume(base64Only); // Store only the base64-encoded data
      };

      reader.readAsDataURL(file); // Start reading the file to get the base64 data
    }
  };

  const isButtonDisabled = () => {
    const isPasswordValid = passChanged && password.length >= 6; // Check if password has changed and is valid
    return !fileChanged && !isPasswordValid; // Return true if neither condition is met, false otherwise
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    navigate("/"); // Redirect to home on logout
  };

  const handleEditProfile = () => {
    const data_seeker = {};
    if (password && password !== "temppass" && password.length >= 6) {
      data_seeker.password = password;
    }
    if (fileChanged) {
      data_seeker.base64resume = resume;
    }

    let response = EditProfile(data_seeker);
    response.then((res) => {
      setChangesMade(true); // Indicate that changes were made
      setFileChanged(false);
      setPassChanged(false);
      setFile(null);
      setPassword("temppass");
      setTimeout(() => setChangesMade(false), 2000); // Hide message after 2 seconds
    });
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
                onChange={(e) => {
                  setPassword(e.target.value); // Update password state
                  setPassChanged(true); // Indicate that the password has changed
                }}
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
          <div className="editprofile-changes">
            <button
              className="login-btn"
              onClick={handleEditProfile}
              disabled={isButtonDisabled()}
              style={{
                opacity: isButtonDisabled() ? 0.7 : 1,
              }}
            >
              Save Changes
            </button>
            {changesMade && (
              <div className="change-message">
                <p>Changes Made</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSeeker;
