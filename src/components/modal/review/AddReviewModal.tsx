import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import useGetBookedJobsTalent from '@/hooks/job/useGetBookedJobTalent';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import {  Rating } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

type Props = {
  talentId?: number
}

function AddReviewModal({ talentId }: Props) {
  const { user, token } = useUser()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false);
  const [rate, setRate] = React.useState<number | null>(null);
  const [description, setDescription] = React.useState<string | undefined>();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearState = ()=>{
    handleClose()
    setRate(null)
    setDescription(undefined)
  }


  const addMutation = useMutation({
    mutationFn: async (talentId: number) => {
      const res = await myApi.post(`/api/reviews`,
        { data: { description, rate, user: user?.id, recieved: talentId } },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        });
      return res.data;
    },
    onSuccess: () => {
      clearState()
      toast({
        description: "Амжилттай илгээгдлээ",
        variant: 'success'
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

  const handleAddReview = () => {
    if (talentId) {
      addMutation.mutate(talentId);
    }
  }

  return (
      <Modal
      open={open}
      onClose={handleClose}
      onSubmit={handleAddReview}
      title='Санал шүүмж үлдээх'
      closeBtnTitle='Буцах'
      submitBtnProps={{
        disabled:!description || !rate
      }}
      submitBtnTitle=' Болсон'
      isLoading={addMutation.isLoading}
      trigger={
          <Button variant="secondary" className='flex-[1] whitespace-nowrap' onClick={handleClickOpen}>
            Санал шүүмж үлдээх
          </Button>
      }
      >
        <>
          <div className='mb-3'>
            <p className='text-gray-600 mb-2'>Үнэлгээ</p>
            <Rating
              name="simple-controlled"
              value={rate}
              onChange={(event, newValue) => {
                setRate(newValue);
              }}
            />
          </div>
          <p className='text-gray-600 mb-2'>Санал шүүмж</p>
          <Textarea placeholder='Санал шүүмж...' value={description} onChange={(e) => setDescription(e.target.value)} />
        </>
      </Modal>
  );
}

export default AddReviewModal;
