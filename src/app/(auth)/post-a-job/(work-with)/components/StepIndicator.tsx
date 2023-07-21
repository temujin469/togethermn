"use client"
import { Step, StepIconProps, StepLabel, Stepper,  } from '@mui/material';
import { styled } from '@mui/material/styles';
import usePostJob from '@/hooks/usePostJob';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Check } from 'lucide-react';

type Props = {
  steps:string[]

}
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#1976d2',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#1976d2',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));



function StepIndicator({steps}:Props) {
  const { step } = usePostJob()
  return(
    <div>
      <Stepper connector={<QontoConnector />} activeStep={step - 1} alternativeLabel variant="elevation" className='mt-5 mb-2 sm:mb-5 max-w-[1200px] mx-auto'>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <p className='md:text-sm hidden max-w-[70px] sm:max-w-full sm:block'>{label}</p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default StepIndicator;
