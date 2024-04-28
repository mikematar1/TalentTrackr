import React, { useState, useEffect } from "react";
import JobListing from "../Global/JobListing";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import JobModal from "../Global/JobModal"; // Import the modal component

const HomeRecruiter = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobListings, setJobListings] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const simulatedJobListings = [
    {
      id: 1,
      title: "Junior Graphic Designer",
      company: "EA Sports",
      type: "Internship",
      salary: "$20,000 - $25,000",
      location: "Beirut, Lebanon",
      percentage: 87,
      description:
        "As a Junior Graphic Designer, you will work with a team to create engaging designs for digital and print media. This position is ideal for those looking to build their portfolio and gain hands-on experience.",
    },
    {
      id: 2,
      title: "Senior Software Engineer",
      company: "Google",
      type: "Full-time",
      salary: "$80,000 - $100,000",
      location: "San Francisco, CA",
      percentage: 47,
      description:
        "As a Junior Graphic Designer, you will work with a team to create engaging designs for digital and print media. This position is ideal for those looking to build their portfolio and gain hands-on experience.",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Facebook",
      type: "Contract",
      salary: "$60,000 - $70,000",
      location: "Menlo Park, CA",
      percentage: 58,
      description:
        "As a Junior Graphic Designer, you will work with a team to create engaging designs for digital and print media. This position is ideal for those looking to build their portfolio and gain hands-on experience.",
    },
    {
      id: 4,
      title: "Marketing Specialist",
      company: "Apple",
      type: "Full-time",
      salary: "$55,000 - $65,000",
      location: "Cupertino, CA",
      percentage: 96,
      description:
        "As a Junior Graphic Designer, you will work with a team to create engaging designs for digital and print media. This position is ideal for those looking to build their portfolio and gain hands-on experience.",
    },
    {
      id: 5,
      title: "Content Writer",
      company: "BuzzFeed",
      type: "Part-time",
      salary: "$30,000 - $35,000",
      location: "New York, NY",
      percentage: 29,
      description:
        "As a Junior Graphic Designer, you will work with a team to create engaging designs for digital and print media. This position is ideal for those looking to build their portfolio and gain hands-on experience.",
    },
    {
      id: 6,
      title: "Product Manager",
      company: "Microsoft",
      type: "Full-time",
      salary: "$90,000 - $110,000",
      location: "Seattle, WA",
      percentage: 27,
      description:
        "As a Junior Graphic Designer, you will work with a team to create engaging designs for digital and print media. This position is ideal for those looking to build their portfolio and gain hands-on experience.",
    },
    {
      id: 7,
      title: "UX Designer",
      company: "Amazon",
      type: "Contract",
      salary: "$70,000 - $80,000",
      location: "Seattle, WA",
      percentage: 50,
      description:
        "As a Junior Graphic Designer, you will work with a team to create engaging designs for digital and print media. This position is ideal for those looking to build their portfolio and gain hands-on experience.",
    },
    {
      id: 8,
      title: "Quality Assurance Engineer",
      company: "Samsung",
      type: "Full-time",
      salary: "$60,000 - $75,000",
      location: "Seoul, South Korea",
      percentage: 69,
      description:
        "As a Junior Graphic Designer, you will work with a team to create engaging designs for digital and print media. This position is ideal for those looking to build their portfolio and gain hands-on experience.",
    },
    {
      id: 9,
      title: "Machine Learning Engineer",
      company: "Tesla",
      type: "Full-time",
      salary: "$110,000 - $120,000",
      location: "Austin, TX",
      percentage: 83,
      description:
        "As a Junior Graphic Designer, you will work with a team to create engaging designs for digital and print media. This position is ideal for those looking to build their portfolio and gain hands-on experience.",
    },
    {
      id: 10,
      title: "DevOps Engineer",
      company: "Red Hat",
      type: "Full-time",
      salary: "$75,000 - $85,000",
      location: "Raleigh, NC",
      percentage: 80,
      description:
        "As a Junior Graphic Designer, you will work with a team to create engaging designs for digital and print media. This position is ideal for those looking to build their portfolio and gain hands-on experience.",
    },
    {
      id: 11,
      title: "Front-End Developer",
      company: "Spotify",
      type: "Part-time",
      salary: "$40,000 - $50,000",
      location: "Stockholm, Sweden",
      percentage: 10,
      description:
        "As a Junior Graphic Designer, you will work with a team to create engaging designs for digital and print media. This position is ideal for those looking to build their portfolio and gain hands-on experience.",
    },
  ];
  const handleJobClick = (job) => {
    setSelectedJob(job); // Set the selected job to display in the modal
  };
  // Number of job listings per page
  const listingsPerPage = 9;

  // Apply the filter term to the job listings
  const filteredJobListings = simulatedJobListings.filter((job) =>
    job.title.toLowerCase().includes(filterTerm.toLowerCase())
  );

  // Calculate total number of pages for filtered job listings
  const totalPages = Math.ceil(filteredJobListings.length / listingsPerPage);

  // Update job listings based on the current page and filter term
  useEffect(() => {
    const startIndex = (currentPage - 1) * listingsPerPage;
    const endIndex = Math.min(
      startIndex + listingsPerPage,
      filteredJobListings.length
    );
    setJobListings(filteredJobListings.slice(startIndex, endIndex));
  }, [currentPage, listingsPerPage, filteredJobListings]); // Add filteredJobListings to dependencies

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
          <h1>Job Listings</h1>
          <input
            className="filter-input"
            type="text"
            placeholder="Filter by job title..."
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
        </div>
        <div className="job-listings-container">
          {jobListings.map((job) => (
            <div
              key={job.id}
              onClick={() => handleJobClick(job)} // Open modal on job click
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
      </div>
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default HomeRecruiter;
