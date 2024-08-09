import Footer from "@/components/Landing/Footer";
import Header from "@/components/Layout/User/Header";
import BookSuccess from "./BookSuccess";
import Booking from "@/models/booking.model";
import { Metadata } from "next";
import { appName, appDescription } from "@/constants/appName";

export const metadata: Metadata = {
  title: `Booking Success - ${appName}`,
  description: appDescription,
};

export default async function BookingSuccess({
  params,
}: {
  params: { id: string };
}) {
  const bookingItem = await Booking.findById(params.id)
    .populate("shuttleId")
    .populate({
      path: "fromStopId",
    })
    .populate({
      path: "toStopId",
    });
  if (!bookingItem) {
    return <p>No such booking found</p>;
  }
  return (
    <>
      <Header />
      <section className="image-section small"></section>
      <BookSuccess item={JSON.parse(JSON.stringify(bookingItem))} />
      <Footer />
    </>
  );
}
