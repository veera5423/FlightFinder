// models/Flight.js
import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  operatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // ✅ refers to the user collection
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
  availableSeats: {
    type: Number,
    required: true,
    default: function () {
      return this.totalSeats;
    },
    validate: {
      validator: function (v) {
        return v <= this.totalSeats;
      },
      message: 'Available seats cannot exceed total seats',
    },
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Delayed', 'Cancelled'],
    default: 'Scheduled',
  },
  airline: { type: String }

  
  
  
}, { timestamps: true });

export default mongoose.model('Flight', flightSchema);



