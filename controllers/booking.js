const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");

// Create booking
module.exports.createBooking = async (req, res) => {
  const { checkIn, checkOut } = req.body;

  const listing = await Listing.findById(req.params.id);

  const days = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
  const totalPrice = days * listing.price;

  const newBooking = new Booking({
    user: req.user._id,
    listing: listing._id,
    checkIn,
    checkOut,
    totalPrice
  });

  await newBooking.save();

  req.flash("success", "Booking Confirmed!");
  res.redirect("/bookings");
};

// Show bookings
module.exports.showBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("listing");
  res.render("bookings/index", { bookings });
};