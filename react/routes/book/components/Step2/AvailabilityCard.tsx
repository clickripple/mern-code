import React from "react";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useBookingStore } from "../../booking.store";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Availablity } from "@/types/Availablity";

type CardForm = {
  passengers: number;
  item: Availablity;
  onClick: (option: Availablity) => void
}
const AvailabilityCard = ({
  passengers,
  item,
  onClick
}: CardForm) => {

  const { setPassengers } = useBookingStore();

  const handleClick = () => {
    setPassengers([]);
    onClick(item);
  }
  
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-2 col-12">
          <img
            src="/img/5-min.png"
            className="img-fluid rounded-start object-fit-cover card-image-book"
          />
        </div>
        <div className="col-md-10 col-12">
          <div className="card-body bg-white d-flex justify-content-between flex-wrap align-items-center">
            <div className="d-flex align-items-center ms-3">
              <div className="item">
                <Typography className="timestamp" component="div" variant="h5">
                  {item.startTime}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {item.dateShow}
                </Typography>
              </div>
              <div className="item mx-3 nav-icon">
                <ChevronRightIcon />
              </div>
              <div className="item ms-3">
                <Typography className="timestamp" component="div" variant="h5">
                  {item.endTime}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {item.dateShow}
                </Typography>
              </div>
            </div>
            <div className="travel-time time hours">
              <div>Travel Time:-</div>
              <div>
                <strong> {item.diffString} </strong>
              </div>
            </div>
            <div className="travel-time time passengers">
              <div>
                Passengers:- <strong>{passengers}</strong>
              </div>
              <div>
                Total:- <strong>{`$ ${item.price}`}</strong>
              </div>
            </div>
            <div className="choose-btn">
              <Button variant="contained" onClick={handleClick}>Choose</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCard;
