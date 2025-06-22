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
    validate: {
      validator: function(v) {
        return v <= this.totalSeats;
      },
      message: 'Available seats cannot exceed total seats'
    }
  },
  
}, { timestamps: true });

export default mongoose.model('Flight', flightSchema);


// const flightSchema = new mongoose.Schema({
//   operatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   airline: String,
//   from: String,
//   to: String,
//   date: String,
//   time: String,
//   price: Number,
//   seats: Number,
//   class: String,
// })

// module.exports = mongoose.model('Flight', flightSchema)
