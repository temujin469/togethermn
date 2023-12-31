"use client"
import usePostJob from '@/hooks/usePostJob';
import React from 'react';

type Props = {
  stepFor:number
  children:React.ReactNode
}

function StepContent({stepFor,children}:Props) {
  const {step} = usePostJob()
  if(stepFor === step) return (
    <>
    {children}
    </>
  )
}

export default StepContent;
