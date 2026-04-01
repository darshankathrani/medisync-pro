import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { animateNavbar } from "../animations/navbarGSAP";

import Home from "./Home/Home";
import MyBooking from "./My Booking Page/MyBooking";
import Booking from "./Booking Page/Booking";
import AvailableSlots from "./Available Slots Page/AvailableSlots";

import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();

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
