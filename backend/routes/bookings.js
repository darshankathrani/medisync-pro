const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
const Slot = require("../models/slot");

router.post("/bookings", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      consultationType,
      notes,
      slotId,
      slotTime,
      slotDate,
    } = req.body;

    if (!fullName || !email || !phone || !consultationType || !slotId) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.status === "booked") {
      return res.status(409).json({
        message: "Slot already booked. Please choose another slot.",
      });
    }

    const booking = await Booking.create({
      fullName,
      email,
      phone,
      consultationType,
      notes,
      slotId,
      slotTime: slot.time,
      slotDate: slot.date,
    });

    slot.status = "booked";
    await slot.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my-booking/:email/:phone", async (req, res) => {
  try {
    const { email, phone } = req.params;

    if (!email || !phone) {
      return res.status(400).json({ message: "Email and phone are required" });
    }

    const myBooking = await Booking.find({ email: email.toLowerCase().trim(), phone: phone.trim() });

    if (myBooking.length === 0) {
      return res.status(404).json({ message: "No booking found" });
    }

    res.status(200).json(myBooking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/booking/:slotId/cancel", async (req, res) => {
  try {
    const { slotId } = req.params;

    if (!slotId) {
      return res.status(400).json({ message: "Slot ID is required" });
    }

    const booking = await Booking.findOneAndDelete({ slotId });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await Slot.findByIdAndUpdate(slotId, { status: "available" });

    res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
