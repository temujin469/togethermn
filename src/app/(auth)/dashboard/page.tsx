import React from 'react';
import SubHeader from '@/components/header/SubHeader';
import { ArrowLeft } from 'lucide-react';
import JobTab from './components/JobTab';

function Dashboard() {
  return (
    <>
      <SubHeader left={<div className='flex gap-2 items-center'>
        <ArrowLeft />
        <p>Миний ажлууд</p>
      </div>} />
      <JobTab />
    </>
  );
}

export default Dashboard;

