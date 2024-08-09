"use client";
import { Price, PriceType } from "@/constants/prices";
import { useBookingStore } from "../../booking.store";
import * as z from "zod";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import TripTable from "../TripTable";
import { axios } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { BookingType } from "@/types/BookingType";
import useSnackbar from "@/hooks/useSnackbar";
import { Alert, Snackbar } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Form from "@/components/Form/Form";
import { InputField } from "@/components/Form/InputField";
import { useHookForm } from "@/hooks/useHookForm";
import { Authorize } from "@/constants/authorizeNet";
declare const window: any;

type FormValues = {
  name: string;
  email: string;
};

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Should be a valid email address"),
});

const Step4 = ({ env, onBack }: { env: any, onBack: () => void }) => {
  const { passengers, step1, step2 } = useBookingStore();
  const { methods, setValues } = useHookForm<FormValues, typeof schema>(schema);
  const { control, formState, reset } = methods;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [addOns, setAddons] = useState<PriceType[]>([]);
  const [total, setTotal] = useState(0);
  const { openSnackbar, snackProps, alertProps } = useSnackbar(); // Use the custom hook
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [finalPayload, setFinalPayload] = useState<any>();

  const departPrice =
    step1.number_of_passengers * (step2?.departureOption?.price ?? 0);
  let returnPrice = 0;
  if (step1.trip_type === "round_trip") {
    returnPrice =
      step1.number_of_passengers * (step2?.returnOption?.price ?? 0);
  }

  const price = departPrice + returnPrice;

  const getAddOns = () => {
    setValues({ name: "", email: "" });
    let totalPrice = 0;
    const addOnList = [];
    const extraLuggage = passengers.filter((i) => i.data.extraLuggage).length;
    const hasBike = passengers.filter((i) => i.data.hasBike).length;
    const hasGolfClubs = passengers.filter((i) => i.data.hasGolfClubs).length;
    const hasWheelChairs = passengers.filter(
      (i) => i.data.hasWheelChairs
    ).length;
    const hasStroller = passengers.filter((i) => i.data.hasStroller).length;
    if (extraLuggage) {
      addOnList.push({
        label: "Extra Luggage",
        count: extraLuggage,
        price: Price.extraLuggage * extraLuggage,
      });
      totalPrice += Price.extraLuggage * extraLuggage;
    }
    if (hasBike) {
      addOnList.push({
        label: "Bike",
        count: hasBike,
        price: Price.hasBike * hasBike,
      });
      totalPrice += Price.hasBike * hasBike;
    }
    if (hasGolfClubs) {
      addOnList.push({
        label: "Golf clubs",
        count: hasGolfClubs,
        price: Price.hasGolfClubs * hasGolfClubs,
      });
      totalPrice += Price.hasGolfClubs * hasGolfClubs;
    }
    if (hasWheelChairs) {
      addOnList.push({
        label: "Wheel Chairs",
        count: hasWheelChairs,
        price: Price.hasWheelChairs * hasWheelChairs,
      });
      totalPrice += Price.hasWheelChairs * hasWheelChairs;
    }
    if (hasStroller) {
      addOnList.push({
        label: "Stroller",
        count: hasStroller,
        price: Price.hasStroller * hasStroller,
      });
      totalPrice += Price.hasStroller * hasStroller;
    }
    totalPrice += price;
    setTotal(totalPrice);
    setAddons(addOnList);
  };

  useEffect(() => {
    getAddOns();
    var responseHandler = function (response: any) {  
      if (response.messages.resultCode === "Error") {
        var i = 0;
        let messages = [];
        while (i < response.messages.message.length) {
          messages.push(response.messages.message[i].text);
          i = i + 1;
        }
        let msg = messages.join(", ");
        const el = document.getElementById("error-messages");
        if(el){
          el.innerText = msg;
        }
      } else {
        const getItem = window.formSubmitted.get(response.opaqueData.dataValue);
        if(!getItem){
          createBooking(response.opaqueData);
          window.formSubmitted.set(response.opaqueData.dataValue, "abcd");
        }
      }
    };
    window.responseHandler = responseHandler;
    window.formSubmitted = new Map();
    const script = document.createElement("script")
    const mode = env.NEXT_APP_MODE ?? 'sandbox';
    script.src = Authorize[mode];
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, []);

  const handleSubmit = async (values: FormValues) => {
    const payload = {
      ...step1,
      ...step2,
      passengers,
      total,
      ...values
    };
    setFinalPayload(payload);
    window.finalPayload = payload;
    buttonRef?.current?.click();
  }
  const createBooking = async (payment: any) => {
    try {      
      setLoading(true);
      const payload = {
        ...window.finalPayload,
        payment
      };      

      const booking: BookingType = await axios.post("/api/bookings", payload);
      router.push(`/book/success/${booking._id}`);
    } catch (e: any) {
    const message = e.response?.data?.message ?? e.message;
      openSnackbar({
        type: "error",
        message: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row book-form gap-4">
        <div className="d-flex gap-4 align-items-center mb-3">
          <Button
            variant="outlined"
            onClick={onBack}
            startIcon={<ChevronLeftIcon />}
          >
            Back
          </Button>
          <h4 className="my-4">Enter payment information:</h4>
        </div>
        <div className="col-12 col-md-7">
          <div className="mb-3">
            <h5 className="mb-3">Departure Trip</h5>
            {step2.departureOption && (
              <TripTable item={step2.departureOption} />
            )}
          </div>
          {step2.returnOption && (
            <div className="mb-3">
              <h5 className="mb-3">Return Trip</h5>
              <TripTable item={step2.returnOption} />
            </div>
          )}
        </div>
        <div className="col-12 col-md-4">
          <h5 className="mb-3">Cart Information</h5>
          <div className="proceed form p-3">
            <div className="row m-0">
              <div className="col-8 p-0">
                <h6>Subtotal</h6>
              </div>
              <div className="col-4 p-0">
                <p id="subtotal">{`$ ${price}`}</p>
              </div>
            </div>
            {addOns.map((i, index) => (
              <div key={index} className="row m-0">
                <div className="col-8 p-0 ">
                  <h6>{`${i.label} (${i.count})`}</h6>
                </div>
                <div className="col-4 p-0">
                  <p id="tax">{`$ ${i.price}`}</p>
                </div>
              </div>
            ))}
            <hr />
            <div className="row mx-0 mb-2">
              <div className="col-8 p-0 d-inline">
                <h5>Total</h5>
              </div>
              <div className="col-4 p-0">
                <p id="total">{`$ ${total}`}</p>
              </div>
            </div>
          </div>

          <Form<FormValues>
            methods={methods}
            onSubmit={handleSubmit}
            className="my-3"
          >
            <div className="row">
              <div className="col-12">
                <InputField
                  name="name"
                  label="Name*"
                  control={control}
                  error={formState.errors["name"]}
                />
              </div>
              <div className="col-12 mt-3">
                <InputField
                  name="email"
                  label="Email*"
                  control={control}
                  error={formState.errors["email"]}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end py-3">
              <button
                ref={buttonRef}
                className="AcceptUI d-none"
                data-billingaddressoptions='{"show":true, "required":false}'
                data-apiloginid={env.NEXT_APP_LOGIN_ID}
                data-clientkey={env.NEXT_APP_CLIENT_ID}
                data-acceptuiformbtntxt="Submit"
                data-acceptuiformheadertxt="Card Information"
                data-responsehandler="responseHandler"
              ></button>
              <LoadingButton
                loading={loading}
                variant="contained"
                type="submit"
              >
                Pay $ {total}
              </LoadingButton>
            </div>
              <p id="error-messages"></p>
          </Form>
        </div>
      </div>
      <Snackbar {...snackProps}>
        <Alert {...alertProps} />
      </Snackbar>
    </>
  );
};

export default Step4;
