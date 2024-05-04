import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import JobListing from "../Global/JobListing";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import JobModal from "../Global/JobModal"; // Import the modal component
import { jwtDecode } from "jwt-decode";
import GetMatches from "../api-client/HomeSeeker/GetMatches";

const HomeSeeker = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  //Token handler
  const token = localStorage.getItem("token");
  useEffect(() => {
    const shouldReload = localStorage.getItem("shouldReload");
    if (shouldReload === "true") {
      localStorage.removeItem("shouldReload");
      window.location.reload(true);
    }
  }, []);
  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (decoded.exp < currentTime) {
      localStorage.removeItem("usertype");
      localStorage.removeItem("token");
      localStorage.setItem("shouldReload", "true");
    }
  }

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  //API
  const {
    status,
    error,
    data: listingData,
  } = useQuery({
    queryKey: ["listingData"],
    queryFn: GetMatches,
    refetchOnWindowFocus: false, // Disable refetch on window focus
    staleTime: Infinity, // Never re-fetch based on staleness
    cacheTime: Infinity, // Keep the cache forever
  });
  useEffect(() => {
    if (status === "success" && listingData) {
      setListings(listingData);
      setLoading(false);
    } else if (error) {
      console.log(error);
    }
  }, [listingData, status, error]);

  const listingsPerPage = 9;

  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
      window.scrollTo(0, 0); // Scroll to the top when loaded
    }
  }, [loaded]);

  const filteredJobListings = listings.filter((job) =>
    job.listing_details.JobTitles.MainJobTitle.toLowerCase().includes(
      filterTerm.toLowerCase()
    )
  );

  const totalPages = Math.ceil(filteredJobListings.length / listingsPerPage);

  const startIndex = (currentPage - 1) * listingsPerPage;
  const currentJobListings = filteredJobListings.slice(
    startIndex,
    startIndex + listingsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const handleJobClick = (job) => {
    setSelectedJob(job); // Set the selected job to display in the modal
  };

  return (
    <div className={`home-container seeker ${loaded ? "loaded" : ""}`}>
      <div className="seeker-page">
        <div className="seeker-title">
          <h1>Recommended Opportunities</h1>
          <input
            className="filter-input"
            type="text"
            placeholder="Filter by job title..."
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
        </div>
        {loading ? (
          <div className="buffer-space">
            <div className="buffer-loader"></div>
          </div>
        ) : (
          <>
            <div className="job-listings-container">
              {currentJobListings.map((job) => (
                <div key={job.id} onClick={() => handleJobClick(job)}>
                  <JobListing key={job.id} job={job} userType={"seeker"} />
                </div>
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
          </>
        )}
      </div>
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default HomeSeeker;
