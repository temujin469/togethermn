"use client"
import React from 'react';
import { H3 } from '@/components/ui/Typography/Heading';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import qs from "qs"
import { myApi } from '@/utils/axios';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';


function MyJobs() {

  const { token,user } = useUser()

  const query = qs.stringify({
    // fields: ["id"],
    populate: {
      user: {
        filters: {
          id: {
            $eq: user?.id
          }
        },

      },
      bookedBy: {
        fields: ["id"]
      }
    }

  }, { encodeValuesOnly: true });

  const paginationQuery = qs.stringify({
    pagination: {
      page:1,
      pageSize: 5
    }
  }, { encodeValuesOnly: true });



  const { data, isError, isLoading } = useQuery<any>({
    queryKey: ["jobs", query,user],
    queryFn: async () => {
      const res = await myApi.get(`/api/azhils?${query}&${paginationQuery}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      return res.data;
    }
  });

  const myJobs = data?.data;

  console.log("by user", data)
  return (
    <div className='rounded-lg bg-white shadow p-4 md:p-6'>
      <div className='flex justify-between mb-5'>
        <H3>
          Миний ажил</H3>
        <Button>
          <Link href="/my-jobs">
            бүгдийг харах
          </Link>
        </Button>
      </div>
      {
        myJobs?.map(({attributes,id}: any) => (
          <div className='flex flex-col-reverse gap-5 sm:flex-row justify-between items-center pb-5 mb-5 border-b-2'>
            <div className='w-full space-y-4'>
              <Link href={`/job/${id}`} className='text-lg font-medium'>{attributes.title}</Link>
              <div className='flex gap-4'>
                {
                  !attributes?.isPublished && (
                    <Button variant="secondary" className='flex-[1] sm:flex-[0]'>
                      Нийтлэх
                    </Button>
                  )
                }
              </div>
            </div>
            <div className='flex gap-5'>
              <div className='flex flex-col items-center'>
                <p className='text-xl font-medium'>{attributes?.bookedBy.data.length}</p>
                <p>
                  Захиалагдсан</p>
              </div>
            </div>
          </div>
        ))
      }

    </div>
  );
}

export default MyJobs;
