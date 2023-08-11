import EmptyStatus from '@/components/element/EmptyStatus';
import AddReviewModal from '@/components/modal/review/AddReviewModal';
import BlurImage from '@/components/ui/BlurImage';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import useGetBookedJobsTalent from '@/hooks/job/useGetBookedJobTalent';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { Pagination } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import Link from 'next/link';
import QueryString from 'qs';
import React, { useEffect, useState } from 'react';
moment().locale('mn')

function BookedTalent() {
  const { token, user } = useUser();
  const [page, setPage] = useState(1);
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // console.log(filter)
  useEffect(() => {
    setPage(1);
  }, [])

  const query = QueryString.stringify(
    {
      fields: ["title", "bookedBy", "bookedDate", "createdAt"],
      filters: {
        $and: [
          {
            bookedBy: {
              id: {
                $gte: 1,
              },
            },
          },
          {
            user:user?.id
          },
        ],
      },
      populate: {
        bookedBy: {
          populate: {
            profile: {
              populate: ["profileImage"],
            },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const { data, isError, isLoading } = useGetBookedJobsTalent({ variables: { token,page,query } })

  const bookedJobsTalent = data?.data;
  const pagination = data?.meta.pagination;

  // console.log("ivited jobs", bookedJobsTalent)


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

  const removeMutation = useMutation({
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
        description: "Амжилттай устгагдлаа",
      })
      queryClient.invalidateQueries(useGetBookedJobsTalent.getKey())
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })



  const handleRemove = (id: number) => {
    if (user?.id) {
      removeMutation.mutate(id);
    }
  }


  if (isLoading) return (
    <div>
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
    </div>
  )

  if (!isLoading && !Boolean(bookedJobsTalent?.length)) return <EmptyStatus />

  console.log(bookedJobsTalent)


  return (
    <div>
      {
        bookedJobsTalent?.map(({ attributes, id }) => {
          const talentId = attributes.bookedBy?.data?.id
          const profileId = attributes.bookedBy?.data?.attributes.profile?.data.id

          return (
            <div className='flex bg-white p-4 rounded-md flex-col gap-5 sm:flex-row justify-between items-center pb-5 mb-5 shadow'>
              <Link href={`/talent/${profileId}`} className='sm:max-w-[80px] hover:opacity-90 overflow-hidden sm:rounded-full sm:aspect-square aspect-video relative w-full'>
                <BlurImage
                  alt="Remy Sharp"
                  src={
                      attributes.bookedBy?.data?.attributes.profile?.data.attributes.profileImage?.data.attributes.url
                  }
                  fill
                />
              </Link>

              <div className='w-full space-y-4'>
                <div>
                  <Link href={`/talent/${profileId}`} className='text-lg text-gray-700 font-medium'>{attributes.bookedBy?.data?.attributes.username}</Link>
                  <p className='text-gray-500'>{moment(attributes?.bookedDate).format('ll')}</p>
                  <p className='text-lg text-gray-700'>{attributes.bookedBy?.data?.attributes.profile.data?.attributes.professions.join(",\n")}</p>
                </div>
                
                <Link href={`/job/${id}`} className='text-gray-600 hover:text-secondary'>{attributes?.title}</Link>
              </div>
              <div className='flex gap-5 w-full sm:w-auto'>
                {/* <Button className='flex-[1]' onClick={() => handleRemove(id)}>
                  Устгах
                </Button> */}
                <AddReviewModal jobId={id} talentId={talentId} profileId={attributes.bookedBy.data.attributes.profile.data.id}/>
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

export default BookedTalent;
