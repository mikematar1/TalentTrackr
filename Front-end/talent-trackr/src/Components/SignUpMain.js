import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUpMain = () => {
  const [loaded, setLoaded] = useState(false);
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || ""
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("lastName") || ""
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );
  const [error, setError] = useState("");

  let navigate = useNavigate();

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
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
  }, [firstName, lastName, email]);

  //Validators
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateName = (name) => {
    return name.length <= 15 && name.length > 0;
  };

  const handleNext = (event) => {
    event.preventDefault();
    setError("");

    if (!firstName) {
      setError("Please enter your first name");
      return;
    }
    if (!validateName(firstName)) {
      setError("Invalid first name.");
      return;
    }
    if (!lastName) {
      setError("Please enter your last name");
      return;
    }
    if (!validateName(lastName)) {
      setError("Invalid last name.");
      return;
    }

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (!validatePassword(password)) {
      if (!password) {
        setError("Please enter your password");
        return;
      }
      setError("Password must be at least 8 characters long.");
      return;
    }
    const data = { firstName, lastName, email, password };

    navigate("/selecttype", {
      state: { data },
    });
  };

  return (
    <div className={`signup-container ${loaded ? "loaded" : ""}`}>
      <div className="signup main">
        <img className="login-img" src="/title.png" alt="logo" />
        <p className="login-p">Please fill in your information</p>
        <div className="login-inputs">
          <input
            type="text"
            placeholder="First Name"
            className="login-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={() => {
              setError("");
            }}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="login-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onFocus={() => {
              setError("");
            }}
          />
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => {
              setError("");
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => {
              setError("");
            }}
          />
        </div>
        <div className="error-space">
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="login-btn-ctn">
          <button onClick={handleNext} className="login-btn">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpMain;
