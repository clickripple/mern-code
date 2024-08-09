import { useHookForm } from "@/hooks/useHookForm";
import * as z from "zod";
import { requiredSelect } from "@/utils/zodRules";
import { InputPhone } from "@/components/Form/InputPhone";
import { useBookingStore } from "../../booking.store";
import { useEffect } from "react";
import Form from "@/components/Form/Form";
import { InputField } from "@/components/Form/InputField";
import { CheckboxField } from "@/components/Form/CheckboxField";

type FormValues = {
  name: string;
  phone: string;
  under18: boolean;
  extraLuggage: boolean;
  hasBike: boolean;
  hasGolfClubs: boolean;
  hasWheelChairs: boolean;
  hasStroller: boolean;
  hasNoExtra: boolean;
};
const schema = z.object({
  name: requiredSelect("Please enter name"),
  phone: requiredSelect("Please enter phone number"),
  under18: z.boolean(),
  extraLuggage: z.boolean(),
  hasBike: z.boolean(),
  hasGolfClubs: z.boolean(),
  hasWheelChairs: z.boolean(),
  hasStroller: z.boolean(),
  hasNoExtra: z.boolean(),
});

const PassengerForm = ({ serialNo }: { serialNo: number }) => {
  const form = useHookForm<FormValues, typeof schema>(schema);
  const { methods, setValues } = form;
  const { formState, control, register } = methods;
  const { passengers, setPassenger, setPassengerInvalid } = useBookingStore();

  useEffect(() => {
    if (passengers) {
      const passList = [...passengers];
      const findPass = passList.find(i => i.index === serialNo);
      if (findPass) {
        setValues(findPass.data);
      }
    }
  }, []);

  return (
    <div className="card bg-white my-3">
      <h5 className="card-title m-3">Passenger {serialNo}</h5>
      <div className="card-body">
        <Form<FormValues> methods={methods} onSubmit={(values) => {
          setPassenger(values, serialNo);
        }}>
          <div className="row">
            <div className="col-12 col-md-6">
              <InputField
                control={control}
                name="name"
                error={formState.errors["name"]}
                label="Full Name"
              // helpText="Name and phone number must be correct"
              />
            </div>
            <div className="col-12 col-md-6 each-cell">
              <InputPhone
                control={control}
                registration={register("phone")}
                error={formState.errors["phone"]}
              />
            </div>
            <div className="col-12 col-md-6 mt-4">
              <CheckboxField
                label="Is this passenger under 18 years old?"
                registration={register("under18")}
                error={formState.errors["under18"]}
              />
              <CheckboxField
                label="Extra Luggage over 2 pieces (only 1 more allowed), $25.00"
                registration={register("extraLuggage")}
                error={formState.errors["extraLuggage"]}
              />
              <CheckboxField
                label="Bike ( must be in bike box ), $30.00"
                registration={register("hasBike")}
                error={formState.errors["hasBike"]}
              />
              <CheckboxField
                label="Golf Clubs, $15.00"
                registration={register("hasGolfClubs")}
                error={formState.errors["hasGolfClubs"]}
              />
              <CheckboxField
                label="Wheelchair ( must be collapsible ), $10.00"
                registration={register("hasWheelChairs")}
                error={formState.errors["hasWheelChairs"]}
              />
              <CheckboxField
                label="Stroller, $5.00"
                registration={register("hasStroller")}
                error={formState.errors["hasStroller"]}
              />
              <CheckboxField
                label="No extra items"
                registration={register("hasNoExtra")}
                error={formState.errors["hasNoExtra"]}
              />
            </div>
            <button type="submit" className="passenger-forms d-none" onClick={() => {
              if (!formState.isValid) {
                setPassengerInvalid(serialNo);
              }
            }}></button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PassengerForm;
