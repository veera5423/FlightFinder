import express from 'express';
import Flight from '../models/Flight.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

// Middleware to check if operator is approved
// middleware/approvedOperator
export const isApprovedOperator = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.user.role === 'operator' && req.user.status === 'approved') {
    return next()
  }

  return res.status(403).json({ message: 'Access denied: Not an approved operator' })
}


// Add a new flight
router.post('/', protect, isApprovedOperator, async (req, res) => {
  try {
    const flight = new Flight({ ...req.body, operatorId: req.user._id })
    await flight.save()
    res.status(201).json({ message: 'Flight created', flight })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get all flights for this operator
router.get('/my-flights', protect, isApprovedOperator, async (req, res) => {
  try {
    const flights = await Flight.find({ operatorId: req.user._id })
    res.json(flights)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// DELETE a flight by ID (owned by operator)
// router.delete('/:id', protect, isApprovedOperator, async (req, res) => {
//   router.delete('/flight/:id', protect, isApprovedOperator, async (req, res) => {
//   try {
//     const flight = await Flight.findOne({ _id: req.params.id, operatorId: req.user._id });
//     if (!flight) {
//       return res.status(404).json({ message: 'Flight not found or not authorized' });
//     }

//     await flight.remove();
//     res.json({ message: 'Flight deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.delete('/flight/:id', protect, isApprovedOperator, async (req, res) => {
  try {
    const flight = await Flight.findOne({ _id: req.params.id, operatorId: req.user._id });

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found or not authorized' });
    }

    await flight.deleteOne(); // ✅ preferred over remove()
    res.json({ message: 'Flight deleted successfully' });

  } catch (err) {
    console.error("🔥 Error deleting flight:", err);
    res.status(500).json({ message: err.message });
  }
});



export default router
