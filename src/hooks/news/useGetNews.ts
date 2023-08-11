import { myApi } from "@/utils/axios";
import { createQuery } from "react-query-kit";

type Response = {
  data:ArticleResponseData[]
};

type Variables = {
  query?: string;
};

const useGetNews = createQuery<Response, Variables>({
  primaryKey: "/api/articles",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const res = await myApi.get(`${primaryKey}?${variables.query}`);
    return res.data;
  },
  // suspense: true,
});

export default useGetNews;
