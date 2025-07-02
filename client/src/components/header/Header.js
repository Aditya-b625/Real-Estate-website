import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import {Link,useNavigate,useLocation} from 'react-router-dom';
import './header.css';

function Header(){

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
   const location = useLocation();
   const [isNavOpen, setIsNavOpen] = useState(false); // Toggle state

  // Check login status on mount
  // useEffect(() => {
  //   setIsLoggedIn(!!sessionStorage.getItem("token"));
  // }, []);
  const isLoggedIn = !!sessionStorage.getItem("token");

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/signin");
    window.location.reload(); // Refresh to reflect logout
  };

  const handleNavLinkClick = () => {
    setIsNavOpen(false); // Close menu on link click
  };

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen); // Toggle open/close
  };

    return (
        <nav className="navbar navbar-expand-lg shadow-sm px-4 py-1 fixed-top align-items-center">
        <div className="container-fluid">
          {/* Logo + Brand */}
          <Link className="navbar-brand d-flex align-items-center" to="/" onClick={handleNavLinkClick}>
            <img
              src="/images/logo-CMrIGaUI.png"
              alt="Logo"
              width="90"
              height="50"
              className="me-2"
            />
            <span className="fw-bold fs-4">Asset <span className="text-primary">Bazar</span></span>
          </Link>
          
          {/* Toggle for mobile */}
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isNavOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
  
          {/* Links + Actions */}
          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-4">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleNavLinkClick} style={{fontWeight: window.location.pathname === "/"  ? "bold": "400"}}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={handleNavLinkClick} style={{fontWeight: window.location.pathname === "/about"  ? "bold": "400"}}>About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/properties" onClick={handleNavLinkClick} style={{fontWeight: window.location.pathname === "/properties"  ? "bold": "400"}}>Properties</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact" onClick={handleNavLinkClick}  style={{fontWeight: window.location.pathname === "/contact" ? "bold": "400"}}>Contact</Link>
              </li>
            </ul>
  
            <div className="d-flex align-items-center gap-2">
              <Link  to="/list-property" onClick={handleNavLinkClick} className="btn btn-outline-primary px-2 py-1">
                List your property
              </Link>
              {!isLoggedIn ? (
                <>
             {/* <FaUser className="fs-4" /> */}
             <Link className='btn btn-primary px-2 py-1' to="/signin" onClick={handleNavLinkClick} >Sign in</Link>
                </>
                 ) : (
                   <>
                  <Link to="/myprofile" className="btn btn-light px-2 py-1 rounded-4 border border-2"><i class="fa-solid fa-user"></i></Link>
                  <button onClick={handleLogout} className="btn btn-danger px-2 py-1"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
                   </>
                   )}
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Header;
