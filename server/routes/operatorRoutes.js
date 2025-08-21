import express from "express";
import Flight from "../models/Flight.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Middleware to check if operator is approved
// middleware/approvedOperator
// For better organization, this middleware could be moved to its own file
// under a `middleware` directory, e.g., `middleware/authMiddleware.js`.
export const isApprovedOperator = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role === "operator" && req.user.status === "approved") {
    return next();
  }

  return res
    .status(403)
    .json({ message: "Access denied: Not an approved operator" });
};

// Add a new flight
router.post("/", protect, isApprovedOperator, async (req, res) => {
  try {
    // Destructure expected fields from req.body to prevent mass assignment vulnerabilities.
    // Please adjust these fields to match your actual Flight schema.
    const {
      flightNumber,
      departure,
      destination,
      departureTime,
      arrivalTime,
      aircraft,
      price,
      seatsAvailable,
    } = req.body;

    const flight = new Flight({
      flightNumber,
      departure,
      destination,
      departureTime,
      arrivalTime,
      aircraft,
      price,
      seatsAvailable,
      operatorId: req.user._id,
    });

    await flight.save();
    res.status(201).json({ message: "Flight created", flight });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Validation Error", errors: err.errors });
    }
    console.error("🔥 Error creating flight:", err);
    res.status(500).json({ message: "Server error while creating flight." });
  }
});

// Get all flights for this operator
router.get("/my-flights", protect, isApprovedOperator, async (req, res) => {
  try {
    const flights = await Flight.find({ operatorId: req.user._id });
    res.json(flights);
  } catch (err) {
    console.error("🔥 Error fetching flights:", err);
    res.status(500).json({ message: "Server error while fetching flights." });
  }
});

router.delete("/flight/:id", protect, isApprovedOperator, async (req, res) => {
  try {
    // Using findOneAndDelete is more efficient as it's a single atomic operation.
    const flight = await Flight.findOneAndDelete({
      _id: req.params.id,
      operatorId: req.user._id,
    });

    if (!flight) {
      return res
        .status(404)
        .json({ message: "Flight not found or you are not authorized to delete it" });
    }

    res.json({ message: "Flight deleted successfully" });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: "Invalid flight ID format." });
    }
    console.error("🔥 Error deleting flight:", err);
    res.status(500).json({ message: "Server error while deleting flight." });
  }
});

export default router;
