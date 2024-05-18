import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import JobListing from "../Global/JobListing";

const CompanyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const location = useLocation();
  const { job } = location.state || {}; // Destructure data from the previous page
  const listings = job.company_listings;

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
      {loading ? (
        <div className="buffer-space">
          <div className="buffer-loader"></div>
        </div>
      ) : (
        <>
          <div className="seeker-page">
            <div className="company-header">
              <div>
                <img src={job.company_details.logo_url} alt="logo" />
              </div>
              <h1>{job.company_details.company_name}</h1>
              <p>{job.company_details.description}</p>
            </div>
            <div className="job-listings-container company">
              {listings.map((job) => (
                <div key={job.id}>
                  <JobListing key={job.id} job={job} userType={"profile"} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyProfile;
