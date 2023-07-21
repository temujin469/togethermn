"use client"
import React, { useEffect } from 'react';
import StepContent from '../components/StepContent';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import StepIndicator from '../components/StepIndicator';
import Step4 from './components/Step4';
import { Metadata } from 'next';






const steps = [
  'Дэлгэрэнгүй',
  'Хэн',
  'Төсөв',
  'Баталгаажуулалт',
];

function WorkWithInfluencer() {
  useEffect(() => {
    // you are safe to use the 'document' object here
    document.title = 'togehthermn';
  }, []);
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

export default WorkWithInfluencer;






