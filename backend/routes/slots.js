const express = require("express");
const router = express.Router();
const Slot = require("../models/slot");

router.post("/add-slot", async (req, res) => {
  try {
    const { date, time, duration, status } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: "Date and time are required" });
    }

    const slot = await Slot.create({
      date,
      time,
      duration,
      status,
    });

    res.status(201).json({
      message: "Slot created successfully",
      slot,
    });
  } catch (error) {
    console.error("Slot creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/get-slots", async (req, res) => {
  try {
    const todayDate = new Date();

    const today =
      todayDate.getFullYear() +
      "-" +
      String(todayDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(todayDate.getDate()).padStart(2, "0");

    const day = todayDate.getDay();

    if (day === 0) {
      return res.status(200).json({
        closed: true,
        message: "Clinic is closed on Sunday",
      });
    }

    let slots = await Slot.find({ date: today });

    if (slots.length === 0) {
      await Slot.insertMany([
        { date: today, time: "09:00 AM - 09:30 AM", status: "available" },
        { date: today, time: "09:30 AM - 10:00 AM", status: "available" },
        { date: today, time: "10:00 AM - 10:30 AM", status: "available" },
        { date: today, time: "10:30 AM - 11:00 AM", status: "available" },
        { date: today, time: "11:00 AM - 11:30 AM", status: "available" },
        { date: today, time: "11:30 AM - 12:00 PM", status: "available" },
        { date: today, time: "12:00 PM - 12:30 PM", status: "available" },
        { date: today, time: "12:30 PM - 01:00 PM", status: "available" },
        { date: today, time: "01:00 PM - 01:30 PM", status: "available" },
        { date: today, time: "01:30 PM - 02:00 PM", status: "available" },
        { date: today, time: "02:00 PM - 02:30 PM", status: "available" },
        { date: today, time: "02:30 PM - 03:00 PM", status: "available" },
        { date: today, time: "03:00 PM - 03:30 PM", status: "available" },
        { date: today, time: "03:30 PM - 04:00 PM", status: "available" },
        { date: today, time: "04:00 PM - 04:30 PM", status: "available" },
        { date: today, time: "04:30 PM - 05:00 PM", status: "available" },
        { date: today, time: "05:00 PM - 05:30 PM", status: "available" },
        { date: today, time: "05:30 PM - 06:00 PM", status: "available" },
        { date: today, time: "06:00 PM - 06:30 PM", status: "available" },
        { date: today, time: "06:30 PM - 07:00 PM", status: "available" },
      ]);

      slots = await Slot.find({ date: today });
    }

    res.status(200).json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json([]);
  }
});


module.exports = router;
