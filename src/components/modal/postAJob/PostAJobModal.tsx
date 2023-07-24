"use client"
import Image from 'next/image';
import getProfessions from '@/utils/fetch/getProfessions';
import SelectProfession from './SelectProfession';
import { Dialog, DialogContent, useMediaQuery, useTheme } from '@mui/material';
import usePostAJobModal from '@/hooks/usePostAJobModal';
import { useQuery } from '@tanstack/react-query';

function PostAJobModal() {
  const {data:professions} = useQuery({queryKey:["professions"],queryFn:getProfessions})

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { open, onClose, onOpen } = usePostAJobModal()


  const handleClose = () => {
    onClose()
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="lg"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className='relative'>
        <div className='md:grid grid-cols-2 h-full w-full'>
          <div className='col-span-1 hidden md:block m-10  relative'>
            <Image
              fill
              src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="model" className='object-cover rounded-md' />
          </div>
          <div className='md:p-10  flex justify-center'>
              <SelectProfession professions={professions} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostAJobModal;
