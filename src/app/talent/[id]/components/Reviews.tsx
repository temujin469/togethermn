"use client"
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import qs from "qs"
import { myApi } from '@/utils/axios';
import Link from 'next/link';
import { Pagination, Rating } from '@mui/material';
import moment from 'moment';



function Reviews({userId}:{userId?:number}) {

  const [page, setPage] = useState(1);

  const query = qs.stringify({
    filters: {
      recieved: userId
    },
    populate: {

      user: {
        fields: ["username", "firstname"]
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
    queryKey: ["reviewsIGave", query, paginationQuery, userId],
    queryFn: async () => {
      const res = await myApi.get(`/api/reviews?${query}&${paginationQuery}`);
      return res.data;
    }
  });


  const reviews = data?.data;
  const pagination = data?.meta.pagination;

  return (
    <div>

      {
        reviews?.map(({ attributes, id }: any) => (
          <div key={id} className='flex bg-white p-4 sm:p-8 flex-col pb-5 mb-5 border-b'>
            <div>
              {/* <h2 className='font-medium text-lg'>{attributes.user.data.attributes.firstname}</h2> */}
              <h2 className='font-medium text-lg'>{attributes.user.data.attributes.username}</h2>

             

              <div className='flex mb-4 gap-3'>
                <Rating value={attributes.rate} readOnly />
                <p className='text-gray-500'>{moment(attributes.createdAt).format('ll')}</p>
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

export default Reviews;
