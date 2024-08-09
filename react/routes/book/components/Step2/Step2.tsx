import AvailabilityCard from "./AvailabilityCard";
import { useBookingStore } from "../../booking.store";
import { Button } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Availablity } from "@/types/Availablity";
import TripTable from "../TripTable";
import { useState } from "react";

const Step2 = ({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) => {
  const { step1, availablityOptions, step2, setDeparture, setReturn } = useBookingStore();
  const [error, setError] = useState('');

  const handleBack = () => {
    setDeparture();
    setReturn();
    onBack();
  }

  const handleSubmit = () => {
    if (!step2.departureOption) {
      setError("Please choose one depature option");
      return;
    }
    if (step1.trip_type === "round_trip" && !step2.returnOption) {
      setError("Please choose one return option");
      return;
    }
    onSuccess();
  }

  const removeError = (callback: (i: Availablity) => void) => (item: Availablity) =>{
    setError("");
    callback(item)
  } 

  const AvailablityCards = () => {
    if(availablityOptions.departShuttles.length === 0){
      return <p className="text-center my-3">No departure route available</p>
    }
    return availablityOptions.departShuttles.map((i, index) => (
      <div key={index} className="col-12 my-2">
        <AvailabilityCard
          passengers={step1.number_of_passengers}
          item={i}
          onClick={removeError(setDeparture)}
        />
      </div>
    ))
  }

  const ArrivalAvailablityCards = () => {
    if(availablityOptions.returnShuttles.length === 0){
      return <p className="text-center my-3">No arrival routes available</p>
    }
    return availablityOptions.returnShuttles.map((i, index) => (
      <div key={index} className="col-12 my-2">
        <AvailabilityCard
          passengers={step1.number_of_passengers}
          item={i}
          onClick={removeError(setReturn)}
        />
      </div>
    ))
  }

  return (
    <div className="row book-form">
      <div className="d-flex gap-4 align-items-center">
        <Button variant="outlined" onClick={handleBack} startIcon={<ChevronLeftIcon />}>
          Back
        </Button>
        <h4 className="my-4">Choose your departure trip:</h4>
      </div>
      <h6 className="text-uppercase">
        {step1.from_city_obj?.name}{" "}
        <span>
          <ChevronRightIcon />
        </span>{" "}
        {step1.to_city_obj?.name}{" "}
      </h6>
      <div className="row">
        {step2.departureOption ? <TripTable item={step2.departureOption} /> : <AvailablityCards />}
        {step1.trip_type === "round_trip" &&
          <>
            <p>Choose return option</p>
            {step2.returnOption ? <TripTable item={step2.returnOption} /> : <ArrivalAvailablityCards />}
          </>}
      </div>
      <div className="d-flex justify-content-end">
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
      </div>
      <p className="text-end text-primary">
        {error}
      </p>
    </div>
  );
};

export default Step2;
