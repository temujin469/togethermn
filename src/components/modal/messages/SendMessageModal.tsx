import React, { useState } from 'react';
import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useGetMessages from '@/hooks/message/useGetMessages';
import { useUser } from '@/hooks/useUser';
import useGetAllUsers from '@/hooks/user/getAllUsers';
import { myApi } from '@/utils/axios';
import { Autocomplete, TextField, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Mail } from 'lucide-react';
import QueryString from 'qs';
import ReactQuill from 'react-quill';

// type Props = {
//   recieveUserId?: number
// }

function SendMessageModal() {
  const { user, token } = useUser()
  const userId = user?.id;
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false);
  const [bodyText, setBodyText] = useState<string>('');
  const [recieveUser, setRecieveUser] = useState<Partial<User> | null>(null);

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearState = () => {
    handleClose()
    setBodyText('')
  }

  const query = QueryString.stringify({
    fields: ["profileType", "username", "bookedJobs", "invitedJobs", "appliedJobs"],
    // filters: {
    //   $or:[
    //     {
    //       bookedJobs: {
    //         user: user?.id
    //       }
    //     },
    //     {
    //       bookedJobs: {
    //         bookedBy: user?.id
    //       }
    //     }
    //   ]
    //   // bookedJobs: {
    //   //   user: user?.id
    //   // }
    // },
    populate: {
      bookedJobs: {
        fields: ["user", "bookedBy"],
        populate: {
          user: {
            fields: ["id", "username"]
          },
          bookedBy: {
            fields: ["id"]
          }
        }
      },
      invitedJobs: {
        fields: ["user"],
        populate: {
          user: {
            fields: ["id"]
          }
        }
      },
      appliedJobs: {
        fields: ["user"],
        populate: {
          user: {
            fields: ["id"]
          }
        }
      },
    },
  }, { encodeValuesOnly: true });


  const usersRes = useGetAllUsers({ variables: { query } });


  type AutocompleteOption = {
    label: string
    userData: Partial<User>
  }

  let userOptions: AutocompleteOption[] | undefined;


  // remove myself from options
  userOptions
    = usersRes.data?.filter(userData => userData.id !== userId).map(userData => ({
      label: userData.username!,
      userData: userData as any
    }))

  // if(user?.profileType === "talent"){
  //    userOptions
  //     = usersRes.data?.map(userData => ({
  //       label: userData.bookedJobs.find(job => job.bookedBy.id === user?.id)?.user.username!,
  //       id: userData.bookedJobs.find(job => job.bookedBy.id === user?.id)?.user.id!,
  //     }))
  // }else if (user?.profileType === "employer") {
  //   userOptions
  //     = usersRes.data?.map(userData => ({
  //       label: userData.username!,
  //       id: userData.id
  //     }))
  // }


  // console.log(usersRes)

  const sendMutation = useMutation({
    mutationFn: async ({ recieveUserId, userId, title }: { recieveUserId: number, userId: number, title: string }) => {

      const config = {
        headers: {
          Authorization: "Bearer " + token
        },
      }

      const res = await myApi.post(`/api/messages`,
        { data: { user: userId, recievedUser: recieveUserId, body: bodyText, title, key: [userId, recieveUserId] } }, config);
      return res.data;
    },
    onSuccess: () => {
      clearState()
      toast({
        description: "Амжилттай илгээгдлээ",
        variant: 'success'
      })
      queryClient.invalidateQueries(useGetMessages.getKey())
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  const handleSendMessage = () => {
    if (recieveUser && user?.id && bodyText) {
      const recieveUserId = recieveUser.id as number
      const title = `${user.username} - ${recieveUser.username}`
      sendMutation.mutate({ recieveUserId, userId: user?.id, title });
    }
  }

  let trigger = (
    <Tooltip title="Зурвас илгээх">
      <Button size="sm" variant="ghost" className='flex-[1] whitespace-nowrap' onClick={handleClickOpen}>
        <div className=' pr-1'>
          <Mail size={18} className='text-gray-700' />
        </div>
        Зурвас илгээх
      </Button>
    </Tooltip>
  )

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'align': [] }],
      ['clean'],
    ],
  }

  // const formats = [
  //   'header',
  //   'bold', 'italic', 'underline', 'strike', 'blockquote',
  //   'list', 'bullet', 'indent',
  //   'link', 'image'
  // ]




  return (
    <Modal
      open={open}
      onClose={handleClose}
      onSubmit={handleSendMessage}
      title='Шинэ зурвас'
      fullScreen={isMobile}
      closeBtnTitle='Болих'
      submitBtnProps={{
        disabled: !bodyText
      }}
      submitBtnTitle='Илгээх'
      isLoading={sendMutation.isLoading}
      trigger={trigger}
    >
      <div className='mb-10 w-full'>
        <Autocomplete
          noOptionsText="хэрэглэгч алга"
          disablePortal
          id="combo-box-demo"
          loading={usersRes.isLoading}
          options={userOptions!}
          onChange={(e, option) => setRecieveUser(option?.userData!)}
          renderInput={(params) => <TextField {...params} label="Хэнд" sx={{ borderBottom: "none" }} variant="standard" />}
        />
      </div>
      <div className='min-h-[500px]'>
        <ReactQuill
         placeholder='Захидал...' 
         value={bodyText}
        theme="snow" 
        modules={modules}
        // formats={formats}
         onChange={(val) => setBodyText(val)} 
        />
      </div>
    </Modal>
  );
}

export default SendMessageModal;
