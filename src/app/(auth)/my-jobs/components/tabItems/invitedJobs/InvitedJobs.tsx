import EmptyStatus from '@/components/element/EmptyStatus';
import BlurImage from '@/components/ui/BlurImage';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import useGetInvitedJobs from '@/hooks/job/useGetInvitedJobs';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { Pagination } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import Link from 'next/link';
import QueryString from 'qs';
import React, { useEffect, useState } from 'react';
import "moment/locale/mn"

function InvitedJobs() {
  const { token, user } = useUser();
  const [page, setPage] = useState(1);
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // console.log(filter)
  useEffect(() => {
    setPage(1);
  }, [])

  const { data, isError, isLoading } = useGetInvitedJobs({ variables: { token, ivitedUserId: user?.id, page } })

  const invitedJobs = data?.data;
  const pagination = data?.meta.pagination;

  // console.log("ivited jobs", invitedJobs)


  // used for mutation //
  const populateQuery = QueryString.stringify({
    fields: ["invitedJobs"],
    populate: {
      invitedJobs: {
        fields: ["id"]
      },
      appliedJobs: {
        fields: ["id"]
      },
    }
  }, { encodeValuesOnly: true })




  const acceptMutation = useMutation({
    mutationFn: async (currentJobId: number) => {



      if (user?.id) {

        // first populate user job list
        const populatedUserRes = await myApi.get<Partial<User>>(`/api/users/${user?.id}?${populateQuery}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        });



        const date = new Date().toJSON();
        // add to bookedJobs list
        const res = await myApi.put(`/api/azhils/${currentJobId}`, {
          data: {
            bookedBy: user?.id,
            bookedDate:date,
            isClosed:true
          }
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        });

        // remove the current user from other job lists because the user has been added to booked job list //
        const invitedJobIds = populatedUserRes.data?.invitedJobs?.map(job => job.id);
        const updatedInvitedJobIds: number[] | undefined = invitedJobIds?.filter(id => id !== currentJobId);

        const appliedJobIds = populatedUserRes.data.appliedJobs?.map(job => job.id);
        const updatedAppliedJobIds: number[] | undefined = appliedJobIds?.filter(id => id !== currentJobId);

        await myApi.put(`/api/users/${user?.id}`,
          { invitedJobs: updatedInvitedJobIds, appliedJobs: updatedAppliedJobIds },
          {
            headers: {
              Authorization: "Bearer " + token
            }
          });

        return res.data;
      }
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Хүсэлт амжилттай",
        description: "Ажлын саналыг хүлээж авлаа"
      })
      queryClient.invalidateQueries(useGetInvitedJobs.getKey())
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  const refusalMutation = useMutation({
    mutationFn: async (currentJobId: number) => {

      if (user?.id) {
        const populatedUserRes = await myApi.get<User>(`/api/users/${user?.id}?${populateQuery}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        });


        const invitedJobIds: number[] = populatedUserRes.data.invitedJobs.map(job => job.id);
        const updatedInvitedJobIds: number[] | undefined = invitedJobIds.filter(id => id !== currentJobId);


        const res = await myApi.put(`/api/users/${user?.id}`, { invitedJobs: updatedInvitedJobIds }, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        return res.data;


      }
    },
    onSuccess: () => {
      toast({
        description: "Ажлын саналаас татгалзлаа",
      })
      queryClient.invalidateQueries(useGetInvitedJobs.getKey())
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  const handleAccept = (id: number) => {
    if (user?.id) {
      acceptMutation.mutate(id)

    }
  }

  const handleRefusal = (id: number) => {
    if (user?.id) {
      refusalMutation.mutate(id);
    }
  }


  if (isLoading) return (
    <div>
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
    </div>
  )

  if (!isLoading && !Boolean(invitedJobs?.length)) return <EmptyStatus />

  return (
    <div>
      {
        invitedJobs?.map(({ attributes, id }) => {
          // const isProfile = Boolean(attributes.user.data.attributes.profile.data)
          return (
            <div className='flex bg-white p-4 rounded-md flex-col gap-5 sm:flex-row justify-between items-center pb-5 mb-5 shadow'>
              {/* <div className='sm:max-w-[80px] overflow-hidden sm:rounded-full sm:aspect-square aspect-video relative w-full'>
                <BlurImage
                  alt="Remy Sharp"
                  src={
                    isProfile ?
                      attributes.user.data.attributes.profile.data.attributes.profileImage?.data.attributes.url!
                      : undefined
                  }
                  fill
                />
              </div> */}

              <Link href={`/job/${id}`} className='w-full'>
                <p>{attributes.user.data.attributes.username}</p>
                <p className='text-gray-500'>{moment(attributes?.invitedDate).format('ll')}</p>
                <p className='text-lg font-medium'>{attributes?.title}</p>
              </Link>
              <div className='flex gap-5 w-full sm:w-auto'>
                <Button className='flex-[1]' onClick={() => handleRefusal(id)}>
                  Татгалзах
                </Button>
                <Button variant="secondary" className='flex-[1]' onClick={() => handleAccept(id)}>
                  Зөвшөөрөх
                </Button>
              </div>
            </div>
          )
        })
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

export default InvitedJobs;
