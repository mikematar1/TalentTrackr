import React, { useState, useEffect } from "react";
import Footer from "../Global/Footer";
import { useQuery } from "@tanstack/react-query";
import GetFeedback from "../api-client/BaseWebsite/GetFeedback";

const About = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  const reviewsPerPage = 1;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const {
    status,
    error,
    data: reviewsData,
  } = useQuery({
    queryKey: ["reviewsData"],
    queryFn: GetFeedback,
    refetchOnWindowFocus: false, // Disable refetch on window focus
    staleTime: Infinity, // Never re-fetch based on staleness
    cacheTime: Infinity, // Keep the cache forever
  });

  useEffect(() => {
    if (status === "success" && reviewsData) {
      setReviews(reviewsData);
      setLoading(false);
    } else if (error) {
      console.log(error);
    }
  }, [reviewsData, status, error]);

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

  useEffect(() => {
    if (loaded) {
      const interval = setInterval(() => {
        // Increment the current page, looping back to the first page if needed
        setCurrentPage((currentPage) => (currentPage % totalPages) + 1);
      }, 5000); // Change the interval time as needed (in milliseconds)
      return () => clearInterval(interval);
    }
  }, [currentPage, loaded, totalPages]);

  // Utility function to capitalize the first letter
  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const handleClickDot = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className={`about-container ${loaded ? "loaded" : ""}`}>
        <div className="about-title">
          <h1>About Us</h1>
          <p>
            Welcome to Talent Tracker, a revolutionary job matching platform
            designed to connect employers with the most suitable candidates
            based on a sophisticated, data-driven approach. Our mission is to
            streamline the recruitment process by focusing on skill-based
            matching, ensuring that job seekers find positions that align with
            their unique abilities, and employers can quickly identify talent
            that meets their specific needs.
          </p>
          <p>
            In today's fast-paced job market, traditional recruitment methods
            often fail to efficiently bridge the gap between job seekers and
            employers. At Talent Tracker, we aim to change that by offering an
            intuitive platform where both sides of the recruitment equation can
            interact with ease. We use advanced algorithms to match candidates
            with job opportunities, taking into consideration skills,
            experience, location, and other critical factors, all while ensuring
            fairness and impartiality.
          </p>

          <p>
            Beyond just matching, our platform is a community where employers
            can clearly define the skills they require, and job seekers can
            showcase their talents, making it easier than ever to find the right
            fit. We prioritize data security and privacy, ensuring that your
            personal information is always protected. Through our innovative
            approach, we aim to reduce unemployment, increase job satisfaction,
            and help close the skills gap in key industries.
          </p>
          <p>
            Thank you for visiting Talent Tracker. We are excited to help you
            find the perfect match, whether you're seeking a new career
            opportunity or looking for the ideal candidate to join your team.
          </p>
        </div>
        <div className="about-title reviews">
          <h1>Reviews</h1>
        </div>
        {loading ? (
          <div className="buffer-space">
            <div className="buffer-loader"></div>
          </div>
        ) : (
          <>
            <div className="slideshow reviews">
              {reviews
                .slice(
                  (currentPage - 1) * reviewsPerPage,
                  currentPage * reviewsPerPage
                )
                .map((review, index) => (
                  <div
                    key={index}
                    className={
                      index === 0 ? "slide reviews active" : "slide reviews"
                    }
                  >
                    <div className="reviews-profile-picture">
                      <img src="/profile-user.png" alt="logo" />
                    </div>
                    <h1 className="reviews-name">
                      {capitalizeFirstLetter(review.first_name)}{" "}
                      {capitalizeFirstLetter(review.last_name)}
                    </h1>
                    <p className="reviews-message">{review.review}</p>
                  </div>
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default About;
