import { myApi } from "@/utils/axios";
import QueryString from "qs";
import { createQuery } from "react-query-kit";

type Response = JobsResponse;

type Variables = {
  appliedUserId?: number;
  page?: number;
  token?: string;
};

const useGetAppliedJobs = createQuery<Response, Variables>({
  primaryKey: "/api/azhils",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const query = QueryString.stringify(
      {
        fields: ["title", "user"],
        filters: {
          // isClosed: {
          //   $eq: true,
          // },
          appliedUsers: variables.appliedUserId,
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

export default useGetAppliedJobs;
