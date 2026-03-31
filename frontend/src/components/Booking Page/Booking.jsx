import React from "react";
import styles from "./Booking.module.css";
import { useState } from "react";
import { useEffect } from "react";

const Booking = () => {
  const [slots, setSlots] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    consultationType: "Online",
    slotId: "",
    slotTime: "",
    notes: "",
  });

  const fetchSlots = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/get-slots`);
      const data = await res.json();
      setSlots(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.message || "Something went wrong");
        return;
      }

      setSuccessMsg("Booking confirmed successfully ✅");
      setData({
        fullName: "",
        email: "",
        phone: "",
        consultationType: "Online",
        slotId: "",
        slotTime: "",
        notes: "",
      });
      fetchSlots();
    } catch (error) {
      setErrorMsg("Server error. Please try again later ❌");
    }
  };

  return (
    <section className={styles.bookingSection}>
      <div className={styles.container}>
        {/* Left Side: Information */}
        <div className={styles.infoSide}>
          <h2>Book an Appointment</h2>
          <p>
            Fill out the form to secure your consultation slot. Our team will
            contact you for confirmation.
          </p>
          <div className={styles.steps}>
            <div className={styles.step}>
              <i className="ri-shield-check-line"></i>
              <span>Secure & Confidential</span>
            </div>
            <div className={styles.step}>
              <i className="ri-customer-service-2-line"></i>
              <span>24/7 Support Available</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className={styles.formCard}>
          {/* Success Message */}
          {successMsg && (
            <div
              style={{
                padding: "12px",
                marginBottom: "16px",
                backgroundColor: "#d4edda",
                color: "#155724",
                borderRadius: "8px",
                border: "1px solid #c3e6cb",
              }}
            >
              {successMsg}
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div
              style={{
                padding: "12px",
                marginBottom: "16px",
                backgroundColor: "#f8d7da",
                color: "#721c24",
                borderRadius: "8px",
                border: "1px solid #f5c6cb",
              }}
            >
              {errorMsg}
            </div>
          )}

          <form className={styles.bookingForm} onSubmit={submitForm}>
            {/* Personal Details */}
            <div className={styles.inputGroup}>
              <i className="ri-user-line"></i>
              <input
                type="text"
                placeholder="Full Name"
                value={data.fullName}
                onChange={(e) => {
                  setData({ ...data, fullName: e.target.value });
                }}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <i className="ri-mail-line"></i>
              <input
                type="email"
                placeholder="Email Address"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <i className="ri-phone-line"></i>
              <input
                type="tel"
                placeholder="Phone Number"
                value={data.phone}
                onChange={(e) => {
                  setData({ ...data, phone: e.target.value });
                }}
                required
              />
            </div>

            {/* NEW: Consultation Type Selection */}
            <div className={styles.typeContainer}>
              <span className={styles.label}>Consultation Type</span>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="type"
                    value="Online"
                    checked={data.consultationType === "Online"}
                    onChange={(e) => {
                      setData({ ...data, consultationType: e.target.value });
                    }}
                  />
                  <div className={styles.radioCard}>
                    <i className="ri-vidicon-line"></i>
                    <span>Online</span>
                  </div>
                </label>

                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="type"
                    value="In-Clinic"
                    checked={data.consultationType === "In-Clinic"}
                    onChange={(e) => {
                      setData({ ...data, consultationType: e.target.value });
                    }}
                  />
                  <div className={styles.radioCard}>
                    <i className="ri-hospital-line"></i>
                    <span>In-Clinic</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className={styles.inputGroup}>
              <i className="ri-time-line"></i>
              <select
                required
                value={data.slotId}
                onChange={(e) => setData({ ...data, slotId: e.target.value })}
              >
                <option value="">Select Time Slot</option>
                {slots
                  .filter((slot) => slot.status === "available")
                  .map((slot) => {
                    return (
                      <option key={slot._id} value={slot._id}>
                        {slot.time}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* Notes */}
            <div className={styles.inputGroup}>
              <i className="ri-message-2-line"></i>
              <textarea
                placeholder="Additional Notes (optional)"
                rows="3"
                value={data.notes}
                onChange={(e) => setData({ ...data, notes: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Confirm Booking <i className="ri-arrow-right-line"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Booking;
