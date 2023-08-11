import { myApi } from "@/utils/axios";
import { createQuery } from "react-query-kit";

type Response = ReviewsResponse;

type Variables = {
  query: string;
};

const useGetReviews = createQuery<Response, Variables>({
  primaryKey: "/api/reviews",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const res = await myApi.get(`${primaryKey}?${variables.query}`);
    return res.data;
  },
});

export default useGetReviews;
