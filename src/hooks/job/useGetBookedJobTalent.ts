import { myApi } from "@/utils/axios";
import QueryString from "qs";
import { createQuery } from "react-query-kit";

type Response = JobsResponse;

type Variables = {
  page?: number;
  token?: string;
  query:string
};

const useGetBookedJobsTalent = createQuery<Response, Variables>({
  primaryKey: "/api/azhils",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
 

    const paginationQuery = QueryString.stringify(
      {
        pagination: {
          page: variables.page,
          pageSize: 5,
        },
      },
      { encodeValuesOnly: true }
    );

    const res = await myApi.get(`${primaryKey}?${variables.query}&${paginationQuery}`, {
      headers: {
        Authorization: "Bearer " + variables.token,
      },
    });
    return res.data;
  },
  // suspense: true,
});

export default useGetBookedJobsTalent;
