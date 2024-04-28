import React, { useState, useEffect } from "react";

const AddJob = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`home-container seeker ${loaded ? "loaded" : ""}`}>
      <div className="profile-edit">
        <div className="profile-header">
          <h1>Add Job</h1>
        </div>
        <div className="login-inputs-profile">
          <div className="login-inputs"></div>
        </div>

        <button className="login-btn">Upload</button>
      </div>
    </div>
  );
};

export default AddJob;
