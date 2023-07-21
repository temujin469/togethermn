"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AppBar, Avatar, AvatarGroup, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, Toolbar, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import AppliedTalentItem from './AppliedTalentItem';


function AppliedUsersModal({ job }: { job: Job }) {

  console.log(job);

  // const { token, user } = useUser()
  // const { toast } = useToast()
  // const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>(false)

  // // const [talentId, setTalentId] = useState<number | undefined>()

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // const query = QueryString.stringify({
  //   fields: ["invitedJobs"],
  //   populate: {
  //     invitedJobs: {
  //       fields: ["id"]
  //     }
  //   }
  // })

  // const { data: talent, isLoading } = useQuery<User>({
  //   queryKey: ["user"],
  //   queryFn: async () => {
  //     const res = await myApi.get(`/users/${talentId}?${query}`);
  //     return res.data;
  //   }
  // })

  // console.log(talent)

  // const inviteMutation = useMutation({
  //   mutationFn: async () => {
  //     const res = await myApi.put(`/users/${talentId}`,
  //       { invitedJobs: talent?.invitedJobs.length ? [...talent?.invitedJobs, job.id] : [job.id] },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token
  //         }
  //       })
  //     return res.data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["user"])
  //     setOpen(false)
  //     toast({
  //       title: "Амжилттай урилаа",
  //       variant: "success",
  //     })
  //     queryClient.invalidateQueries(["jobs"])
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Хүсэлт амжилтгүй",
  //       description: "Ямар нэгэн алдаа гарлаа",
  //       variant: "destructive",
  //     })
  //   }
  // })

  // const handleSubmit = () => {
  //   inviteMutation.mutate()
  // }


  return (
    <div className='w-full'>
      <Tooltip title="Хүсэлт илгээсэн мэргэжилтнүүд" placement="bottom">
        <AvatarGroup max={3} onClick={() => setOpen(true)}>
          {
            job.appliedUsers?.data.map(talent => (
              <Avatar key={talent.id} alt={talent.attributes.username} src={talent.attributes.profile.data.attributes.profileImage?.data.attributes.formats.thumbnail.url} />
            ))
          }
        </AvatarGroup>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <AppBar sx={{ position: 'relative' }} color="default">
          <Toolbar>
            <p className='text-md'>Хүсэлт илгээсэн мэргэжилтнүүд</p>
          </Toolbar>
        </AppBar>
        <DialogContent className='relative p-4 md:p-6'>
          <DialogContentText className='mb-5 flex'>
            та доорх мэргэжилтнүүдээс нэгийг сонгож тухайн ажилд урих боломжтой
          </DialogContentText>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
            {
              job.appliedUsers?.data.map((talent) => (
                <AppliedTalentItem profileId={talent.attributes.profile.data.id} username={talent.attributes.username} talentProfile={talent.attributes.profile.data.attributes} />
              ))
            }
          </div>
        </DialogContent>
        <DialogActions className='p-4'>
          {/* <CircularProgress size={25} hidden={!inviteMutation.isLoading} className='mr-5' />
          <Button variant="ghost" disabled={inviteMutation.isLoading} onClick={handleClose}>Болих</Button>
          <Button variant="secondary" disabled={inviteMutation.isLoading || Boolean(!talentId) || isLoading} onClick={handleSubmit}>Урих</Button> */}

          <Button onClick={handleClose}>Буцах</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AppliedUsersModal;
