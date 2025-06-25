// routes/bookingRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { bookFlight, getMyBookings } from '../controllers/bookingController.js';

const router = express.Router();
// add protect later
router.post('/', protect, bookFlight);         // Book a flight
router.get('/my',protect,  getMyBookings);     // View user's bookings 

export default router;
