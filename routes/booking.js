const express = require("express");
const router = express.Router({ mergeParams: true });

const { isLoggedIn } = require("../middleware");
const bookingController = require("../controllers/booking.js");

// Create booking
router.post("/:id/book", isLoggedIn, bookingController.createBooking);

// Show bookings
router.get("/bookings", isLoggedIn, bookingController.showBookings);

module.exports = router;