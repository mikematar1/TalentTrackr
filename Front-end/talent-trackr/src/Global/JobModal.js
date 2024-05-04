import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // Import the 'X' icon from React Icons

const JobModal = ({ job, onClose }) => {
  const title = job.listing_details.JobTitles.MainJobTitle;
  const type = job.listing_details.EmploymentType;
  const description = job.company_details.description;
  const company = job.company_details.company_name;
  const location =
    job.listing_details.CurrentLocation.Municipality +
    ", " +
    job.listing_details.CurrentLocation.CountryCode;
  useEffect(() => {
    // Prevent body scrolling when the modal is open
    document.body.style.overflow = "hidden";

    // Cleanup: reset body scrolling when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // Ensure effect runs only on mount and cleanup on unmount

  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div
        className="job-modal"
        onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing the modal
      >
        <div className="job-modal-header">
          <h2>{title}</h2>
          <img src="job-icon.png" alt="logo" />
        </div>

        <div className="job-modal-body">
          <p>
            <strong>Company:</strong> {company}
          </p>
          <p>
            <strong>Type:</strong> {type}
          </p>

          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>
        </div>

        <div className="job-modal-footer">
          <button onClick={onClose} className="close-button">
            <FaTimes /> {/* 'X' icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
