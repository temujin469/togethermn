import { myApi } from "@/utils/axios";

import { createQuery } from "react-query-kit";

type Response = {
  data: MessageResponseData[];
};

type Variables = {
  token: string;
  query: string;
};

const useGetMessages = createQuery<Response, Variables>({
  primaryKey: "/api/messages",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const config = {
      headers: {
        Authorization: "Bearer " + variables.token,
      },
    };

    const res = await myApi.get(
      `${primaryKey}?${variables.query}`,
      config
    );
    return res.data;
  },
});

export default useGetMessages;
