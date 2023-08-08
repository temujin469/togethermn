import EmptyStatus from '@/components/element/EmptyStatus';
import BlurImage from '@/components/ui/BlurImage';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import useGetAppliedJobs from '@/hooks/job/useGetAppliedJobs';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { Pagination } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import QueryString from 'qs';
import React, { useEffect, useState } from 'react';

function AppliedJobs() {
  const { token, user } = useUser();
  const [page, setPage] = useState(1);
  const { toast } = useToast()
  const queryClient = useQueryClient()

  useEffect(() => {
    setPage(1);
  }, [])

  const { data, isError, isLoading } = useGetAppliedJobs({ variables: { token, appliedUserId: user?.id, page } })

  const appliedJobs = data?.data;
  const pagination = data?.meta.pagination;


  // used for mutation //
  const populateQuery = QueryString.stringify({
    fields: ["appliedJobs"],
    populate: {
      appliedJobs: {
        fields: ["id"]
      }
    }
  }, { encodeValuesOnly: true })


  const updateMutation = useMutation({
    mutationFn: async (currentJobId: number) => {
      if (user?.id) {
        const populatedUserRes = await myApi.get<Partial<User>>(`/api/users/${user?.id}?${populateQuery}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        });

        // remove the current user from applied job lists //
        const appliedJobIds = populatedUserRes.data.appliedJobs?.map(job => job.id);
        const updatedAppliedJobIds: number[] | undefined = appliedJobIds?.filter(id => id !== currentJobId);

        const res = await myApi.put(`/api/users/${user?.id}`, { appliedJobs: updatedAppliedJobIds }, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        return res.data;
      }
    },
    onSuccess: () => {
      toast({
        description: "Өргөдөл амжилттай буцаагдлаа",
      })
      queryClient.invalidateQueries(useGetAppliedJobs.getKey())
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })



  const handleRequistReturn = (id: number) => {
    if (user?.id) {
      updateMutation.mutate(id);
    }
  }


  if (isLoading) return (
    <div>
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
    </div>
  )

  if (!isLoading && !Boolean(appliedJobs?.length)) return <EmptyStatus />

  return (
    <div>
      {
        appliedJobs?.map(({ attributes, id }) => {
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

              <div className='w-full space-y-4'>
                <p>{attributes.user.data.attributes.username}</p>
                <Link href={`/job/${id}`} className='text-lg font-medium'>{attributes?.title}</Link>
              </div>
              <div className='flex gap-5 w-full sm:w-auto'>
                <Button className='flex-[1] whitespace-nowrap' onClick={() => handleRequistReturn(id)}>
                  Өргөдөл буцаах
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

export default AppliedJobs;
