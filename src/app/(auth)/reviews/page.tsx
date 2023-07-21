import React from 'react';
import Header from '@/components/header';
import SubHeader from '@/components/header/SubHeader';
import { ArrowLeft } from 'lucide-react';
import ReviewsTab from './components/ReviewsTab';


function Reviews() {

  return (
    <div>
      <Header />
      <SubHeader left={<div className='flex gap-2 items-center'>
        <ArrowLeft />
        <p>Санал шүүмж</p>
      </div>} />
      <ReviewsTab />
    </div>
  );
}

export default Reviews;
