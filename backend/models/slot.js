const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    date: {
      type: String, // e.g. "2026-10-24"
      required: true,
    },

    time: {
      type: String, // e.g. "10:00 AM - 10:30 AM"
      required: true,
    },

    duration: {
      type: Number, // in minutes
      default: 30,
    },

    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slot", slotSchema);
