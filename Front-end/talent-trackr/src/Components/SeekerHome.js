import React, { useState, useEffect } from "react";
import JobListing from "../Global/JobListing";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SeekerHome = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobListings, setJobListings] = useState([]);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Simulated job listings
  const simulatedJobListings = [
    { id: 1, title: "Job 1" },
    { id: 2, title: "Job 2" },
    { id: 3, title: "Job 3" },
    { id: 4, title: "Job 4" },
    { id: 5, title: "Job 5" },
    { id: 6, title: "Job 6" },
    { id: 7, title: "Job 7" },
    { id: 8, title: "Job 8" },
    { id: 9, title: "Job 9" },
    { id: 10, title: "Job 10" },
  ];

  // Number of job listings per page
  const listingsPerPage = 9;

  // Update job listings based on the current page
  useEffect(() => {
    const startIndex = (currentPage - 1) * listingsPerPage;
    const endIndex = Math.min(
      startIndex + listingsPerPage,
      simulatedJobListings.length
    );
    const slicedJobListings = simulatedJobListings.slice(startIndex, endIndex);
    setJobListings(slicedJobListings);
  }, [currentPage]);

  // Calculate total number of pages
  const totalPages = Math.ceil(simulatedJobListings.length / listingsPerPage);

  // Apply overflow: hidden to body during transition
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
      window.scrollTo(0, 0); // Scroll to the top when loaded
    }
  }, [loaded]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className={`home-container seeker ${loaded ? "loaded" : ""}`}>
      <div className="seeker-page">
        <div className="seeker-title">
          <h1>Recommended Opportunities</h1>
          <button>Filter</button>
        </div>
        <div className="job-listings-container">
          {jobListings.map((job) => (
            <JobListing key={job.id} job={job} />
          ))}
        </div>
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FaArrowLeft />
          </button>
          <span>{currentPage}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeekerHome;
