"use client"
import { Button } from '@/components/ui/button';

import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { FileImage } from "lucide-react";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material';


const FileInput = ({ file, onChange }: any) => {
  const ref = useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = useState<string>()



  const handleClick = () => {
    ref.current?.click();
  };

  // 3. convert FileList to File[]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileUrl = URL.createObjectURL(e.target.files![0]);
    const file = e.target.files![0];
    setFileUrl(fileUrl);
    onChange(file)
    console.log("selected photo: ", file)
  };
  return (
    <div className='sm:w-[300px] w-full'>
      <div
        onClick={handleClick}
        className="p-4 flex py-10 flex-col items-center gap-2 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100 cursor-pointer"
      >
        <FileImage />
        <span>Зураг сонгох</span>
        <input
          type="file"
          ref={ref}
          className="hidden"
          onChange={handleChange}
        />
      </div>
      {/* 6. display selected files */}
      {fileUrl && (
        <div className="p-4 mt-4 rounded-md bg-blue-50 overflow-hidden text-ellipsis">
          <img src={fileUrl} />
        </div>
      )}
    </div>
  );
};


function EditProfileImage({ profileId, imageId }: { profileId?: number, imageId?: number }) {
  const { token } = useUser()
  const formData = new FormData();
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [photo, setPhoto] = useState<File>()

  const [open, setOpen] = useState(false)


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const updateMutation = useMutation({
    mutationFn: async () => {

      // first delete old photo
      if (imageId) {
        await myApi.delete(`/api/upload/files/${imageId}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
      }

      // second upload new photo
      formData.append("files", photo as Blob);
      const uploadRes = await myApi.post<any[]>("/api/upload", formData, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      const uploadedPhoto = uploadRes.data[0];
      // console.log("iplouded",uploadedPhoto)

      // then update profile image
      const res = await myApi.put<any[]>(`/api/talents/${profileId}`, { data: { profileImage: uploadedPhoto } }, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      return res.data;
    },
    onSuccess: () => {
      setOpen(false)
      toast({
        title: "Хүсэлт амжилттай",
        description: "Таны мэдээлэл амжилттай шинэчлэгдлээ",
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    !updateMutation.isLoading &&  setOpen(false);
  };



  const handleUpdate = () => {
    updateMutation.mutate()
  }
  return (
    <div className='w-full'>
      <Toggle className='absolute top-2 right-2' onClick={handleClickOpen}>
        <Edit size={18} className=' text-white' />
      </Toggle>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Ерөнхий мэдээлэл
        </DialogTitle>
        <DialogContent>
          <FileInput onChange={setPhoto} files={photo} />
        </DialogContent>
        <DialogActions className='p-4'>
          <Button disabled={updateMutation.isLoading} type="submit" variant="ghost" onClick={handleClose}>Болих</Button>
          <Button disabled={updateMutation.isLoading} variant="secondary" onClick={handleUpdate}>Хадгалах</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfileImage;
