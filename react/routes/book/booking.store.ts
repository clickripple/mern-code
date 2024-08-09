import { Availablity, AvailablityResponse } from "@/types/Availablity";
import { Passenger, PassengerStore } from "../../types/passenger";
import create from "zustand";
import { Stop } from "@/types/Destination";

export type Step1 = {
  from_city: string;
  to_city: string;
  number_of_passengers: number;
  trip_type: string;
  departure_date: string;
  return_date: string;
  from_city_obj?: Stop;
  to_city_obj?: Stop;
};

export type Step2 = {
  departureOption?: Availablity;
  returnOption?: Availablity;
};

type BookingStore = {
  step1: Step1;
  setStep1: (step1: Step1) => void;

  step2: Step2;
  setStep2: (step2: Step2) => void;
  setDeparture: (option?: Availablity) => void;
  setReturn: (option?: Availablity) => void;

  passengers: PassengerStore[];
  setPassengers: (passengers: PassengerStore[]) => void;
  setPassenger: (passenger: Passenger, index: number) => void;
  setPassengerInvalid: (index: number) => void;

  availablityOptions: AvailablityResponse;
  setAvailablityOptions: (availablityOptions: AvailablityResponse) => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  step1: {} as Step1,
  setStep1: (step1Data) => set(() => ({ step1: step1Data })),

  step2: {} as Step2,
  setStep2: (step2Data) => set(() => ({ step2: step2Data })),
  setDeparture: (option) => set(({ step2 }) => {
    step2.departureOption = option;
    return { step2 };
  }),
  setReturn: (option) => set(({ step2 }) => {
    step2.returnOption = option;
    return { step2 };
  }),

  passengers: [],
  setPassengers: (passengers) => set(() => ({ passengers })),
  setPassenger: (passenger, index) => set(({ passengers }) => {
    const passlist = [...passengers];
    const pass = passlist.find(i => i.index === index);
    if(!pass){
      passlist.push({ index, data: passenger, isFormValid: true });
    }else{
      pass.data = passenger;
      pass.isFormValid = true;
    }
    return { passengers: passlist };
  }),
  setPassengerInvalid: (index) => set(({ passengers }) => {
    const passlist = [...passengers];
    const pass = passlist.find(i => i.index === index);
    if(!pass){
      passlist.push({ index, data: {} as Passenger, isFormValid: false });
    }else{
      pass.isFormValid = false;
    }
    return { passengers: passlist };
  }),

  availablityOptions: {} as AvailablityResponse,
  setAvailablityOptions: (availablityOptions) => set(() => ({ availablityOptions }))
}));
