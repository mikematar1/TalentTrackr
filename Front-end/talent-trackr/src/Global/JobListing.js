import React from "react";
import { IoLocationOutline } from "react-icons/io5";

const JobListing = ({ job, userType }) => {
  const { title, company, salary, type, location, percentage } = job;

  const getColor = () => {
    const lightness = 20 + (percentage / 100) * 40;
    const hue = (percentage / 100) * 120; // Hue ranges from 0 (red) to 120 (green)
    return `hsl(${hue}, 100%, ${lightness}%)`;
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

          {userType === "seeker" && ( // Only display if userType is 'seeker'
            <div className="circle" style={{ borderColor: getColor() }}>
              <p style={{ color: getColor() }}>{percentage}%</p>{" "}
              {/* Percentage */}
            </div>
          )}
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
