"use client"
import { Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { myApi } from '@/utils/axios';
import qs from "qs"
import { Skeleton } from '@/components/ui/skeleton';
import JobItem from './JobItem';
import useSearchJob from '@/hooks/useSearchJob';




function FilteredJob() {
  const [page, setPage] = useState(1);
  const { setResult, filter } = useSearchJob()

  const query = qs.stringify({
    filters: {
      status:{
        $eqi:"батлагдсан"
      }
    }
  }, { encodeValuesOnly: true });

  const filterquery = qs.stringify({
    filters: {
      profession: {
        $eqi: filter?.profession
      },
      locations: {
        $contains: filter?.location
      }
    }
  }, { encodeValuesOnly: true });

  const paginationQuery = qs.stringify({
    pagination: {
      page: page,
      pageSize: 7
    }
  }, { encodeValuesOnly: true })


  // console.log(filter)
  useEffect(()=>{
    setPage(1);
  },[query])

  const { data, isError, isLoading } = useQuery<JobsResponse>({
    queryKey: ["jobs", query, paginationQuery],
    queryFn: async () => {
      const res = await myApi.get(`/api/azhils?${query}&${filter && filterquery}&${paginationQuery}`);
      setResult(res.data.meta.pagination.total);
      return res.data;
    }
  });

  // console.log(data)
  const jobs = data?.data
  const pagination = data?.meta.pagination

  return (
    <div className='shadow p-5 xl:p-10'>
      {
        isLoading ? (
          <div className='space-y-10'>
            {
              Array(3).fill(null).map((_,i) => (
                <div key={i}>
                  <Skeleton className='h-[50px] mb-3' />
                  <Skeleton className='h-[140px]' />
                </div>
              ))
            }
          </div>
        ) : jobs ? (
          <>
            {
              jobs?.map((job) => (
                <JobItem key={job.id} job={job.attributes} id={job.id} />
              ))
            }
            <div className='flex justify-center mt-10'>
              <Pagination count={pagination?.pageCount} onChange={(e, val) =>{
                  setPage(val)
                  window.scrollTo({top:0,behavior:"smooth"})
              }} page={page} variant="outlined" shape="rounded" size="medium" />
            </div>
          </>
        ) : (
          <div>
            Ажил алга
          </div>
        )
      }
    </div>

  );
}

export default FilteredJob;
