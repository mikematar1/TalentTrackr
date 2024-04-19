import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            <Link to="/" className="footer-link">
              <li>Home</li>
            </Link>

            <Link to="/companies" className="footer-link">
              <li>Companies</li>
            </Link>

            <Link to="/about" className="footer-link">
              <li>About</li>
            </Link>

            <Link to="/login" className="footer-link">
              <li>Sign In</li>
            </Link>
          </ul>
        </div>
        <div className="footer-col">
          <h4>About Us</h4>
          <ul className="footer-links">
            <Link to="/privacypolicies" className="footer-link">
              <li>Privacy Policy</li>
            </Link>
            <Link to="/FAQ" className="footer-link">
              <li>FAQ</li>
            </Link>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <ul className="social-icons">
            <li>
              <a href="www.facebook.com">
                <i className="fab fa-facebook-f">
                  <FaFacebookF />
                </i>
              </a>
            </li>
            <li>
              <a href="www.x.com">
                <i className="fab fa-twitter">
                  <FaTwitter />
                </i>
              </a>
            </li>
            <li>
              <a href="www.instagram.com">
                <i className="fab fa-instagram">
                  <FaInstagram />
                </i>
              </a>
            </li>
            <li>
              <a href="www.linkedin.com">
                <i className="fab fa-linkedin-in">
                  <FaLinkedinIn />
                </i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="text-sm-center">
          &copy;{new Date().getFullYear()} Talent Trackr - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
