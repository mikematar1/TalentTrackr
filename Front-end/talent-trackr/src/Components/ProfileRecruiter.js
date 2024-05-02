import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileRecruiter = () => {
  const [loaded, setLoaded] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Recruiter",
    email: "recruiter@example.com",
    description: "This is the companie's description",
    linkedIn: "https://www.linkedin.com",
  });
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
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
              type="text"
              name="description"
              placeholder="Description"
              className="login-input profile"
              value={profileData.description}
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
          </div>
        </div>

        <button className="login-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default ProfileRecruiter;
