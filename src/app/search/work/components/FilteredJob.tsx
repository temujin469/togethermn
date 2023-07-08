"use client"
import { H4 } from '@/components/ui/Typography/Heading';
import { Button } from '@/components/ui/button';
import { jobs } from '@/utils/data';
import { Pagination } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const ShowDetail = ({value,label}:{value?:string,label:string})=>{

  if(!value) return null

  return (
      <tr>
        <td>
          <p className='font-semibold'>{label}</p>
        </td>
        <td>{value}</td>
      </tr>
  )
}


const JobItem = ({job}:{job:Partial<Job>}) => {

  const budget = job.budgetType == "perDay" ? job.perDay : job.perHour
  return (

    <div className='mb-10 flex flex-col lg:flex-row gap-5 justify-between'>
      <div>
        <H4 className='text-primary scroll-m-0 mb-2'>{job.title}</H4>
        <p className='font-semibold mb-2'>{job.profession} - {budget} </p>
        <blockquote className='border-l-2 pl-6 border-l-secondary'>
          {
            job.description && (
              <p>{
                (job.description.length > 150) ? `${job.description?.slice(0, 150)}...` : job.description
              }</p>
            )
          }

          <table>
            <tbody>
              <ShowDetail value={job.locations![0]} label={"Байршил: "} />
              <ShowDetail value={`${job.minAge}-${job.maxAge}`} label={"Нас: "} />
              <ShowDetail value={job.gender} label={"Хүйс: "} />
            </tbody>
          </table>
        </blockquote>
      </div>
      <Link href={`/job/${job.title}`}>
        <Button>дэлгэрэнгүй</Button>
      </Link>
    </div>
  )
}

function FilteredJob() {
  return (
    <div className='shadow p-5 xl:p-10'>
      {
        jobs?.map((job)=>(
          <JobItem job={job}/>
        ))
      }
      <div className='flex justify-center mt-10'>
        <Pagination count={5} variant="outlined" shape="rounded" size="medium"  />
    </div>
    </div>
    
  );
}

export default FilteredJob;
