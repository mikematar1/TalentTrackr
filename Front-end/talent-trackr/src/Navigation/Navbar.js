import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-left" id="logo-container">
        <img src="/Logo1.png" alt="Logo" className="logo1" />
        <img src="/Logo2.png" alt="Logo" className="logo2" />
      </div>
      <div className="navbar-middle">
        <ul>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/companies"
              className={location.pathname === "/companies" ? "active" : ""}
            >
              Companies
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={location.pathname === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <button>Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
