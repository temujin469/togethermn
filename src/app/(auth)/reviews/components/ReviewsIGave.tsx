"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import qs from "qs"
import { myApi } from '@/utils/axios';
import { useUser } from '@/hooks/useUser';
import { Pagination, Rating } from '@mui/material';
import moment from 'moment';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';


function ReviewsIGave() {

  const { token, user } = useUser();

  const [page, setPage] = useState(1);

  const query = qs.stringify({
    // fields: ["id"],
    filters: {
      user:user?.id
    },
    populate: {
      recieved: {
        fields: ["username", "firstname"]
      },
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




  const { data, isError, isLoading } = useQuery<any>({
    queryKey: ["reviewsIGave", query, paginationQuery,user],
    queryFn: async () => {
      const res = await myApi.get(`/reviews?${query}&${paginationQuery}`);
      return res.data;
    }
  });


  const reviewsIGave = data?.data;
  const pagination = data?.meta.pagination;

  console.log(reviewsIGave)

  return (
    <div>
      {
        reviewsIGave?.map(({ attributes, id }: any) => (
          <div key={id} className='flex bg-white sm:items-center p-4 sm:p-8 rounded-lg flex-col gap-5 sm:flex-row justify-between pb-5 mb-5 border-b-2'>
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <h2 className='font-medium text-lg'>{attributes.user.data.attributes.username}</h2>
                -
                <h2 className='font-medium text-lg'>{attributes.recieved.data.attributes.username}</h2>
              </div>
              <div className='flex mb-4 gap-3'>
                <Rating value={attributes.rate} readOnly />
                <p >{moment(attributes.createdAt).format('ll')}</p>
              </div>
              <div className='text-gray-600'>{attributes.description}</div>
            </div>
            <div className='flex gap-4'>
              <Button className='flex-[1] sm:flex-[0]'>
                Засах
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className='flex-[1] sm:flex-[0]' >
                    Устгах
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Устгах</DialogTitle>
                    <DialogDescription>
                      Та энэ ажлыг устгахдаа итгэлтэй байна уу?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <div className='flex gap-2 justify-end'>
                      <DialogClose>
                        <Button type="submit" variant="ghost">Үгүй</Button>
                      </DialogClose>
                      <Button type="submit" variant="destructive">Тийм</Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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

export default ReviewsIGave;
