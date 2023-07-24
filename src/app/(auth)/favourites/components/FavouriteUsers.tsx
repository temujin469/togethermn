"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { Pagination, Rating } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HeartOff, Scroll } from 'lucide-react';
import Link from 'next/link';
import QueryString from 'qs';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';

const TalentCard = ({ profile, id, username, onRemove }: { profile?: Profile, id: number, username: string, onRemove:()=>void }) => (
  
  <Link href={`/talent/${id}`}>
    <div className='w-full bg-white max-w-[360px] rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer'>
      <div className='h-[170px] md:h-[220px] lg:h-[200px] xl:h-[240px] w-full relative'>
        <img
          src={Boolean(profile?.profileImage?.data) ? profile?.profileImage?.data?.attributes.url : "/images/no-user.jpg"}
          alt={username}
          className="h-full w-full object-cover"
        />
        <Toggle className='absolute top-2 right-2 group z-10' onClick={onRemove}>
          <HeartOff size={18} strokeWidth={3} className='text-white group-hover:text-red-500' />
        </Toggle>
      </div>
      <div className='p-4 lg:p-5'>
        <h4 className='text-lg font-semibold'>{username}</h4>
        <Rating value={4} readOnly />
        <div className='flex gap-1 items-center text-gray-500'><p>{profile?.location}</p></div>
        <div className='flex gap-1 items-center text-gray-700'><p>{profile?.professions?.slice(0,2).join(", ")}</p></div>
        <div className='flex gap-1 items-center text-gray-700'><p><NumericFormat thousandSeparator value={profile?.instagramFollowers} /></p></div>
      </div>
    </div>
  </Link>
)

function FavouriteUsers() {
  const { token, user } = useUser();
  const [page, setPage] = useState(1);
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const query = QueryString.stringify({
    // fields: ["id"],
    filters: {
      user: user?.id
    },
    populate: {
      favourite: {
        populate: {
          profile: {
            populate: {
              profileImage: true
            }
          }
        }
      }
    }

  }, { encodeValuesOnly: true });

  const paginationQuery = QueryString.stringify({
    pagination: {
      page: page,
      pageSize: 8
    }
  }, { encodeValuesOnly: true })


  useEffect(() => {
    setPage(1);
  }, [query])

  const { data, isError, isLoading } = useQuery<Favourites>({
    queryKey: ["myFavourites", query, paginationQuery, token],
    queryFn: async () => {
      const res = await myApi.get(`/api/favourites?${query}&${paginationQuery}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      return res.data;
    }
  });




  const myFavourites = data?.data;
  const pagination = data?.meta.pagination;

  // console.log(myFavourites)

  const favouriteMutation = useMutation({
    mutationFn: async (id:number) => {
        const res = await myApi.delete(`/api/favourites/${id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        return res.data;
      
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["me"])
      queryClient.invalidateQueries(["profile"])
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  const handleFavourite = (favId:number) => {
    favouriteMutation.mutate(favId);
  }

  if (isLoading && !Boolean(myFavourites?.length)) return (
    <div>
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
      <Skeleton className='h-[222px] sm:h-[112px] w-full mb-4' />
    </div>
  )

  if (!isLoading && !Boolean(myFavourites?.length)) return (
    <div className='flex select-none text-gray-300 flex-col items-center justify-center'>
      <Scroll size={80} />
      <p className='font-medium'>Хоосон байна</p>
    </div>
  )

  return (
    <div className='shadow p-5 bg-white'>
      <div className='grid sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
        {
          myFavourites?.map((favourite) => (
            <TalentCard onRemove={()=>handleFavourite(favourite.id)} profile={favourite.attributes.favourite.data.attributes.profile?.data.attributes} id={favourite.attributes.favourite.data.attributes.profile?.data.id} username={favourite.attributes.favourite.data.attributes.username} />
          ))
        }
      </div>
      <div>
        <div className='flex justify-center py-10'>
          <Pagination count={pagination?.pageCount} onChange={(e, val) => {
            setPage(val)
            window.scrollTo({ top: 0, behavior: "smooth" })
          }} page={page} variant="outlined" shape="rounded" size="medium" />
        </div>
      </div>
    </div>

  );
}

export default FavouriteUsers;
