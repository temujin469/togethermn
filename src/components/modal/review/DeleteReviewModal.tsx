import React, { useState } from 'react';
import Modal from '../Modal';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { myApi } from '@/utils/axios';
import { useUser } from '@/hooks/useUser';
import { useToast } from '@/components/ui/use-toast';
import useGetReviews from '@/hooks/review/useGetReviews';

function DeleteReviewModal({reviewId}:{reviewId:number}) {
  const [open, setOpen] = useState(false)
  const { token } = useUser()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn:async (reviewId:number)=>{
      const res = await myApi.delete(`/api/reviews/${reviewId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return res.data;
    },
    onSuccess: () => {
      setOpen(false)
      toast({
        description: "Амжилттай устгагдлаа",
        variant: 'success'
      })
      queryClient.invalidateQueries(useGetReviews.getKey())
    },
    onError: () => {
      toast({
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  const handleDelete = () => {
    if(reviewId){
      deleteMutation.mutate(reviewId)
    }
  }
  return (
    <Modal
      open={open}
      isLoading={deleteMutation.isLoading}
      onClose={() => setOpen(false)}
      onSubmit={handleDelete}
      trigger={
        <Button className='flex-[1] sm:flex-[0]' onClick={()=>setOpen(true)} >
          Устгах
        </Button>
      } title='Устгах'
      description='Та энэ сэтгэгдлийг  устгахдаа итгэлтэй байна уу?'
    />
  );
}

export default DeleteReviewModal;
