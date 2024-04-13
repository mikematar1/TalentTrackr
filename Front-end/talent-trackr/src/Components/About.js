import React, { useState, useEffect } from "react";

const About = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 1;
  const reviews = [
    {
      name: "John Doe",
      message:
        "Amazing website! Really helped me throughout my career to secure multiple jobs.",
    },
    { name: "Jane Smith", message: "Consectetur adipiscing elit." },
    {
      name: "Trevor Fold",
      message: "What an awesome website! It helped me a lot.",
    },
    // Add more reviews as needed
  ];

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

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

  const handleClickDot = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={`about-container ${loaded ? "loaded" : ""}`}>
      <div className="about-title">
        <h1>Contact Us</h1>
        <p>
          We’re excited to welcome you to our website! Reach out to us if you
          have any specific questions.
        </p>
      </div>
      <div className="about-input">
        <div className="input-row">
          <input type="text" placeholder="Name" className="name-input" />
          <input type="email" placeholder="Email" className="email-input" />
        </div>
        <textarea
          rows="5"
          placeholder="Message"
          className="message-input"
        ></textarea>
        <div className="about-button">
          <button className="send-button">Send</button>
        </div>
      </div>
      <div className="about-title reviews">
        <h1>Reviews</h1>
      </div>
      <div className="slideshow reviews">
        {reviews
          .slice(
            (currentPage - 1) * reviewsPerPage,
            currentPage * reviewsPerPage
          )
          .map((review, index) => (
            <div
              key={index}
              className={index === 0 ? "slide reviews active" : "slide reviews"}
            >
              <div className="reviews-profile-picture">
                <img src="/profile-user.png" alt="logo" />
              </div>
              <h1 className="reviews-name">{review.name}</h1>
              <p className="reviews-message">{review.message}</p>
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
    </div>
  );
};

export default About;
