// routes/flightRoutes.js
import express from 'express';

import Flight from '../models/Flight.js';

const router = express.Router();


router.get('/search', async (req, res) => {
  try {
    const { from, to, date, class: travelClass, direct } = req.query;

    const query = {
      from: new RegExp(from, 'i'),
      to: new RegExp(to, 'i'),
    };

    // ✅ Handle date filtering
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      query.departureTime = { $gte: start, $lt: end };
    }

    // ✅ Handle travel class
    if (travelClass && ['economy', 'business', 'first'].includes(travelClass)) {
      query.classType = travelClass;
    }

    // ✅ Handle direct (must convert string to boolean)
    if (direct === 'true') {
      query.direct = true;
    } else if (direct === 'false') {
      query.direct = false;
    }

    // passengers not used in filtering for now (optional future use)

    const flights = await Flight.find(query).sort({ departureTime: 1 });
    res.json(flights);
  } catch (err) {
    console.error('Flight search error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});









export default router;
