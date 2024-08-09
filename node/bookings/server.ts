import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Booking from './models/booking.model'; // Adjust path as needed
import createAnAcceptPaymentTransaction from './utils/createPayment';
import { sendEmail } from './utils/sendEmail';

// Initialize Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Database connection
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('your-database-uri', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// GET /bookings route
app.get('/bookings', async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    let page: number = parseInt(req.query.page as string, 10) || 1;

    const totalRoutes = await Booking.countDocuments();
    const totalPages = Math.ceil(totalRoutes / 10);

    if (page > totalPages && totalPages !== 0) {
      page = totalPages;
    }
    const start = (page - 1) * 10;

    const routes = await Booking.find()
      .populate('fromStopId')
      .populate('toStopId')
      .sort({ createdAt: -1 })
      .limit(10)
      .skip(start);

    res.json({
      message: 'Get shuttle data',
      data: {
        data: routes,
        currentPage: page,
        totalEntries: totalRoutes,
      },
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message || 'Internal server error' });
  }
});

// POST /bookings route
app.post('/bookings', async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const body = req.body;
    const transactionId = await createAnAcceptPaymentTransaction(body);
    const uniqueId = `BK${Math.floor(100000 + Math.random() * 900000)}`;
    
    const payload = {
      name: body.name,
      email: body.email,
      totalPrice: body.total,
      number_of_passengers: body.number_of_passengers,
      trip_type: body.trip_type,
      departure_data: {
        date: body.departureOption.date,
        start_time: body.departureOption.startTime,
        end_time: body.departureOption.endTime,
        price: body.departureOption.price,
      },
      return_data:
        body.trip_type === 'round_trip'
          ? {
              date: body.returnOption.date,
              start_time: body.returnOption.startTime,
              end_time: body.returnOption.endTime,
              price: body.returnOption.price,
            }
          : undefined,
      routeId: body.departureOption.routeId,
      shuttleId: body.departureOption.shuttle._id,
      fromStopId: body.from_city,
      toStopId: body.to_city,
      passengers: body.passengers.map((i: any) => i.data),
      uniqueId,
      transactionId,
    };

    const booking = await Booking.create(payload);
    const bookingItem = await Booking.findById(booking._id)
      .populate('shuttleId')
      .populate('fromStopId')
      .populate('toStopId');

    await sendEmail({
      email: body.email,
      subject: 'Booking confirmed - Shuttle Hurricane',
      templateVariables: bookingItem,
    });

    res.json({
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      message: typeof error === 'string' ? error : (error as Error).message || 'Internal server error',
      stack: (error as Error).stack,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
