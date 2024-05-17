import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import JobListing from "../Global/JobListing";
import GetListingsCompany from "../api-client/HomeSeeker/GetListingsCompany";
import { FaArrowLeft, FaArrowRight, FaPlus, FaTimes } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";

const HomeRecruiter = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMatchesView, setIsMatchesView] = useState(false);
  const id = localStorage.getItem("id");

  let navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsMatchesView(false);
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

  // Apply overflow: hidden to body during transition
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
    data: listingRecruiterData,
  } = useQuery({
    queryKey: ["listingRecruiterData", id], // Pass the id to the queryKey
    queryFn: ({ queryKey }) => GetListingsCompany(queryKey[1]), // Extract the id from queryKey and pass it to GetListingsCompany
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  useEffect(() => {
    if (status === "success" && listingRecruiterData) {
      setListings(listingRecruiterData);
      setLoading(false);
    } else if (error) {
      console.log(error);
    }
  }, [listingRecruiterData, status, error]);

  // Number of job listings per page
  const listingsPerPage = 9;

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

  const handleAddJobClick = () => {
    navigate("/addjob");
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job); // Set the selected job
    openModal(); // Open the modal
  };
  const handleMatches = (job) => {
    setSelectedJob(job);
    setIsMatchesView(true); // Activate matches view
  };
  const handleBack = () => {
    setIsMatchesView(false); // Deactivate matches view
  };

  return (
    <div className={`home-container seeker ${loaded ? "loaded" : ""}`}>
      <div className="seeker-page">
        <div className="recruiter-title">
          <h1>Job Listings</h1>
          <div className="recruiter-btn-filter">
            <button onClick={handleAddJobClick}>
              <FaPlus />
            </button>
            <input
              className="filter-input"
              type="text"
              placeholder="Filter by job title..."
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            />
          </div>
        </div>
        {loading ? (
          <div className="buffer-space">
            <div className="buffer-loader"></div> {/* Loader while loading */}
          </div>
        ) : currentJobListings.length === 0 ? (
          <div className="no-listings-message">
            <h1>No job listings found</h1>{" "}
          </div>
        ) : (
          <>
            <div className="job-listings-container">
              {currentJobListings.map((job) => (
                <div
                  className="job-listing-view"
                  key={job.id}
                  onClick={() => handleJobClick(job)}
                >
                  <JobListing key={job.id} job={job} userType={"recruiter"} />
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
        isOpen={!!selectedJob}
        onRequestClose={() => setSelectedJob(null)}
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
        {selectedJob && (
          <div className="job-modal">
            <div className="job-modal-header">
              <h2>{selectedJob.listing_details.JobTitles.MainJobTitle}</h2>
              <div>
                <img src={selectedJob.company_details.logo_url} alt="logo" />
              </div>
            </div>

            {isMatchesView ? (
              <div className="job-modal-body-matches">
                {selectedJob.matches.map((match, index) => (
                  <div key={index} className="match-details">
                    <h3>
                      {match.first_name} {match.last_name}
                    </h3>
                    <p>
                      <strong>Email:</strong> {match.email}
                    </p>
                    <p>
                      <strong>LinkedIn:</strong> {match.linkedin}
                    </p>
                    <p>
                      <strong>Match Percentage:</strong>{" "}
                      {match.match_percentage}%
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> {match.dob}
                    </p>
                    {/* Add additional information as needed */}
                  </div>
                ))}
              </div>
            ) : (
              <div className="job-modal-body">
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
                  {`${selectedJob.listing_details.CurrentLocation.Municipality}, ${selectedJob.listing_details.CurrentLocation.CountryCode}`}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedJob.listing_details.JobDescription}
                </p>
              </div>
            )}

            <div className="job-modal-footer">
              {/* Toggle between Matches and Back based on the state */}
              <button
                onClick={
                  isMatchesView ? handleBack : () => handleMatches(selectedJob)
                }
                className="close-button first"
              >
                {isMatchesView ? "Back" : "Matches"}{" "}
                {/* Change text based on state */}
              </button>
              <button onClick={() => closeModal()} className="close-button">
                <FaTimes /> {/* Close the modal */}
              </button>
            </div>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default HomeRecruiter;
