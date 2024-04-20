import React, { useState, useEffect } from "react";
import JobListing from "../Global/JobListing";
const SeekerHome = () => {
  const [loaded, setLoaded] = useState(false);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Apply overflow: hidden to body during transition
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
      window.scrollTo(0, 0); // Scroll to the top when loaded
    }
  }, [loaded]);

  return (
    <div className={`home-container seeker ${loaded ? "loaded" : ""}`}>
      <div className="seeker-page">
        <div className="seeker-title">
          <h1>Recommended Opportunities</h1>
          <button>Filter</button>
        </div>
        <div className="job-listings-container">
          <JobListing />
        </div>
      </div>
    </div>
  );
};

export default SeekerHome;
