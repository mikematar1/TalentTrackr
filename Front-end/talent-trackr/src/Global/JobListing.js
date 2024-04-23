import React from "react";
import { IoLocationOutline } from "react-icons/io5";

const JobListing = ({ job }) => {
  const { title, company, salary, type, location, percentage } = job; // Default to 100%

  const getColor = () => {
    const lightness = 20 + (percentage / 100) * 40; // Adjust lightness between 30 and 70
    const hue = (percentage / 100) * 120; // Hue ranges from 0 to 120 (red to green)
    return `hsl(${hue}, 100%, ${lightness}%)`; // Use HSL color model for smoother gradient
  };

  return (
    <div className="job-listing">
      <div className="job-card">
        <p className="job-title">{title}</p> {/* Job title */}
        <div className="type-salary">
          <div className="type-box">
            <p>{type}</p> {/* Job type */}
          </div>
          <div className="salary">
            <p>Salary: {salary}</p> {/* Salary */}
          </div>
          <div
            className="circle"
            id="circle"
            style={{ borderColor: getColor() }}
          >
            <p id="percentage" style={{ color: getColor() }}>
              {percentage}%
            </p>
          </div>
        </div>
        <div className="company-loc">
          <img src="/job-icon.png" alt="logo" />
          <div className="name-loc">
            <p className="job-title company">{company}</p> {/* Company name */}
            <div className="salary company">
              <IoLocationOutline
                style={{
                  color: "#767f8c",
                  fontSize: "15px",
                  paddingLeft: "4%",
                  paddingBottom: "5%",
                }}
              />
              <p>{location}</p> {/* Location */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
