import React, { useState, useEffect } from "react";
import Footer from "../Global/Footer";

const Home = () => {
  const [loaded, setLoaded] = useState(false);

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

  return (
    <>
      <div className={`home-container ${loaded ? "loaded" : ""}`}>
        <div className="left-side">
          <div className="left-column">
            <h1>Empowering Connections: Where Careers Align</h1>
            <p>
              Whether you're looking to fill key positions within your
              organization or searching for the perfect career opportunity,
              we’ve got you covered.
            </p>
            <button>Contact Us</button>
          </div>
        </div>

        <div className="right-side">
          <div className="big-square">
            <div className="right-text">
              <h1>Fueling Futures: Where Career Paths Converge</h1>
              <p>
                Join us in navigating the intersection of talent and
                opportunity, where dreams find their launchpad and careers take
                flight.
              </p>
            </div>
          </div>
          <div className="small-square">
            <div className="image-square">
              <img src="/work.jpeg" alt="logo" className="home-image" />
            </div>
            <div className="black-square">
              <h1>Crafting Creativity: Where Ideas Take Shape</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
