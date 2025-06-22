// controllers/flightController.js
import Flight from '../models/Flight.js';
import Operator from '../models/Operator.js';

// Operator adds a flight
export const createFlight = async (req, res) => {
  try {
    const operator = await Operator.findOne({ createdBy: req.user._id });

    if (!operator || operator.status !== 'approved') {
      return res.status(403).json({ msg: 'Only approved operators can add flights' });
    }

    const flight = await Flight.create({
      ...req.body,
      operator: operator._id,
      availableSeats: req.body.totalSeats
    });

    res.status(201).json(flight);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all flights (public)
// Get all flights with filters

// GET /api/flights?from=New York&to=Paris&date=2025-04-10&classType=business&direct=true&minPrice=500&maxPrice=2000 <- frontend call

export const getAllFlights = async (req, res) => {
    try {
      const { from, to, date, classType, minPrice, maxPrice, direct, operator } = req.query;
  
      let query = {};
  
      if (from) query.from = new RegExp(from, 'i');
      if (to) query.to = new RegExp(to, 'i');
      if (classType) query.classType = classType;
      if (direct !== undefined) query.direct = direct === 'true';
      if (operator) query.operator = operator;
      if (minPrice && maxPrice) {
        query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
      } else if (minPrice) {
        query.price = { $gte: Number(minPrice) };
      } else if (maxPrice) {
        query.price = { $lte: Number(maxPrice) };
      }
  
      if (date) {
        const dayStart = new Date(date);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);
        query.departureTime = { $gte: dayStart, $lte: dayEnd };
      }
  
      const flights = await Flight.find(query).populate('operator', 'name');
      res.json(flights);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
  

// Get flights by operator (protected)
export const getOperatorFlights = async (req, res) => {
  const operator = await Operator.findOne({ createdBy: req.user._id });
  const flights = await Flight.find({ operator: operator._id });
  res.json(flights);
};

// Update a flight
export const updateFlight = async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  if (!flight) return res.status(404).json({ msg: 'Flight not found' });

  const operator = await Operator.findOne({ createdBy: req.user._id });

  if (!operator || flight.operator.toString() !== operator._id.toString()) {
    return res.status(403).json({ msg: 'Unauthorized' });
  }

  Object.assign(flight, req.body);
  await flight.save();
  res.json(flight);
};

// Delete a flight
export const deleteFlight = async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  if (!flight) return res.status(404).json({ msg: 'Flight not found' });

  const operator = await Operator.findOne({ createdBy: req.user._id });

  if (!operator || flight.operator.toString() !== operator._id.toString()) {
    return res.status(403).json({ msg: 'Unauthorized' });
  }

  await flight.remove();
  res.json({ msg: 'Flight deleted' });
};
