'use client'
import { useHookForm } from "@/hooks/useHookForm";
import * as z from "zod";
import { requiredSelect } from "@/utils/zodRules";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { tripOptions } from "@/constants/step1Options";
import { useBookingStore } from "../booking.store";
import Form from "@/components/Form/Form";
import DateField from "@/components/Form/DateField";
import { NumberField } from "@/components/Form/NumberField";
import SelectField, { Option } from "@/components/Form/SelectField";
import { useStops } from "@/queries/stops";
import useSnackbar from "@/hooks/useSnackbar";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Snackbar } from "@mui/material";
import { axios } from "@/utils/axios";
import { AvailablityResponse } from "@/types/Availablity";
import { Stop } from "@/types/Destination";
import CustomBooking from "./CustomBooking";
import { useDisclosure } from "@/hooks/useDisclosure";

type FormValues = {
  from_city: string;
  to_city: string;
  from_city_obj?: Stop;
  to_city_obj?: Stop;
  number_of_passengers: number;
  trip_type: string;
  departure_date: string;
  return_date: string;
};

const schema = z
  .object({
    from_city: requiredSelect("Please select from city"),
    to_city: requiredSelect("Please select to city"),
    number_of_passengers: z
      .number({ required_error: "Please enter number of passengers" })
      .min(1, "Please enter at least one")
      .max(10, "Maximum value can be 10"),
    trip_type: requiredSelect("Please select trip type"),
    departure_date: requiredSelect("Please select departure date"),
    return_date: z.any(),
  })
  .superRefine(
    ({ from_city, to_city, trip_type, departure_date, return_date }, ctx) => {
      if (from_city === to_city) {
        ctx.addIssue({
          path: ["to_city"],
          code: "custom",
          message: "Stop points should be different!",
        });
      }
      if (trip_type === "round_trip") {
        if (!return_date) {
          ctx.addIssue({
            path: ["return_date"],
            code: "custom",
            message: "Return date is required",
          });
        }
        if (departure_date && return_date) {
          const depDate = moment(departure_date, "DD/MM/YYYY");
          const retDate = moment(return_date, "DD/MM/YYYY");
          if (retDate.isBefore(depDate) || retDate.isSame(depDate)) {
            ctx.addIssue({
              path: ["return_date"],
              code: "custom",
              message: "Return date should be after departure date",
            });
          }
        }
      }
    }
  );

const Step1 = ({ onSuccess }: { onSuccess: () => void }) => {
  const { methods, setValues } = useHookForm<FormValues, typeof schema>(schema);
  const { data, isLoading } = useStops();
  const { formState, control } = methods;
  const [minRetDate, setMinRetDate] = useState(moment());
  const [showReturn, setShowReturn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fromHelper, setFromHelper] = useState("");
  const [toHelper, setToHelper] = useState("");
  const modalRef = React.useRef(null);
  const { isOpen, close, open } = useDisclosure();

  const { step1, setStep1, setAvailablityOptions } = useBookingStore();
  const { openSnackbar, snackProps, alertProps } = useSnackbar(); // Use the custom hook

  const options = data?.map((i) => ({ label: i.name, value: i._id })) ?? [];

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      values.from_city_obj = data?.find((i) => i._id === values.from_city);
      values.to_city_obj = data?.find((i) => i._id === values.to_city);
      setStep1(values);

      const rData: AvailablityResponse = await axios.post(
        "/api/destination/find",
        values
      );
      setAvailablityOptions(rData);
      onSuccess();
    } catch (e: any) {
      const message = e.response?.data?.message ?? e.message;
      openSnackbar({
        type: "error",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date: Moment | null) => {
    if (date) {
      setMinRetDate(date);
    }
  };

  const handleTripChange = (option: Option) => {
    setShowReturn(option.value !== "one_way");
  };

  const handleChangeFrom = (selectedOption: Option) => {
    const findRoute = data?.find((i) => i._id === selectedOption.value);
    setFromHelper(findRoute ? findRoute.address : "");
  };

  const handleChangeTo = (selectedOption: Option) => {
    const findRoute = data?.find((i) => i._id === selectedOption.value);
    setToHelper(findRoute ? findRoute.address : "");
  };

  useEffect(() => {
    if (step1.trip_type === "one_way") {
      setShowReturn(false);
    }
    setValues(step1);
  }, [step1]);

  return (
    <Form<FormValues> onSubmit={handleSubmit} methods={methods}>
      <div className="row book-form">
        <div className="col-12">
          <p className="text-left">
            Please select options (For customized bookings,{' '}
            <a onClick={open} className="text-underline">click here</a>)
          </p>
        </div>
        <div className="col-12 col-md-6">
          <SelectField
            loading={isLoading}
            control={control}
            name="from_city"
            options={options}
            label="From City"
            error={formState.errors["from_city"]}
            helperText={fromHelper}
            selectOption={handleChangeFrom}
          />
        </div>
        <div className="col-12 col-md-6 each-cell">
          <SelectField
            loading={isLoading}
            control={control}
            name="to_city"
            options={options}
            label="To City"
            error={formState.errors["to_city"]}
            selectOption={handleChangeTo}
            helperText={toHelper}
          />
        </div>
        <div className="col-12 col-md-6 mt-4">
          <NumberField
            control={control}
            name="number_of_passengers"
            label="Number of passengers"
            error={formState.errors["number_of_passengers"]}
          />
        </div>
        <div className="col-12 col-md-6 mt-4">
          <SelectField
            control={control}
            name="trip_type"
            options={tripOptions}
            label="Trip type"
            error={formState.errors["trip_type"]}
            selectOption={handleTripChange}
          />
        </div>
        <div className="col-12 col-md-6 mt-4">
          <DateField
            control={control}
            name="departure_date"
            label="Departure Date"
            error={formState.errors["departure_date"]}
            changeDate={handleDateChange}
            minDate={moment()}
          />
        </div>
        {showReturn && (
          <div className="col-12 col-md-6 mt-4">
            <DateField
              control={control}
              name="return_date"
              label="Return Date"
              error={formState.errors["return_date"]}
              minDate={minRetDate}
            />
          </div>
        )}
        <div className="d-flex justify-content-end my-4">
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            size="large"
          >
            Submit
          </LoadingButton>
        </div>
      </div>
      <Snackbar {...snackProps}>
        <Alert {...alertProps} />
      </Snackbar>
      {isOpen && <CustomBooking minorRef={modalRef} isOpen={isOpen} close={close} />}
    </Form>
  );
};

export default Step1;
