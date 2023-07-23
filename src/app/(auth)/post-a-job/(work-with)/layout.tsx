"use client"
import React, { useEffect } from 'react';
import usePostJob from '@/hooks/usePostJob';
import Header from './components/Header';
import { useRouter } from 'next/navigation';


function layout({ children }: { children: React.ReactNode }) {
  const { job } = usePostJob()
  const router = useRouter()

  useEffect(() => {
    // if (!job?.profession) router.back()
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header title={job?.profession as string} />
      <div className='max-w-[1200px] mx-auto lg:px-10 lg:pb-10'>
        {children}
      </div>
    </div>
  );
}

export default layout;
