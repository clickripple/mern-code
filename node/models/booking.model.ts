import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    under18: { type: Boolean, default: false },
    extraLuggage: { type: Boolean, default: false },
    hasBike: { type: Boolean, default: false },
    hasGolfClubs: { type: Boolean, default: false },
    hasWheelChairs: { type: Boolean, default: false },
    hasStroller: { type: Boolean, default: false },
    hasNoExtra: { type: Boolean, default: false },
  },
  {
    _id : false
  }
);

const availabilitySchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    price: { type: Number, default: 0 }
  },
  {
    _id : false
  }
);

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    totalPrice: { type: Number, default: 0 },
    number_of_passengers: { type: Number, default: 0 },
    departure_data: availabilitySchema,
    return_data: availabilitySchema,
    trip_type: {type: String, required: true},
    uniqueId: {type: String, default: ""},
    transactionId: {type: String, default: ""},
    routeId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Route',
      required: true,
    },
    shuttleId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Shuttle',
      required: true,
    },
    fromStopId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Stop',
      required: true,
    },
    toStopId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Stop',
      required: true,
    },
    passengers: [passengerSchema],

  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
