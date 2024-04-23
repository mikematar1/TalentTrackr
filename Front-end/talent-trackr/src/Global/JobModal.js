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
  }, []); // The empty dependency array ensures this effect runs only on mount and cleanup on unmount

  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div
        className="job-modal"
        onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing the modal
      >
        <h2>{job.title}</h2>
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
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

JobModal.propTypes = {
  job: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default JobModal;
