import React from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import StepIndicator from '../components/StepIndicator';
import StepContent from '../components/StepContent';


const steps = [
  'Дэлгэрэнгүй',
  'Хэн',
  'Төсөв',
  'Баталгаажуулалт',
];




function WorkWithContentCreator() {
  return (
    <div>
      <StepIndicator steps={steps} />
      <StepContent stepFor={1}>
        <Step1 />
      </StepContent>
      <StepContent stepFor={2}>
        <Step2 />
      </StepContent>
      <StepContent stepFor={3}>
        <Step3 />
      </StepContent>
      <StepContent stepFor={4}>
        <Step4 />
      </StepContent>
    </div>
  );
}

export default WorkWithContentCreator;






