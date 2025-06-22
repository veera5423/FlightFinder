// controllers/bookingController.js
import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';

// Book seats
export const bookFlight = async (req, res) => {
  try {
    const { flightId, seats } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ msg: 'Flight not found' });

    const existingBookings = await Booking.find({ flight: flightId });
    const alreadyBookedSeats = new Set(
      existingBookings.flatMap(b => b.seats)
    );

    const isAnySeatTaken = seats.some(seat => alreadyBookedSeats.has(seat));
    if (isAnySeatTaken) {
      return res.status(400).json({ msg: 'Some seats are already booked' });
    }

    const totalPrice = flight.price * seats.length;

    const booking = await Booking.create({
      user: req.user._id,
      flight: flightId,
      seats,
      totalPrice,
      paymentStatus: 'pending' // Will be updated after Stripe payment
    });

    // Update available seats
    flight.availableSeats -= seats.length;
    await flight.save();

    res.status(201).json({ msg: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get current user's bookings
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('flight')
    .sort({ createdAt: -1 });

  res.json(bookings);
};
