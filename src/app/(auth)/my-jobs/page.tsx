import React from 'react';
import Header from '@/components/header';
import SubHeader from '@/components/header/SubHeader';
import { ArrowLeft } from 'lucide-react';
import JobTab from './components/JobTab';


function MyJobs() {
  return (
    <div className=''>
      <Header />
      <SubHeader left={<div className='flex gap-2 items-center'>
        <ArrowLeft  />
        <p>Миний ажил</p>
      </div>}/>
        <JobTab/>
    </div>
  );
}

export default MyJobs;
