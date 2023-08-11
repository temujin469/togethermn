"use client"
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import {  Trash2 } from 'lucide-react';
import { Divider, Tooltip } from '@mui/material';
import Link from 'next/link';
import moment from 'moment';
import "moment/locale/mn"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { myApi } from '@/utils/axios';
import { useUser } from '@/hooks/useUser';
import { useToast } from '@/components/ui/use-toast';
import useGetMessages from '@/hooks/message/useGetMessages';

type Props = {
  message?: MessageResponseData
  // handleToggle: (value: number) => void
  // checked: number[]
}

function MessageListItem({ message }: Props) {
  const labelId = `checkbox-list-label-${message?.id}`;
  const {token,user} = useUser()
  const userId = user?.id;
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // const title = `${message?.attributes.user.data.attributes.username} - ${message?.attributes.recievedUser.data.attributes.username}`
  console.log(message)

  const deleteMutation = useMutation({
    mutationFn:async()=>{

      let data;

      if (message?.attributes.user.data && message?.attributes.recievedUser.data ){
        if ( message?.attributes.user.data.id === userId) {
          const res = await myApi.put(`/api/messages/${message?.id}`, { data: { user: null } }, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          data =  res.data;
        } else if ( message?.attributes.recievedUser.data.id === userId) {
          const res = await myApi.put(`/api/messages/${message?.id}`, { data: { recievedUser: null } }, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          data = res.data;
        }

      } else {
        const res = await myApi.delete(`/api/messages/${message?.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        data = res.data;
      }

      return data;

    },
    onSuccess:()=>{
      toast({
        description: "Амжилттай устгагдлаа",
      })
      queryClient.invalidateQueries(useGetMessages.getKey())
    }
  })

  const handleDeleteMessage = ()=>{
    if(message?.id){
      deleteMutation.mutate()
    }
  }

  return (
    <div>
      <ListItem
        secondaryAction={
          <div className='flex items-center'>
            <Tooltip title="Устгах">
              <IconButton edge="start" onClick={handleDeleteMessage}>
                <Trash2 size={17} />
              </IconButton>
            </Tooltip>
            <span className='text-[12px] sm:text-sm text-gray-500 pl-3'>
              {moment(message?.attributes.createdAt).calendar()}
            </span>
          </div>
        }
        disablePadding

      >

        <ListItemButton role={undefined} className='w-full' dense sx={{
          paddingY: 2
        }}>
          {/* <ListItemIcon onClick={() => handleToggle(messageRoomId)}>
            <Checkbox
              edge="start"
              checked={checked.indexOf(messageRoomId) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon> */}
          <Link href={`/messages/${message?.id}`}>

            <ListItemText id={labelId} >
              {message?.attributes.title}
            </ListItemText>
          </Link >

        </ListItemButton>

        {/* <ListItemText primary={title} /> */}

      </ListItem>
      <Divider />
    </div>
  );
}

export default MessageListItem;
