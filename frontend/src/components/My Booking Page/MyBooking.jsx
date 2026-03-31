import React, { useState } from "react";
import styles from "./MyBooking.module.css";

const MyBookings = () => {
  const [search, setSearch] = useState({
    email: "",
    phone: "",
  });

  const [bookings, setBookings] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const submitSearch = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setBookings([]);

    if (!search.email || !search.phone) {
      setErrorMsg("Please enter email and phone number");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/my-booking/${search.email}/${search.phone}`,
      );

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "No bookings found");
        return;
      }

      setBookings(data);
    } catch (error) {
      setErrorMsg("Server error. Try again later.");
    }
  };

  const cancelBooking = async (slotId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/booking/${slotId}/cancel`,
        {
          method: "DELETE",
        },
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Cancel failed");
        return;
      }

      setBookings((prev) => prev.filter((b) => b.slotId !== slotId));
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>My Bookings</h1>
        <p>Manage your upcoming and past medical appointments.</p>
      </div>

      {/* Search Section */}
      <form className={styles.searchSection} onSubmit={submitSearch}>
        <div className={styles.searchField}>
          <i className="ri-mail-line"></i>
          <input
            type="email"
            placeholder="Email Address"
            value={search.email}
            onChange={(e) => setSearch({ ...search, email: e.target.value })}
          />
        </div>

        <div className={styles.searchField}>
          <i className="ri-phone-line"></i>
          <input
            type="tel"
            placeholder="Phone Number"
            value={search.phone}
            onChange={(e) => setSearch({ ...search, phone: e.target.value })}
          />
        </div>

        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
      </form>

      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

      {/* Booking List */}
      <div className={styles.bookingList}>
        {bookings.map((item) => (
          <div key={item._id} className={styles.card}>
            <div
              className={
                item.status === "Confirmed"
                  ? styles.statusBadge
                  : styles.statusPending
              }
            >
              {item.status}
            </div>

            <div className={styles.cardBody}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <i className="ri-calendar-event-line"></i>
                  <div>
                    <p>Date</p>
                    <strong>{item.slotDate}</strong>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <i className="ri-time-line"></i>
                  <div>
                    <p>Time</p>
                    <strong>{item.slotTime}</strong>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <i className="ri-vidicon-line"></i>
                  <div>
                    <p>Type</p>
                    <strong>{item.consultationType}</strong>
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => cancelBooking(item.slotId)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && !errorMsg && (
          <p className={styles.noData}>No bookings to show</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
