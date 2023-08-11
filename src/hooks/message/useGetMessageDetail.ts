import { myApi } from "@/utils/axios";
import QueryString from "qs";
import { createQuery } from "react-query-kit";

type Response = {
  data: MessageResponseData;
};

type Variables = {
  token?: string;
  messageId?: number;
};

const useGetMessagesConversation = createQuery<Response, Variables>({
  primaryKey: "/api/messages",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const config = {
      headers: {
        Authorization: "Bearer " + variables.token,
      },
    };

    const query = QueryString.stringify(
      {
        //  filters: {
        //   //  $or: [
        //   //    {
        //   //      user: user?.id,
        //   //    },
        //   //    {
        //   //      recievedUser: user?.id,
        //   //    },
        //   //  ],
        //  },
        populate: {
          user: {
            fields: ["username"],
          },
          recievedUser: {
            fields: ["username"],
          },
        },
      },

      { encodeValuesOnly: true }
    );
    const res = await myApi.get(
      `${primaryKey}/${variables.messageId}?${query}`,
      config
    );
    return res.data;
  },
});

export default useGetMessagesConversation;
