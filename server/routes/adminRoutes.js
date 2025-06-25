// routes/adminRoutes.js

import express from "express";
import User from "../models/User.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all approved operators (Admin only)
router.get("/operators", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const operators = await User.find({ role: "operator", status: "approved" });
    res.json(operators);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching approved operators" });
  }
});

// ✅ Get all pending operators (Admin only)
router.get("/operators/pending", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const pending = await User.find({ role: "operator", status: "pending" });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching pending operators" });
  }
});

// ✅ Approve operator (Admin only)
router.put("/operators/:id/approve", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: "approved" });
    res.json({ message: "Operator approved ✅" });
  } catch (err) {
    res.status(500).json({ msg: "Error approving operator" });
  }
});

// ✅ Reject operator (Admin only)
router.put("/operators/:id/reject", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.json({ message: "Operator rejected ❌" });
  } catch (err) {
    res.status(500).json({ msg: "Error rejecting operator" });
  }
});

export default router;
