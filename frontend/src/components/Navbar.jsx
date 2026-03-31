import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { animateNavbar } from "../animations/navbarGSAP";

import Home from "./Home/Home";
import MyBooking from "./My Booking Page/MyBooking";
import Booking from "./Booking Page/Booking";
import AvailableSlots from "./Available Slots Page/AvailableSlots";

import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    // Only animate if desktop menu is visible to avoid errors with hidden ref
    if (window.innerWidth >= 768) {
      animateNavbar(logoRef.current, menuRef.current, btnRef.current);
    }
  }, []);

  return (
    <>
      <nav className={`${styles.navContainer} relative z-50`}>
        <div
          ref={logoRef}
          className={`${styles.logo} md:text-[2.2rem] text-2xl`}
          onClick={() => navigate("/")}
        >
          <i className="ri-stethoscope-line md:text-[2.5rem] text-3xl"></i>
          MedCare
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-3xl focus:outline-none mr-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-3-line"}></i>
        </button>

        {/* Desktop Menu */}
        <div ref={menuRef} className={`${styles.menu} hidden md:flex`}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/booking" className={styles.navLink}>
            Booking
          </Link>
          <Link to="/my-bookings" className={styles.navLink}>
            My Booking
          </Link>
          <Link to="/slots" className={styles.navLink}>
            Available Slots
          </Link>

          <button ref={btnRef} onClick={() => navigate("/slots")}>
            Appointment
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-[80px] left-0 w-full bg-white shadow-xl flex flex-col items-center py-6 gap-6 transition-all duration-300 ease-in-out z-40 origin-top
        ${isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
      >
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navLink} text-xl`}>
            Home
          </Link>
          <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navLink} text-xl`}>
            Booking
          </Link>
          <Link to="/my-bookings" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navLink} text-xl`}>
            My Booking
          </Link>
          <Link to="/slots" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navLink} text-xl`}>
            Available Slots
          </Link>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate("/slots");
            }}
            className="px-8 py-3 bg-black text-white font-medium cursor-pointer mt-2 text-lg active:scale-95 transition-transform"
          >
            Appointment
          </button>
      </div>

      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBooking />} />
          <Route path="/slots" element={<AvailableSlots />} />
        </Routes>
      </div>
    </>
  );
}

export default Navbar;
