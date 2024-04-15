import React, { useState, useEffect } from "react";

const Login = () => {
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
    <div className={`login-container ${loaded ? "loaded" : ""}`}>
      <div className="left-side login">
        <img src="/title.png" alt="logo" />
      </div>

      <div className="right-side login">
        <img src="/login-img.jpg" alt="logo" />
      </div>
    </div>
  );
};

export default Login;
