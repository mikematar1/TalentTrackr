import React, { useState, useEffect } from "react";
import Footer from "../Global/Footer";
import GetCompanyLogos from "../api-client/BaseWebsite/GetCompanyLogos";
import { useQuery } from "@tanstack/react-query";

const Companies = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [logos, setLogos] = useState([]);

  //API
  const {
    status,
    error,
    data: companyLogos,
  } = useQuery({
    queryKey: ["companyLogos"],
    queryFn: GetCompanyLogos,
    refetchOnWindowFocus: false, // Disable refetch on window focus
    staleTime: Infinity, // Never re-fetch based on staleness
    cacheTime: Infinity, // Keep the cache forever
  });
  useEffect(() => {
    if (status === "success" && companyLogos) {
      setLogos(companyLogos);
      setLoading(false);
    } else if (error) {
      console.log(error);
    }
  }, [companyLogos, status, error]);

  const totalPages = Math.ceil(logos?.length / 12);

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
  }, [currentPage, loaded, totalPages]);

  // Scroll to the top when loaded
  useEffect(() => {
    if (loaded) {
      window.scrollTo(0, 0);
    }
  }, [loaded]);

  const handleClickDot = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className={`companies-container ${loaded ? "loaded" : ""}`}>
        <div className="companies-title">
          <h1>Companies That Work With Us</h1>
        </div>
        <div className="slideshow">
          {loading ? (
            <div className="buffer-space">
              <div className="buffer-loader"></div>
            </div>
          ) : logos.length === 0 ? (
            <div className="no-listings-message">
              <h1>No Companies found</h1>{" "}
            </div>
          ) : (
            <>
              <div className="slides">
                {companyLogos
                  .slice((currentPage - 1) * 12, currentPage * 12)
                  .map((logo, index) => (
                    <img
                      src={logo.logo_url}
                      alt={`Company ${index + 1}`}
                      key={index}
                    />
                  ))}
              </div>
              {totalPages > 1 && (
                <div className="pagination-dots">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <span
                      key={index}
                      className={
                        currentPage === index + 1 ? "dot active" : "dot"
                      }
                      onClick={() => handleClickDot(index + 1)}
                    ></span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className={`footer-container ${loaded ? "loaded" : ""}`}>
        <Footer />
      </div>
    </>
  );
};

export default Companies;
