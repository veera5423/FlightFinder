// server.js
import authRoutes from './routes/authRoutes.js';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import operatorRoutes from './routes/operatorRoutes.js';
import flightRoutes from './routes/flightRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import adminStatsRoutes from './routes/adminStats.js';

// for deployement
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Test route
app.get('/', (req, res) => {
  res.send('FlightFinder API is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch(err => console.log(err));

mongoose.connection.once('open', () => {
  console.log('✅ Connected to DB:', mongoose.connection.name)
})

app.use('/api/auth', authRoutes);
app.use('/api/operators',operatorRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', adminStatsRoutes);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
