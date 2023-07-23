
"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import JobsToInvite from './JobsToInvite';
import QueryString from 'qs';


function InviteTalentModal({ talentId }: { talentId?: number }) {

  const { token, user } = useUser()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [jobId, setJobId] = useState<number>()
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = () => {
    setJobId(undefined)
    setOpen(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const query = QueryString.stringify({
    fields: ["invitedJobs"],
    populate: {
      invitedJobs: {
        fields: ["id"]
      }
    }
  })

  const { data: talent,isLoading } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await myApi.get(`/api/users/${talentId}?${query}`);
      return res.data;
    }
  })

  console.log(talent)

  const inviteMutation = useMutation({
    mutationFn: async () => {
      const res = await myApi.put(`/api/users/${talentId}`,
        { invitedJobs: talent?.invitedJobs.length ? [...talent?.invitedJobs, jobId] : [jobId] },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        })
      return res.data;
    },
    onSuccess: () => {
      setJobId(undefined)
      queryClient.invalidateQueries(["user"])
      setOpen(false)
      toast({
        title: "Амжилттай урилаа",
        variant: "success",
      })
      queryClient.invalidateQueries(["jobs"])
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  const handleSubmit = () => {
    inviteMutation.mutate()
  }



  return (
    <div className='w-full'>
      <Button variant="secondary" className='w-full' onClick={() => setOpen(true)}>Ажилд урих</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Ажилд урих
        </DialogTitle>
        <DialogContent className='sm:w-[600px] relative'>
          <DialogContentText className='mb-5 flex'>
            Та урих ажилаа сонгон уу
          </DialogContentText>
          <JobsToInvite onChange={setJobId} jobId={jobId} />
        </DialogContent>
        <DialogActions className='p-4'>
          <CircularProgress size={25} hidden={!inviteMutation.isLoading} className='mr-5' />
          <Button variant="ghost" disabled={inviteMutation.isLoading} onClick={handleClose}>Болих</Button>
          <Button variant="secondary" disabled={inviteMutation.isLoading || Boolean(!jobId) || isLoading} onClick={handleSubmit}>Урих</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InviteTalentModal;
