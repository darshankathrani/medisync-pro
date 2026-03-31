const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // From form
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    consultationType: {
      type: String,
      enum: ["Online", "In-Clinic"],
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    // Slot info
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },

    slotTime: {
      type: String, // duplicated for fast read
      required: true,
    },

    slotDate: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
