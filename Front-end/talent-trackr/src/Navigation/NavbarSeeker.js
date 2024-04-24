import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarSeeker = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-left" id="logo-container">
        <img src="/Logo1.png" alt="Logo" className="logo1" />
        <img src="/Logo2.png" alt="Logo" className="logo2" />
      </div>
      <div className="navbar-middle"></div>
      <div className="navbar-right">
        <Link to="/seekerprofile">
          <img src="/profile-user.png" alt="Profile" />
        </Link>
      </div>
    </nav>
  );
};

export default NavbarSeeker;
