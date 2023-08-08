"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import qs from "qs"
import { myApi } from '@/utils/axios';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import { Pagination, Rating  } from '@mui/material';
import moment from 'moment';
import EmptyStatus from '@/components/element/EmptyStatus';
import { Skeleton } from '@/components/ui/skeleton';
moment().locale('mn')




function ReviewsIReceived() {

  const { token, user } = useUser()

  const [page, setPage] = useState(1);

  const query = qs.stringify({
    filters: {
      recieved: user?.id
    },
    populate: {
     
      user:{
        fields:["username","firstname"]
      }
    }

  }, { encodeValuesOnly: true });

  const paginationQuery = qs.stringify({
    pagination: {
      page: page,
      pageSize: 5
    }
  }, { encodeValuesOnly: true })


  // console.log(filter)
  useEffect(() => {
    setPage(1);
  }, [query])

  const { data, isError, isLoading } = useQuery<any>({
    queryKey: ["reviewsRecieved", query, paginationQuery, user],
    queryFn: async () => {
      const res = await myApi.get(`/api/reviews?${query}&${paginationQuery}`);
      return res.data;
    }
  });


  const reviews = data?.data;
  const pagination = data?.meta.pagination;

  // console.log("recieved",reviews)


  if (isLoading) return (
    <div>
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
    </div>
  )

  if (!isLoading && !Boolean(reviews?.length)) return <EmptyStatus />


  return (
    <div>
    
      {
        reviews?.map(({ attributes, id }: any) => (
          <div key={id} className='flex bg-white p-4 sm:p-8 rounded-lg flex-col pb-5 mb-5 border-b-2'>
            <div>
              {/* <h2 className='font-medium text-lg'>{attributes.user.data.attributes.firstname}</h2> */}
              <h2 className='font-medium text-lg'>{attributes.user.data.attributes.username}</h2>
              <p className='text-gray-500'>{moment(attributes.createdAt).format('ll')}</p>

              <div className='flex mb-4 gap-3'>
                <Rating value={attributes.rate} readOnly />
              </div>
              <div className='text-gray-600'>{attributes.description}</div>
            </div>
          </div>
        ))
      }


      <div className='flex justify-center py-10'>
        <Pagination count={pagination?.pageCount} onChange={(e, val) => {
          setPage(val)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }} page={page} variant="outlined" shape="rounded" size="medium" />
      </div>

    </div>
  );
}

export default ReviewsIReceived;
