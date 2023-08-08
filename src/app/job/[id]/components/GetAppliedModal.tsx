import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useGetJobFullInfo from '@/hooks/job/useGetJobFullInfo';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

type Props = {
  jobId: number
}

function GetAppliedModal({ jobId }: Props) {

  const { user, token } = useUser()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const updateMutation = useMutation({
    mutationFn: async (id: number) => {

      if (user?.id) {

        const res = await myApi.put(`/api/users/${user?.id}`, { appliedJobs: id }, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        return res.data;

      }
    },
    onSuccess: () => {
      handleClose()
      toast({
        title: "Хүсэлт амжилттай",
        description: "Тухайн ажилд өргөдөл гарглаа",
        variant: 'success'
      })
      queryClient.invalidateQueries(useGetJobFullInfo.getKey())
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  const handleGetApplied = () => {
    updateMutation.mutate(jobId);
  }

  return (
    <Modal
      trigger={
        <Button size="lg" variant="secondary" onClick={handleClickOpen}>
          Өргөдөл гаргах
        </Button>
      }
      open={open}
      onClose={handleClose}
      onSubmit={handleGetApplied}
      title=' Өргөдөл гаргах'
      description='Та өргөдөл гаргаснаар тухайн ажилд орох хүсэлтэй байгаагаа мэдэгдэх боломжтой'
    />
  );
}

export default GetAppliedModal;
