"use client"
import { Step, StepLabel, Stepper } from '@mui/material';
import usePostJob from '@/hooks/usePostJob';

type Props = {
  steps:string[]

}




function StepIndicator({steps}:Props) {
  const { step } = usePostJob()
  return(
    <div>
      <Stepper activeStep={step - 1} alternativeLabel variant="elevation" className='my-5 max-w-[1200px] mx-auto'>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <p className='text-sm'>{label}</p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default StepIndicator;
