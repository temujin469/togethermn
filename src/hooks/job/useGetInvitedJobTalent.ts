import { myApi } from "@/utils/axios";
import QueryString from "qs";
import { createQuery } from "react-query-kit";

type Response = JobsResponse;

type Variables = {
  userId?: number;
  page?: number;
  token?: string;
};

const useGetInvitedJobTalent = createQuery<Response, Variables>({
  primaryKey: "/api/azhils",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const query = QueryString.stringify(
      {
        fields: ["title", "invitedUser", "invitedDate"],
        filters: {
          $and: [
            {
              invitedUser: {
                id: {
                  $gte: 1,
                },
              },
            },
            {
              user: variables.userId,
            },
          ],
        },
        populate: {
          invitedUser: {
            populate: {
              profile: {
                populate: ["profileImage"],
              },
            },
          },
        },
        pagination: {
          page: variables.page,
          pageSize: 5,
        },
        sort: ["createdAt:desc"],
      },
      { encodeValuesOnly: true }
    );


    const res = await myApi.get(`${primaryKey}?${query}`, {
      headers: {
        Authorization: "Bearer " + variables.token,
      },
    });
    return res.data;
  },
  // suspense: true,
});

export default useGetInvitedJobTalent;
