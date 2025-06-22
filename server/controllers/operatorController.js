// controllers/operatorController.js
import Operator from '../models/Operator.js';

// Request operator onboarding (done by user with role: "operator")
export const requestOperatorAccess = async (req, res) => {
  try {
    const { name, email, logo, contactNumber, website } = req.body;

    const existing = await Operator.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Operator already exists' });

    const newOperator = await Operator.create({
      name,
      email,
      logo,
      contactNumber,
      website,
      createdBy: req.user._id
    });

    res.status(201).json({ msg: 'Operator request submitted', operator: newOperator });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Admin: Get all operators
export const getAllOperators = async (req, res) => {
  const operators = await Operator.find().populate('createdBy', 'name email');
  res.json(operators);
};

// Admin: Approve or reject operator
export const updateOperatorStatus = async (req, res) => {
  const { status } = req.body;
  const operator = await Operator.findById(req.params.id);

  if (!operator) return res.status(404).json({ msg: 'Operator not found' });

  operator.status = status;
  await operator.save();

  res.json({ msg: `Operator ${status}` });
};
