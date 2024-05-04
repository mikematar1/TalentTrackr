import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const CompanyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const location = useLocation();
  const { job } = location.state || {}; // Destructure data from the previous page
  const id = job.company_details.id;

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
      window.scrollTo(0, 0); // Scroll to the top when loaded
    }
  }, [loaded]);

  return (
    <div className={`company-container ${loaded ? "loaded" : ""}`}>
      <div className="company-header">
        <h2>{job.company_details.company_name}</h2>
      </div>
    </div>
  );
};

export default CompanyProfile;
