"use client"
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ImagePlus } from 'lucide-react';
import QueryString from 'qs';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import UploadPhotos from '../UploadPhotos';
import { Skeleton } from '@/components/ui/skeleton';
import BlurImage from '@/components/ui/BlurImage';
import PhotoGallery from './components/PhotoGallery';

function Portfolio() {
  const md = useMediaQuery("(min-width:640px)");
  const user = useUser()
  const userId = user.user?.id

  const query = QueryString.stringify({
    fields: ["profile"],
    populate: {
      profile: {
        fields: ["photos"],
        populate: ["photos"]
      }
    }
  }, { encodeValuesOnly: true })


  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["myProfile", "portfolio", userId, user?.token],
    queryFn: async () => {
      const res = await myApi.get(`/api/users/me?${query}`, {
        headers: {
          Authorization: "Bearer " + user?.token
        }
      });
      return res.data;
    }
  });

  console.log(data);

  const profile = data?.profile;
  const isHavePhotos = Boolean(profile?.photos?.length);


  return !isLoading && profile ? (
    <div>
      {
        !isHavePhotos && <UploadPhotos profileId={profile?.id} />
      }
      <PhotoGallery photos={profile?.photos} profileId={profile.id} />
    </div>
  ) : (
    <Skeleton className='h-[200px]' />
  )
}

export default Portfolio;
