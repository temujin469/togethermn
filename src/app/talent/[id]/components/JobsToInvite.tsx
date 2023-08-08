"use client"
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import qs from "qs"
import { myApi } from '@/utils/axios';
import { useUser } from '@/hooks/useUser';
import { Pagination } from '@mui/material';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Scroll } from 'lucide-react';
import { cn } from '@/lib/utils';
import { H4 } from '@/components/ui/Typography/Heading';


type JobItemProps = {
  job: Partial<ResponseJob>
  isInvitedTalent: boolean
  isSelected: boolean
  jobId: number
  onChange: (jobId: number) => void
}

const JobItem = ({ job, isInvitedTalent, isSelected, jobId, onChange }: JobItemProps) => {

  const active = "border-secondary";

  // const disabled = 'hover:border-gray-200 bg-gray-100 '
  const disabled = ''


  const handleClick = () => {
    // if (!isInvitedTalent) {
    onChange(jobId)
    // }
  }


  return (
    <div onClick={handleClick}
      className={cn("flex relative bg-white px-4 py-3 rounded-md mb-5 border-2 hover:border-secondary cursor-pointer", isInvitedTalent ? disabled : isSelected ? active : null)}
    >
      {/* {
      
        isInvitedTalent && (<div className='absolute left-0 top-0 w-full h-full bg-white/50'></div>)
      } */}
      {

        isSelected && (<CheckCircle size={18} className='text-secondary absolute right-2 top-2' />)
      }
      <div className='mb-10 flex rounded-md flex-col lg:flex-row gap-5 justify-between'>
        <div>
          <H4 className='text-primary scroll-m-0 mb-2'>{job.title}</H4>
          <p className='font-semibold mb-2'>{job.profession} - {job.budget} </p>
          <blockquote className='border-l-4 pl-6 border-l-gray-400'>
            {
              job.description && (
                <div dangerouslySetInnerHTML={{ __html: (job.description.length > 100) ? `${job.description?.slice(0, 100)}...` : job.description }} />
              )
            }

            <table>
              <tbody>
                <tr>
                  <td>
                    <p className='font-semibold'>Байршил: </p>
                  </td>
                  <td>{job.locations?.join(",\n")}</td>
                </tr>
                <tr>
                  <td>
                    <p className='font-semibold'>Нас: </p>
                  </td>
                  <td>{job.minAge}-{job.maxAge}</td>
                </tr>
                <tr>
                  <td>
                    <p className='font-semibold'>Хүйс: </p>
                  </td>
                  <td>{job.gender}</td>
                </tr>
                {/* <div value={job.minAge || job.maxAge ? `${job.minAge}-${job.maxAge}` : "Бүх"} label={"Нас: "} />
                <div value={job.gender} label={"Хүйс: "} /> */}
              </tbody>
            </table>
          </blockquote>
        </div>
      </div>
    </div>
  )
}


function JobsToInvite({ onChange, jobId: selectedJobId }: { onChange: (jobId: number) => void, jobId?: number }) {

  const { token, user } = useUser()

  const [page, setPage] = useState(1);


  const query = qs.stringify({
    filters: {
      $and: [
        {
          status: {
            $eqi: "батлагдсан"
          },
        },
        {
          isClosed: {
            $eq: false
          },
        }
      ],

      user: user?.id
    },
    populate: {
      invitedUser: {
        fields: ["username", "id"]
      }
    },


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
    queryKey: ["myJobs", query, paginationQuery, user?.id],
    queryFn: async () => {
      const res = await myApi.get(`/api/azhils?${query}&${paginationQuery}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      return res.data;
    }
  });

  console.log(data)


  const myJobs = data?.data;
  const pagination = data?.meta.pagination;


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
      <p className='font-medium'>Урих ажил одоогоор алга байна</p>
    </div>
  )




  // console.log("by uer", talentId)
  return (
    <div>
      {
        myJobs?.map(({ attributes, id }) => (
          <JobItem
            job={attributes}
            onChange={onChange}
            jobId={id}
            isInvitedTalent={Boolean(attributes.invitedUser?.data?.id)}
            isSelected={id === selectedJobId}
          />
        ))
      }

      <div className='flex justify-center py-5'>
        <Pagination count={pagination?.pageCount} onChange={(e, val) => {
          setPage(val)
        }} page={page} variant="outlined" shape="rounded" size="medium" />
      </div>

    </div>
  );
}

export default JobsToInvite;
