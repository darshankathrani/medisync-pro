import React from "react";

import styles from "./AvailableSlots.module.css";
import SlotCard from "./SlotCard";

const AvailableSlots = () => {
  let date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.dateInfo}>
            <i className="ri-calendar-check-line"></i>
            <h3>Select a Slot</h3>
            <p>Showing availability for:</p>
            <div className={styles.currentDate}>Today, {formattedDate}</div>
          </div>
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotAvailable}`}></span>{" "}
              Available
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotBooked}`}></span>{" "}
              Already Booked
            </div>
          </div>
        </div>

        {/* Right Side: Slots Grid */}
        <div className={styles.mainContent}>
          <div className={styles.gridHeader}>
            <h2>Morning & Afternoon Slots</h2>
            <span>30 Minute Consultations</span>
          </div>

          <SlotCard />
        </div>
      </div>
    </div>
  );
};

export default AvailableSlots;
