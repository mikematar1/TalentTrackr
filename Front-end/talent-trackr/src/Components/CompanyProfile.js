import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import GetListingsCompany from "../api-client/HomeSeeker/GetListingsCompany";
import JobListing from "../Global/JobListing";

const CompanyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [listings, setListings] = useState([]);

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

  //API
  const {
    status,
    error,
    data: listingCompanyData,
  } = useQuery({
    queryKey: ["listingCompanyData", id], // Pass the id to the queryKey
    queryFn: ({ queryKey }) => GetListingsCompany(queryKey[1]), // Extract the id from queryKey and pass it to GetListingsCompany
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (status === "success" && listingCompanyData) {
      setListings(listingCompanyData);
      setLoading(false);
    } else if (error) {
      console.log(error);
    }
  }, [listingCompanyData, status, error]);

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
              <h1>{job.company_details.company_name}</h1>
              <div>
                <img src={job.company_details.logo_url} alt="logo" />
              </div>
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
