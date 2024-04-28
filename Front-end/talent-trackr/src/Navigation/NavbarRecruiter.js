import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarRecruiter = () => {
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
            <Link
              to="/recruiterhome"
              className={location.pathname === "/recruiterhome" ? "active" : ""}
            >
              Listings
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className={location.pathname === "/analytics" ? "active" : ""}
            >
              Analytics
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/recruiterprofile">
          <img src="/profile-user.png" alt="Profile" />
        </Link>
      </div>
    </nav>
  );
};

export default NavbarRecruiter;
