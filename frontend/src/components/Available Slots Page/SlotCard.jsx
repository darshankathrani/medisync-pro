import { useEffect, useState } from "react";
import styles from "./AvailableSlots.module.css";
import { useNavigate } from "react-router-dom";

const SlotCard = () => {
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [today, setToday] = useState(new Date().toDateString());

  // 🔁 Detect day change (12:00 AM logic)
  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date().toDateString());
    }, 60000); // check every 1 minute

    return () => clearInterval(interval);
  }, []);

  // 🔄 Fetch slots whenever day changes
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/get-slots`);
        const data = await res.json();
        setSlots(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Error", error);
        setSlots([]);
      }
    };

    fetchSlots();
  }, [today]);

  const availableSlots = slots.filter((slot) => slot.status === "available");

  return (
    <div className={styles.slotGrid}>
      {availableSlots.length === 0 && <p>No slots available</p>}

      {availableSlots.map((slot) => (
        <div key={slot._id} className={styles.slotCard}>
          <div className={styles.slotTime}>
            <i className="ri-time-line"></i>
            {slot.time.slice(0, 8)}
          </div>

          <button
            className={styles.bookBtn}
            onClick={() => navigate("/booking")}
          >
            Select Slot
          </button>
        </div>
      ))}
    </div>
  );
};

export default SlotCard;
