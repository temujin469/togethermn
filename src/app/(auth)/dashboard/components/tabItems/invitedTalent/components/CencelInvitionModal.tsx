import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import useGetInvitedJobTalent from '@/hooks/job/useGetInvitedJobTalent';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import QueryString from 'qs';
import React, { useState } from 'react';

function CencelInvitionModal({talentId,jobId}:{talentId:number,jobId:number}) {

  const {token} = useUser()
  const queryClient = useQueryClient()

  const [open,setOpen] = useState(false)


  // used for mutation //
  const populateQuery = QueryString.stringify({
    fields: ["invitedJobs"],
    populate: {
      invitedJobs: {
        fields: ["id"]
      },
      appliedJobs: {
        fields: ["id"]
      },
    }
  }, { encodeValuesOnly: true })


  const cencelMutation = useMutation({
    mutationFn: async () => {
        const populatedUserRes = await myApi.get<User>(`/api/users/${talentId}?${populateQuery}`);

        const invitedJobIds: number[] = populatedUserRes.data.invitedJobs.map(job => job.id);
        const updatedInvitedJobIds: number[] | undefined = invitedJobIds.filter(id => id !== jobId);


        const res = await myApi.put(`/api/users/${talentId}`, { invitedJobs: updatedInvitedJobIds }, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        return res.data;
    },
    onSuccess: () => {
      toast({
        description: "Ажлын саналаас татгалзлаа",
      })
      queryClient.invalidateQueries(useGetInvitedJobTalent.getKey())
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

 

  const handleCencelInviton = () => {
    if (jobId && talentId) {
      cencelMutation.mutate();
    }
  }

  return (
      <Modal
      isLoading={cencelMutation.isLoading}
      trigger={
        <Button onClick={()=>setOpen(true)}>Буцаах</Button>
      }
      open={open}
      onClose={()=>setOpen(false)}
      onSubmit={handleCencelInviton}
      title='Урилга буцаах'
      description='Та ажлын урилгаа буцаахдаа итгэлтэй байна уу?'
      />
  );
}

export default CencelInvitionModal;
