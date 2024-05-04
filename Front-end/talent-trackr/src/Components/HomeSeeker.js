import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import JobListing from "../Global/JobListing";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import GetMatches from "../api-client/HomeSeeker/GetMatches";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";

const HomeSeeker = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null); // Reset selected job when closing the modal
  };

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

  // Disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible"; // Reset to default on cleanup
    };
  }, [isModalOpen]);

  const filteredJobListings = listings.filter((job) =>
    job.listing_details.JobTitles.MainJobTitle.toLowerCase().includes(
      filterTerm.toLowerCase()
    )
  );

  const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : ""; // Capitalize the first letter
  };

  const formatSkills = (skills) => {
    if (!skills || skills.length === 0) {
      return "None specified";
    }

    const requiredSkills = skills
      .filter((skill) => skill.Required)
      .map((skill) => capitalizeFirstLetter(skill.Name));

    if (requiredSkills.length === 0) {
      return "None specified";
    }

    const allButLast = requiredSkills.slice(0, -1).join(", ");

    if (requiredSkills.length === 1) {
      return `${requiredSkills[0]}.`;
    }

    const lastSkill = requiredSkills[requiredSkills.length - 1];

    return `${allButLast}, and ${lastSkill}`;
  };

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
    setSelectedJob(job); // Set the selected job
    openModal(); // Open the modal
  };

  const handleProfile = (job) => {
    if (job) {
      navigate("/companyprofile", { state: { job } });
    }
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
      <ReactModal
        className="custom-modal"
        isOpen={isModalOpen}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "none",
            width: "100%",
            height: "100%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "100",
          },
        }}
      >
        {selectedJob ? (
          <div className="job-modal">
            <div className="job-modal-header">
              <h2>{selectedJob.listing_details.JobTitles.MainJobTitle}</h2>
              <img src="job-icon.png" alt="logo" />
            </div>

            <div className="job-modal-body">
              <p>
                <strong>Company:</strong>{" "}
                {selectedJob.company_details.company_name}
              </p>
              <p>
                <strong>Type:</strong>{" "}
                {capitalizeFirstLetter(
                  selectedJob.listing_details.EmploymentType
                )}
              </p>
              <p>
                <strong>Skills Required:</strong>{" "}
                {formatSkills(selectedJob.listing_details.Skills.Raw)}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {selectedJob.listing_details.CurrentLocation.Municipality +
                  ", " +
                  selectedJob.listing_details.CurrentLocation.CountryCode}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedJob.listing_details.JobDescription}
              </p>
            </div>

            <div className="job-modal-footer">
              <button
                onClick={() => handleProfile(selectedJob)}
                className="close-button first"
              >
                Profile
              </button>
              <button onClick={closeModal} className="close-button">
                <FaTimes /> {/* 'X' icon */}
              </button>
            </div>
          </div>
        ) : null}
      </ReactModal>
    </div>
  );
};

export default HomeSeeker;
