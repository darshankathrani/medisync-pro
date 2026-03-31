const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express();
const bookingRoute = require("./routes/bookings");
const slotRoute = require("./routes/slots");

const connectDB = require("./config/db");

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : null;

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      // If no allowedOrigins list, allow everything (dev mode)
      if (!allowedOrigins) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("CORS: Origin not allowed - " + origin));
    },
  }),
);
app.use(express.json());

connectDB();

app.use("/", bookingRoute);
app.use("/", slotRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 5000}`);
});
