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

  // Number of job listings per page
  const listingsPerPage = 9;

  // Calculate total number of pages
  const totalPages = Math.ceil(10 / listingsPerPage); // 10 is the total number of jobs

  // Update job listings based on the current page
  useEffect(() => {
    const startIndex = (currentPage - 1) * listingsPerPage;
    const endIndex = Math.min(
      startIndex + listingsPerPage,
      10 // Total number of jobs
    );
    const slicedJobListings = Array.from(
      { length: endIndex - startIndex },
      (_, i) => {
        return { id: i + startIndex + 1, title: `Job ${i + startIndex + 1}` };
      }
    );
    setJobListings(slicedJobListings);
  }, [currentPage, listingsPerPage]);

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
