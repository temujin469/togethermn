import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { CircularProgress } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImagePlus } from 'lucide-react';
import React, { useRef, useState } from 'react';

function UploadPhotos({ profileId }: { profileId?: number }) {
  const { token } = useUser()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [photos, setPhotos] = useState<FileList>()


  const updateMutation = useMutation({
    mutationFn: async () => {

      // get old photos
      const oldPhotosRes = await myApi.get(`/api/talents/${profileId}?populate=photos&fields[0]=id`)
      const oldPhotos: any[] = oldPhotosRes.data?.data?.attributes?.photos.data;

      // // first upload new photo
      const formData = new FormData();
      Array.from(photos as Iterable<File> | ArrayLike<File>)?.forEach((photo) => formData.append("files", photo, photo.name));

      const uploadRes = await myApi.post<any[]>("/api/upload", formData, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      const uploadedPhotos = uploadRes.data
      // console.log("iplouded",uploadedPhoto)

      // then update profile photos
      const res = await myApi.put<any[]>(`/api/talents/${profileId}`,
        { data: { photos: Boolean(oldPhotos?.length) ?  [...oldPhotos, ...uploadedPhotos] : uploadedPhotos} }, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Хүсэлт амжилттай",
        variant: "success",
      });

      queryClient.invalidateQueries(["myProfile"]);
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  // console.log(updateMutation.data)


  const handleUpdate = () => {
    updateMutation.mutate()
  }

  const ref = useRef<HTMLInputElement>(null);
  // const [fileUrl, setFileUrl] = useState<string>()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const fileUrl = URL.createObjectURL(e.target.files![0]);
    const files = e.target.files
    // setFileUrl(fileUrl);
    setPhotos(files as any)
    console.log("selected photo: ", files)
    handleUpdate()
  };
  return (
    <div className='h-[250px]'>
      <div onClick={() => ref.current?.click()} className='w-full rounded-md bg-gray-100 cursor-pointer h-full border-2 border-dashed flex items-center justify-center'>
        {
          updateMutation.isLoading ? (
            <div className='absolute w-full flex justify-center items-center h-full'>
              <CircularProgress />
            </div>
          ) : (<ImagePlus size={50} className='text-gray-300' />)
        }

        <input
          type="file"
          ref={ref}
          multiple
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default UploadPhotos;
