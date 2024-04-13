import React, { useState, useEffect } from "react";

const Companies = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const companies = [
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
    "/Logo1.png",
  ];

  const totalPages = Math.ceil(companies.length / 12);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
      const interval = setInterval(() => {
        // Increment the current page, looping back to the first page if needed
        setCurrentPage((currentPage) => (currentPage % totalPages) + 1);
      }, 5000); // Change the interval time as needed (in milliseconds)
      return () => clearInterval(interval);
    }
  }, [loaded, totalPages]);

  const handleClickDot = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={`companies-container ${loaded ? "loaded" : ""}`}>
      <div className="companies-title">
        <h1>Companies That Work With Us</h1>
      </div>
      <div className="slideshow">
        <div className="slides">
          {companies
            .slice((currentPage - 1) * 12, currentPage * 12)
            .map((company, index) => (
              <img src={company} alt={`Company ${index + 1}`} key={index} />
            ))}
        </div>
        {totalPages > 1 && (
          <div className="pagination-dots">
            {Array.from({ length: totalPages }).map((_, index) => (
              <span
                key={index}
                className={currentPage === index + 1 ? "dot active" : "dot"}
                onClick={() => handleClickDot(index + 1)}
              ></span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
