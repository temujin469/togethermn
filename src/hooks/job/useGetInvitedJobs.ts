import { myApi } from "@/utils/axios";
import QueryString from "qs";
import { createQuery } from "react-query-kit";



type Response = JobsResponse

type Variables = {
  ivitedUserId?: number;
  page?: number;
  token?: string;
};

const useGetInvitedJobs = createQuery<Response, Variables>({
  primaryKey: "/api/azhils",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const query = QueryString.stringify(
      {
        fields: ["title", "user"],
        filters: {
          // isClosed: {
          //   $eq: true,
          // },
          invitedUser: variables.ivitedUserId,
        },
        populate: {
          user: {
            populate: {
              profile: {
                populate: ["profileImage"],
              },
            },
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const paginationQuery = QueryString.stringify(
      {
        pagination: {
          page: variables.page,
          pageSize: 5,
        },
      },
      { encodeValuesOnly: true }
    );

    const res = await myApi.get(`${primaryKey}?${query}&${paginationQuery}`, {
      headers: {
        Authorization: "Bearer " + variables.token,
      },
    });
    return res.data;
  },
  // suspense: true,
});

export default useGetInvitedJobs;
