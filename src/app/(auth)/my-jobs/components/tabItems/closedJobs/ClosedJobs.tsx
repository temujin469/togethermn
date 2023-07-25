"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import qs from "qs"
import { myApi } from '@/utils/axios';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import { Pagination } from '@mui/material';
import { Skeleton } from '@/components/ui/skeleton';
import usePostJob from '@/hooks/usePostJob';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Scroll } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import AppliedUsersModal from '../../AppliedUsersModal';


function ClosedJobs() {

  const { token, user } = useUser();
  const [page, setPage] = useState(1);
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const query = qs.stringify({
    // fields: ["id"],
    filters: {
      isClosed: {
        $eq: true
      },
      user: user?.id
    },
    populate: {
      // user: {
      //   fields:["id"],
      // },
      castTalent: {
        fields: "*"
      },
      influencer: {
        fields: "*"
      },
      contentCreator: {
        fields: "*"
      },
      creativeProduction: {
        fields: "*"
      },
      bookedBy: {
        fields: ["id"]
      },
      appliedUsers: {
        fields: ["id", "username", "profile"],
        populate: {
          profile: {
            fields: ["profileImage", "professions", "firstname", "rate", "instagramFollowers", "location"],
            populate: {
              profileImage: {
                fields: ["formats", "url"]
              }
            }
          }
        },
      },

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

  const { data, isError, isLoading } = useQuery<JobsResponse>({
    queryKey: ["closedJobs", "myJobs", query, paginationQuery, token],
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
  const pagination = data?.meta.pagination;

  console.log("by uedfr", myJobs)


  const deleteMutation = useMutation({
    mutationKey: ["deleteJob"],
    mutationFn: async (id: number) => {
      const res = await myApi.delete(`/api/azhils/${id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      return res.data;
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Хүсэлт амжилттай",
        description: "Амжилттай устгагдлаа"
      })
      queryClient.invalidateQueries(["closedJobs"])
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive"
      })
    }
  })

  const publishMutation = useMutation({
    mutationKey: ["publishJob"],
    mutationFn: async (id: number) => {
      const res = await myApi.put(`/api/azhils/${id}`, { data: { isClosed: false } }, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      return res.data;
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Амжилттай нийтэллээ",
      })
      queryClient.invalidateQueries(["myJobs"])
      queryClient.invalidateQueries(["closedJobs"])
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handlePublish = (id: number) => {
    publishMutation.mutate(id);
  }


  if (isLoading && !Boolean(myJobs?.length)) return (
    <div>
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
    </div>
  )

  if (!isLoading && !Boolean(myJobs?.length)) return (
    <div className='flex select-none text-gray-300 flex-col items-center justify-center'>
      <Scroll size={80} />
      <p className='font-medium'>Хоосон байна</p>
    </div>
  )

  return (
    <div>
      {
        myJobs?.map(({ attributes, id }) => (
          <div className='flex bg-white p-4 rounded-md flex-col-reverse gap-5 sm:flex-row justify-between items-center pb-5 mb-5 shadow'>
            <div className='w-full space-y-4'>
              <Link href={`/job/${id}`} className='text-lg font-medium'>{attributes?.title}</Link>
              <div className='flex gap-4'>
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
                        <Button type="submit" variant="destructive" onClick={() => handleDelete(id)}>Тийм</Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className='flex gap-5'>
              <div className='flex flex-col items-center'>
                <AppliedUsersModal job={attributes} />
              </div>
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

export default ClosedJobs;
