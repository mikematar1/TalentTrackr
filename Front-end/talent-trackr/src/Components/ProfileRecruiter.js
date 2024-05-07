import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetProfile from "../api-client/ProfileRecruiter/GetProfile";
import EditProfile from "../api-client/ProfileRecruiter/EditProfile";
import { useQuery } from "@tanstack/react-query";

const ProfileRecruiter = () => {
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [file, setFile] = useState(""); // State for uploaded file name
  const [logo_base64, setLogoUrl] = useState(""); // State to store base64-encoded image
  const [fileChanged, setFileChanged] = useState(false); // Track if file is changed
  const [loading, setLoading] = useState(true);
  const [changesMade, setChangesMade] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Recruiter",
    email: "recruiter@example.com",
    description: "This is the company's description",
    linkedIn: "https://www.linkedin.com",
  });
  let navigate = useNavigate();

  const {
    status,
    error,
    data: profileRecruiterData,
  } = useQuery({
    queryKey: ["profileRecruiterData"],
    queryFn: GetProfile,
    refetchOnWindowFocus: false, // Disable refetch on window focus
    staleTime: Infinity, // Never re-fetch based on staleness
    cacheTime: Infinity, // Keep the cache forever
  });
  useEffect(() => {
    if (status === "success" && profileRecruiterData) {
      console.log(profileRecruiterData);
      // setUsername(profileRecruiterData.first_name + " " + profileRecruiterData.last_name);
      // setEmail(profileData.email);
      // setDob(profileData.dob);
      // setLinkedIn(profileData.linkedin);
      setLoading(false);
    } else if (error) {
      console.log(error);
    }
  }, [profileRecruiterData, status, error]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    localStorage.removeItem("id");
    localStorage.removeItem("shouldReload");
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    document.getElementById("file-input").click(); // Trigger file input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file); // Store the file name
      setFileChanged(true);

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
  const isButtonDisabled = () => {
    return !fileChanged;
  };

  const handleEditProfile = () => {
    const data_recruiter = {};
    if (fileChanged) {
      data_recruiter.logo_base64 = logo_base64;
    }

    let response = EditProfile(data_recruiter);
    response.then((res) => {
      setChangesMade(true);
      setFileChanged(false);
      setFile(null);
      setTimeout(() => setChangesMade(false), 2000); // Hide message after 2 seconds
      localStorage.setItem("shouldReload", true);
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
                value={profileData.fullName}
                readOnly
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="login-input profile"
                value={profileData.email}
                readOnly
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="login-input profile"
                value={profileData.description}
                readOnly
              />
              <input
                type="text"
                name="linkedIn"
                placeholder="LinkedIn URL"
                className="login-input profile"
                value={profileData.linkedIn}
                readOnly
              />
              <div className="custom-file-button profile" onClick={handleClick}>
                <span className="custom-file-button-text">
                  {file ? file.name : "Change Logo"}
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

export default ProfileRecruiter;
