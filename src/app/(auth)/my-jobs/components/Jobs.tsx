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
import { MoreHorizontal, Scroll } from 'lucide-react';
import AppliedUsersModal from './AppliedUsersModal';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/ui/menubar';


function Jobs() {

  const { token, user } = useUser()

  const [page, setPage] = useState(1);
  const { setJob, setStep, job } = usePostJob()
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const query = qs.stringify({
    // fields: ["id"],
    sort: ["updatedAt:desc"],
    filters: {
      isClosed: {
        $eq: false
      },
      user: user?.id
    },
    populate: {
      // user: {
      //   fields: ["id"],
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
            fields: ["profileImage","professions","firstname","rate","instagramFollowers","location"],
            populate: {
              profileImage: {
                fields: ["formats","url"]
              }
            }
          }
        },
      },
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
    queryKey: ["openJobs", "myJobs", query, paginationQuery, user?.id],
    queryFn: async () => {
      const res = await myApi.get(`/azhils?${query}&${paginationQuery}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      return res.data;
    }
  });

  console.log("by uer", data)

  const myJobs = data?.data;
  const pagination = data?.meta.pagination;

  const handleClick = (id: number) => {
    const editJob = myJobs?.find(job => job.id === id);
    setJob({ ...editJob?.attributes })
    console.log(job)
    setStep(1)
    router.push(`/post-a-job/${editJob?.attributes.category}?update=${editJob?.id}`);
  }


  const closeMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await myApi.put(`/azhils/${id}`, { data: { isClosed: true } }, {
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

  // const mutation = useMutation({
  //   mutationFn:async(id:number)=>{
  //     const res = await myApi.delete(`/azhils/${id}`, {
  //       headers: {
  //         Authorization: "Bearer " + token
  //       }
  //     });
  //     return res.data;
  //   },
  //   onSuccess: () => {
  //     toast({
  //       variant: "success",
  //       title: "Хүсэлт амжилттай",
  //       description: "Амжилттай устгагдлаа"
  //     })
  //     queryClient.invalidateQueries(["jobs"])
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Хүсэлт амжилтгүй",
  //       description: "Ямар нэгэн алдаа гарлаа",
  //       variant: "destructive"
  //     })
  //   }
  // })

  // const handleDelete = (id:number)=>{
  //   mutation.mutate(id);
  // }

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


  //   Mongolian
  // 	Your job has been submitted for approval.
  // Our team will review your application shortly

  // Таны ажлыг батлуулахаар илгээсэн.
  // Манай баг таны өргөдлийг тун удахгүй хянан үзэх болно


  // console.log("by uer", token)
  return (
    <div>
      {
        myJobs?.map(({ attributes, id }) => (
          <div className='flex relative bg-white p-4 rounded-md flex-col-reverse sm:flex-row justify-between items-center mb-5 shadow'>
            <div className='w-full space-y-4'>
              <Link href={`/job/${id}`} className='text-lg font-medium'>{attributes?.title}</Link>
              {
                attributes.status === "хүлээгдэж байгаа" ? (
                  <p className='text-yellow-400'>Админы зөвшөөрлийг хүлээж байна</p>

                ) : attributes.status === "татгалзcaн" ? (
                  <p className='text-red-400'>Татгалзсан</p>
                ) : attributes.status === "батлагдсан" && (
                  <p className='text-green-500'>Баталгаажсан</p>
                )
              }
              <div className='flex gap-4'>
                <Button className='flex-[1] sm:flex-[0]' onClick={() => handleClick(id)}>
                  Засах
                </Button>
              </div>
            </div>
            <div className='flex gap-5'>
              <div className='flex flex-col items-center'>
                {/* <Menubar>
                  <MenubarMenu >
                    <MenubarTrigger asChild className='absolute top-2 right-2'>
                      <IconButton
                        aria-label="more"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleOpen}
                      >
                        <MoreHorizontal />
                      </IconButton>
                    </MenubarTrigger>
                    <MenubarContent className='right-0'>
                      <MenubarItem className='w-auto'>New Window</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem className='w-auto'>New Window</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar> */}
                <AppliedUsersModal job={attributes}/>
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

export default Jobs;
