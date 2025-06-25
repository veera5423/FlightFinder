import express from 'express';
import User from '../models/User.js';
import Flight from '../models/Flight.js';
import Booking from '../models/Booking.js'; // if exists
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const [userCount, approvedOps, pendingOps, flightCount, bookingCount] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'operator', status: 'approved' }),
      User.countDocuments({ role: 'operator', status: 'pending' }),
      Flight.countDocuments(),
      Booking?.countDocuments?.() || 0,
    ]);

    // Pie chart: users by role
    const roleBreakdown = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);

    // Users registered this month
    const currentMonth = new Date().getMonth();
    const newUsers = await User.countDocuments({
      createdAt: { $gte: new Date(new Date().getFullYear(), currentMonth, 1) }
    });

    res.json({
      userCount,
      approvedOps,
      pendingOps,
      flightCount,
      bookingCount,
      roleBreakdown,
      newUsers
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch admin stats" });
  }
});

export default router;
