// models/Flight.js
import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operator',
    required: true
  },
  flightNumber: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true },
  duration: { type: String }, // e.g., "8h 30m"
  direct: { type: Boolean, default: true },
  classType: {
    type: String,
    enum: ['economy', 'business', 'first'],
    default: 'economy'
  },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Flight', flightSchema);
