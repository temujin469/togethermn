"use client"
import useGetMessages from '@/hooks/message/useGetMessages';
import { useUser } from '@/hooks/useUser';
import QueryString from 'qs';
import React from 'react';
import MessageListItem from '../MessageListItem';

function SendMessages() {
  const { user, token } = useUser()
  const query = QueryString.stringify(
    {
      filters: {
            user: user?.id,
      },
      populate: {
        user: {
          fields: ["username"],
        },
        recievedUser: {
          fields: ["username"],
        },
      },
      pagination: {
        pageSize: 100000,
      },
      sort: ["createdAt:desc"]
    },

    { encodeValuesOnly: true }
  );

  const { data } = useGetMessages({ variables: { query, token: token! } });

  const allMessages = data?.data;

  // console.log(allMessages)


  return (
    <div>
      {
        allMessages?.map(message => (
          <MessageListItem message={message} />
        ))
      }
    </div>
  );
}

export default SendMessages;
