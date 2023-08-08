import React from 'react';
import Header from '@/components/header';
import SubHeader from '@/components/header/SubHeader';
import { ArrowLeft } from 'lucide-react';
import ReviewsTab from './components/ReviewsTab';

import moment from 'moment';
import "moment/locale/mn"

moment().locale('mn')



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
