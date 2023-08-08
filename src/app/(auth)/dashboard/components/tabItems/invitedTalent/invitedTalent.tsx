import EmptyStatus from '@/components/element/EmptyStatus';
import BlurImage from '@/components/ui/BlurImage';
import { Skeleton } from '@/components/ui/skeleton';
import useGetInvitedJobTalent from '@/hooks/job/useGetInvitedJobTalent';
import { useUser } from '@/hooks/useUser';
import { Pagination } from '@mui/material';
import moment from 'moment';
import "moment/locale/mn"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CencelInvitionModal from './components/CencelInvitionModal';

function InvitedTalent() {
  const { token, user } = useUser();
  const [page, setPage] = useState(1);

  // console.log(filter)
  useEffect(() => {
    setPage(1);
  }, [])

  const { data, isError, isLoading } = useGetInvitedJobTalent({ variables: { token, userId: user?.id, page } })

  const invitedJobsTalent = data?.data;
  const pagination = data?.meta.pagination;

  // console.log("ivited jobs", invitedJobs)


  if (isLoading) return (
    <div>
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
    </div>
  )

  if (!isLoading && !Boolean(invitedJobsTalent?.length)) return <EmptyStatus />

  return (
    <div>
      {
        invitedJobsTalent?.map(({ attributes, id }) => {
          const talentId = attributes.invitedUser?.data?.id
          const profileId = attributes.invitedUser.data?.attributes.profile?.data.id

          return (
            <div className='flex bg-white p-4 rounded-md flex-col gap-5 sm:flex-row justify-between items-center pb-5 mb-5 shadow'>
              <Link href={`/talent/${profileId}`} className='sm:max-w-[80px] hover:opacity-90 overflow-hidden sm:rounded-full sm:aspect-square aspect-video relative w-full'>
                <BlurImage
                  alt="Remy Sharp"
                  src={
                    attributes.invitedUser.data?.attributes.profile?.data.attributes.profileImage?.data.attributes.url
                  }
                  fill
                />
              </Link>

              <div className='w-full space-y-4'>
                <div>
                  <Link href={`/talent/${profileId}`} className='text-lg text-gray-700 font-medium'>{attributes.invitedUser?.data?.attributes.username}</Link>
                  <p className='text-gray-500'>{moment(attributes?.invitedDate).format('ll')}</p>
                  <p className='text-lg text-gray-700'>{attributes.invitedUser?.data?.attributes.profile.data?.attributes.professions.join(",\n")}</p>
                </div>

                <Link href={`/job/${id}`} className='text-gray-600 hover:text-secondary'>{attributes?.title}</Link>
              </div>
                <CencelInvitionModal talentId={talentId} jobId={id}/>
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

export default InvitedTalent;
