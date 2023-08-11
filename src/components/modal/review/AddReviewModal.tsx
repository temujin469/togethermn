import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import useGetBookedJobsTalent from '@/hooks/job/useGetBookedJobTalent';
import useGetReviews from '@/hooks/review/useGetReviews';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { Rating } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import QueryString from 'qs';
import React, { useState } from 'react';

type Props = {
  talentId?: number
  jobId?: number
  profileId:number
}

function AddReviewModal({ talentId, jobId, profileId }: Props) {
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

  const clearState = () => {
    handleClose()
    setRate(null)
    setDescription(undefined)
  }

  const query = QueryString.stringify({
    fields: ["job"],
    filters: {
      recieved: talentId,
      job:jobId
    },
    populate: {
      job: {
        fields: ["id"]
      }
    },
    pagination: {
      pageSize: 100000
    }
  }, { encodeValuesOnly: true });


 // check if i gave 
  const reviewsRes = useGetReviews({ variables: { query } });
  const isIGaveReview = Boolean(reviewsRes.data?.data[0]);

  const addMutation = useMutation({
    mutationFn: async ({ talentId, jobId, profileId }: { talentId: number, jobId: number, profileId:number }) => {

      const populateQuery = QueryString.stringify(
        {
          fields: ["reviews"],
          populate: {
            reviews: {
              fields: ["rate"],
            },
          },
        },
        { encodeValuesOnly: true }
      );

      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      }

      const populatedTalent = await myApi.get<UserResponse>(`/api/users/${talentId}?${populateQuery}`);

      const rates = populatedTalent?.data?.reviews?.map(review => review.rate)

      const sumOfRate = rates?.reduce((avg, num) => (avg + num), 0)

      const calcRate = rates?.length ? Math.round((sumOfRate! + rate!) / (rates?.length + 1)) : rate

      await myApi.put(`/api/users/${talentId}`, { rate: calcRate },config);
      await myApi.put(`/api/talents/${profileId}`, { data: { rate: calcRate } },config);

      const res = await myApi.post(`/api/reviews`,
        { data: { description, rate, user: user?.id, recieved: talentId, job: jobId } },config);
      return res.data;
    },
    onSuccess: () => {
      clearState()
      toast({
        description: "Амжилттай илгээгдлээ",
        variant: 'success'
      })
      queryClient.invalidateQueries(useGetBookedJobsTalent.getKey())
      queryClient.invalidateQueries(useGetReviews.getKey())
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
    if (talentId && rate && description && jobId && profileId) {
      addMutation.mutate({ talentId, jobId,profileId });
    }
  }

  let trigger = !reviewsRes.isLoading ? (
    !isIGaveReview ? (
      <Button variant="secondary" className='flex-[1] whitespace-nowrap' onClick={handleClickOpen}>
        Санал шүүмж үлдээх
      </Button>) : (
      <Button className='flex-[1] whitespace-nowrap' disabled>
        Санал шүүмж үлдээх
      </Button>
    )
  ) : null;
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      onSubmit={handleAddReview}
      title='Санал шүүмж үлдээх'
      closeBtnTitle='Буцах'
      submitBtnProps={{
        disabled: !description || !rate
      }}
      submitBtnTitle=' Болсон'
      isLoading={addMutation.isLoading}
      trigger={trigger}
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
