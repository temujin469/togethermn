"use client"
import useGetMessagesConversation from '@/hooks/message/useGetMessageDetail';
import { useUser } from '@/hooks/useUser';
import React from 'react';
import SubHeader from '@/components/header/SubHeader';
import moment from 'moment';
import "moment/locale/mn"
import { Backdrop, CircularProgress } from '@mui/material';

type Props = {
  params: {
    roomId: number
  }
}

function MessageDetail({ params }: Props) {
  const messageId = params.roomId;
  const { token } = useUser()


  const { data } = useGetMessagesConversation({ variables: { token, messageId: messageId } })
  const messageBody = data?.data.attributes.body;

  // const title = `${data?.data?.attributes.user.data.attributes.username} - ${data?.data?.attributes.recievedUser.data.attributes.username}`

  return (
    <div className=''>
      <SubHeader backBtn backPath='/messages' left={
          <p>{data?.data.attributes.title}</p>
      }/>
      <div className='min-h-[calc(100vh-75px)] bg-gray-100 p-3 md:p-10'>
        {data?.data.attributes ? (
          <div className=' mx-auto'>
            <p className='text-[15px] text-gray-500 mb-5 text-center'>
              {moment(data?.data?.attributes.createdAt).format('LLL')}
            </p>
            <div className='shadow p-4 bg-white mx-auto w-fit md:p-16'>

              <div className=' prose prose-sm sm:prose-lg' dangerouslySetInnerHTML={{ __html: messageBody as string }} />
              {/* <div className='text-gray-600'>{conversation.body}</div> */}
            </div>
          </div>
        ) : (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open
            >
              <CircularProgress color="inherit" />
            </Backdrop>
        )}
      
      </div>
    </div>
  );
}

export default MessageDetail;
