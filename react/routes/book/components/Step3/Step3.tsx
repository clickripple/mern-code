import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React, { useEffect, useState } from "react";
import PassengerForm from "./PassengerForm";
import MinorPolicy from "./MinorPolicy";
import LuggagePolicy from "./LuggagePolicy";
import { Button } from "@mui/material";
import { useDisclosure } from '@/hooks/useDisclosure';
import { useBookingStore } from '../../booking.store';
import "monday-ui-react-core/tokens";

const Step3 = ({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) => {
  const { step1, passengers } = useBookingStore();
  const [formSubmitted, setIsFormSubmitted] = useState(false);
  const minorRef = React.useRef(null);
  const luggageRef = React.useRef(null);

  const { close, open, isOpen } = useDisclosure();
  const {
    close: closeModal,
    open: openModal,
    isOpen: isOpenModal,
  } = useDisclosure();

  useEffect(() => {
    if (formSubmitted && passengers && step1.number_of_passengers) {
      const passList = [...passengers];
      const number = step1.number_of_passengers;
      if (number === passList.length) {
        const validForms = passList.filter((i) => i.isFormValid);
        if (validForms.length === number) {
          onSuccess();
        }
      }
    }
  }, [formSubmitted, passengers]);

  const handleSubmit = () => {
    document
      .querySelectorAll<HTMLElement>(".passenger-forms")
      .forEach((div: HTMLElement | null) => {
        if (div) {
          div.click();
        }
      });
    setIsFormSubmitted(true);
  };
  return (
    <div className="row book-form">
      <div className="d-flex gap-4 align-items-center">
        <Button variant="outlined" onClick={onBack} startIcon={<ChevronLeftIcon />}>
          Back
        </Button>
        <h4 className="my-4">Enter your passenger info:</h4>
      </div>
      <div className="col-12 col-md-8 mb-3">
        <div className="info-text mt-3">
          Shuttles times could be altered due to weather/Traffic/maintenance.
          Please make sure the contact info is correct! so they we can inform
          the passenger of any changes!
        </div>
        <div className="info-text mt-2">
          Each passenger is allowed 2 checked bags. Please also check{" "}
          <span
            className="text-primary cursor-pointer"
            ref={minorRef}
            onClick={open}
          >
            {" "}
            minor policy
          </span>
        </div>
        <div className="info-text mt-2">
          Max size 62 inches when you add together length + width + height.
          Anything larger will be an additional Charge.{" "}
          <span
            className="text-primary cursor-pointer"
            ref={luggageRef}
            onClick={openModal}
          >
            {" "}
            View luggage policy
          </span>
        </div>
      </div>
      <MinorPolicy minorRef={minorRef} isOpen={isOpen} close={close} />
      <LuggagePolicy
        minorRef={luggageRef}
        isOpen={isOpenModal}
        close={closeModal}
      />
      {new Array(step1?.number_of_passengers ?? 0)
        .fill(null)
        .map((el, index) => (
          <PassengerForm key={index} serialNo={++index} />
        ))}
      <div className="d-flex justify-content-end my-3">
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default Step3;
