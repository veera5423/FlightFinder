// routes/flightRoutes.js
import express from 'express';
import {
  createFlight,
  getAllFlights,
  getOperatorFlights,
  updateFlight,
  deleteFlight
} from '../controllers/flightController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public
router.get('/', getAllFlights);

// Operator
router.post('/add', protect, authorizeRoles('operator'), createFlight);
router.get('/my-flights', protect, authorizeRoles('operator'), getOperatorFlights);
router.put('/:id', protect, authorizeRoles('operator'), updateFlight);
router.delete('/:id', protect, authorizeRoles('operator'), deleteFlight);

export default router;
