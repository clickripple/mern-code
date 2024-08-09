import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Find a reservation',
  'Select Your Reservations ',
  'Passenger Information',
  'Make a payment'
];

export default function StepperForm({ activeStep }: {activeStep: number}) {
  return (
    <Box sx={{ width: '100%', marginBottom: '50px' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
