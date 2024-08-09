"use client";
import React, { useState } from "react";
import StepperForm from "./components/Stepper";
import StepLayout from "./components/StepLayout";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2/Step2";
import Step3 from "./components/Step3/Step3";
import Step4 from "./components/Step4/Step4";

const Book = ({ env }: { env: any }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="content-form mt-5">
      <h4 className="text-center">Book your shuttle!</h4>
      <p className="text-center mb-4 no-hidden">(No hidden charges)</p>
      <StepperForm activeStep={activeStep} />
      {activeStep === 0 && (
        <StepLayout>
          <Step1 onSuccess={() => setActiveStep(1)} />
        </StepLayout>
      )}
      {activeStep === 1 && (
        <StepLayout>
          <Step2
            onBack={() => setActiveStep(0)}
            onSuccess={() => setActiveStep(2)}
          />
        </StepLayout>
      )}
      {activeStep === 2 && (
        <StepLayout>
          <Step3
            onBack={() => setActiveStep(1)}
            onSuccess={() => setActiveStep(3)}
          />
        </StepLayout>
      )}
      {activeStep === 3 && (
        <StepLayout>
          <Step4 env={env} onBack={() => setActiveStep(2)} />
        </StepLayout>
      )}
    </div>
  );
};

export default Book;
