import React, { useEffect } from "react";
import PropTypes from "prop-types";

const JobModal = ({ job, onClose }) => {
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
          <h2>{job.title}</h2>
          <img src="job-icon.png" alt="logo" />
        </div>

        <div className="job-modal-body">
          <p>
            <strong>Company:</strong> {job.company}
          </p>
          <p>
            <strong>Type:</strong> {job.type}
          </p>
          <p>
            <strong>Salary:</strong> {job.salary}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Description:</strong> {job.description}
          </p>
        </div>

        <div className="job-modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

JobModal.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired, // New description prop
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default JobModal;
