import React, { useState } from "react";

import { IoLocationOutline } from "react-icons/io5";

const JobListing = () => {
  const [percentage] = useState(100); // Default percentage value

  const getColor = () => {
    const lightness = 20 + (percentage / 100) * 40; // Adjust lightness between 30 and 70
    const hue = (percentage / 100) * 120; // Hue ranges from 0 to 120 (red to green)
    return `hsl(${hue}, 100%, ${lightness}%)`; // Use HSL color model for smoother gradient
  };

  return (
    <div className="job-listing">
      <div className="job-card">
        <p className="job-title">Junior Graphic Designer</p>
        <div className="type-salary">
          <div className="type-box">
            <p>INTERNSHIP</p>
          </div>
          <div className="salary">
            <p>Salary: $20,000 - $25,000</p>
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
          <img src="/job-icon.png" alt="logo1" />
          <div className="name-loc">
            <p className="job-title company">EA Sports</p>
            <div className="salary company">
              <IoLocationOutline
                style={{
                  color: "#767f8c",
                  fontSize: "15px",
                  paddingLeft: "4%",
                  paddingBottom: "5%",
                }}
              />
              <p>Beirut, Lebanon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
