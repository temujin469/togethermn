"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import qs from "qs"
import { myApi } from '@/utils/axios';
import { useUser } from '@/hooks/useUser';
import { Avatar, Pagination, Rating } from '@mui/material';
import moment from 'moment';

import DeleteReviewModal from '@/components/modal/review/DeleteReviewModal';
import Link from 'next/link';
import "moment/locale/mn"
import EmptyStatus from '@/components/element/EmptyStatus';
import { Skeleton } from '@/components/ui/skeleton';
import useGetReviews from '@/hooks/review/useGetReviews';
moment().locale('mn')


function ReviewsIGave() {

  const { token, user } = useUser();

  const [page, setPage] = useState(1);

  const query = qs.stringify({
    // fields: ["id"],
    filters: {
      user: user?.id
    },
    populate: {
      recieved: {
        fields: ["username", "firstname", "profile"],
        populate: {
          profile: {
            fields: ["id", "profileImage"],
            populate: {
              profileImage: {
                fields: ["url"]
              }
            }
          }
        },
      },
      user: {
        fields: ["username", "firstname"]
      },
      job: {
        fields: ["id"]
      }

    },
    pagination: {
      page: page,
      pageSize: 5
    }

  }, { encodeValuesOnly: true });

  const { data, isError, isLoading } = useGetReviews({variables:{query}})
  const reviewsIGave = data?.data;
  const pagination = data?.meta.pagination;

  // console.log(reviewsIGave)


  if (isLoading) return (
    <div>
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
    </div>
  )

  if (!isLoading && !Boolean(reviewsIGave?.length)) return <EmptyStatus />

  return (
    <div>
      {
        reviewsIGave?.map(({ attributes, id }: any) => (
          <div key={id} className='flex bg-white sm:items-center p-4 sm:p-8 rounded-lg flex-col gap-5 sm:flex-row justify-between pb-5 mb-5 border-b-2'>
            <div>

              <Link href={`/talent/${attributes.recieved.data?.attributes.profile?.data.id}`}
                className='flex gap-2 mb-3 items-center'>
                <Avatar sx={{ width: 56, height: 56 }} src={attributes.recieved.data?.attributes.profile?.data.attributes.profileImage?.data?.attributes.url} />
                <div>
                  <h2 className='font-medium text-lg'>{attributes.recieved.data?.attributes.username}</h2>
                  <p className='text-gray-500'>{moment(attributes.createdAt).format('ll')}</p>
                </div>
              </Link>
              <div className='flex mb-4 gap-3'>
                <Rating value={attributes.rate} readOnly />
              </div>
              <div className='text-gray-600'>{attributes.description}</div>
            </div>
            {/* <div className='flex gap-4'> */}
            {/* <Button className='flex-[1] sm:flex-[0]'>
                Засах
              </Button> */}
            <div>
              <DeleteReviewModal reviewId={id} />
            </div>

            {/* </div> */}
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

export default ReviewsIGave;
