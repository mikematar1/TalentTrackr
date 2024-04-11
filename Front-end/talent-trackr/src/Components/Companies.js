import React, { useState, useEffect } from "react";

const Companies = () => {
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
    }
  }, [loaded]);

  return (
    <div className={`companies-container ${loaded ? "loaded" : ""}`}></div>
  );
};

export default Companies;
