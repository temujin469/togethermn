"use client"
import { H4 } from '@/components/ui/Typography/Heading';
import { Button } from '@/components/ui/button';
import Show from '@/components/ui/show';
import { Skeleton } from '@/components/ui/skeleton';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { BadgeCheck, Instagram, MapPin, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import QueryString from 'qs';
import React from 'react';
import useRegisterModal from '@/hooks/useRegisterModal';
import InviteTalentModal from './InviteTalentModal';


function LeftContent({ profileId }: { profileId: number }) {

  const { token, user, isAuth } = useUser()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const registerModal = useRegisterModal()

  const query = QueryString.stringify({
    populate: {
      profileImage: true,
      user: {
        fields: ["username", "firstname", "lastname"]
      }
    }
  }, {
    encodeValuesOnly: true
  })
  const { data, isLoading: profileIsLoading, isError } = useQuery<ProfileDetailResponse>({
    queryKey: ["profile", profileId],
    queryFn: async () => {
      const res = await myApi.get(`/api/talents/${profileId}?${query}`);
      return res.data;
    }
  });

  const profile = data?.data.attributes;


  const meQuery = QueryString.stringify({
    fields: ["favourites", "id"],
    populate: {
      favourites: {
        fields: ["favourite"],
        populate: {
          favourite: {
            fields: ["id"]
          }
        }
      }
    },
  }, { encodeValuesOnly: true });

  const me = useQuery<User>({
    queryKey: ["me", token],
    queryFn: async () => {
      const res = await myApi.get(`/api/users/me?${meQuery}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      return res.data;
    }
  });

  const isMyProfile: boolean = profile?.user.data.id === me.data?.id

  const myFavourites = me?.data?.favourites;

  const isExist = myFavourites?.find((my: any) => my?.favourite.id === profile?.user.data.id)

  const favouriteMutation = useMutation({
    mutationFn: async () => {
      
        if (Boolean(isExist)) {
          const res = await myApi.delete(`/api/favourites/${isExist?.id}`, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          return res.data;
        } else {
          const res = await myApi.post(`/api/favourites`, {
            data: {
              user: user?.id,
              favourite: profile?.user.data.id
            }
          }, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          return res.data;
        }
      
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["me"])
      queryClient.invalidateQueries(["profile"])
      queryClient.invalidateQueries(["favouritesCount"])
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  const handleFavourite = () => {
    if (myFavourites && profile?.user && user?.id) {
      favouriteMutation.mutate();
    }
  }

  return (
    <div>
      <div className='sm:shadow sm:rounded-md bg-white'>
        <div className='w-full h-[300px] relative'>
          {/* <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${profile?.profileImage?.data.attributes.url}`} fill alt='profile' className='object-cover rounded-t-lg' /> */}
          <img
            src={profile?.profileImage?.data ? profile?.profileImage?.data?.attributes.url : "/images/no-user.jpg"} alt='profile'
            className='object-cover sm:rounded-t-lg h-[300px] w-full' />
          {

            !isMyProfile && (
              Boolean(isExist) ? <Toggle className='absolute top-2 right-2' onClick={handleFavourite}>
                <Heart size={18} strokeWidth={3} className=' text-red-500' />
              </Toggle> : <Toggle className='absolute top-2 right-2' onClick={handleFavourite}>
                <Heart size={18} className=' text-white' />
              </Toggle>
            )

          }

        </div>
        {
          !profileIsLoading ? (
            <div className='p-4 capitalize'>
              <H4 >{profile?.user.data.attributes.username}</H4>
              <H4 className='mb-4 '>{profile?.firstname} {profile?.lastname}</H4>
              <div className='space-y-1'>
                <Show isShow>
                  <div className='flex text-sm items-center font-medium gap-1'><BadgeCheck size={13} color='green' />Баталгаажсан</div>
                </Show>
                <Show isShow>
                  <div className='flex text-sm items-center font-medium gap-1'><MapPin size={13} />{profile?.location}</div>
                </Show>
                <Show isShow>
                  <div className='flex text-sm font-medium gap-1'><UserCircle2 size={13} />{profile?.professions.join(", ")}</div>
                </Show>
                <Show isShow>
                  <div className='flex text-sm items-center font-medium gap-1'><Instagram size={13} />Идэвхтэй</div>
                </Show>
              </div>
            </div>
          ) : (
            <div className='h-[196px] p-4'>
              <Skeleton className='w-full h-full' />
            </div>
          )
        }


        <div className='border-t p-4 flex justify-center'>
          {
            // check if is Auth
            isAuth ? (
              me.isLoading || profileIsLoading ? (
                <Skeleton className='h-[40px] w-full' />
              ) : (
                // check if is my profile
                isMyProfile ? (
                  <Link href="/profile" className='w-full' >
                    <Button variant="secondary" className='w-full'>Миний профайл</Button>
                  </Link>
                ) : (
                  <InviteTalentModal talentId={profile?.user.data.id} />
                )

              )
            ) : (
              <Button variant="secondary" className='w-full'onClick={registerModal.onOpen}>Ажилд урих</Button>
            )
          }
        </div>
      </div>
      {/* <div className='bg-gray-100 sm:rounded-lg p-4'>
        <ul>
          <li className='font-medium mb-2'>Yeimy Lorena C Rates</li>
          <li className='font-medium mb-2'>Hair & Makeup Artist</li>
          <li className='font-medium mb-2'>$100 per hour</li>
          <li className='font-medium mb-2'>$700 per day</li>
          <Separator />
          <li className='font-medium mb-2'>Hair & Makeup Artist</li>
          <li className='font-medium mb-2'>$100 per hour</li>
          <li className='font-medium mb-2'>$700 per day</li>
          <Separator />
          <li className='font-medium mb-2'>Hair & Makeup Artist</li>
          <li className='font-medium mb-2'>$100 per hour</li>
          <li className='font-medium mb-2'>$700 per day</li>
        </ul>
      </div> */}
    </div>
  );
}

export default LeftContent;
