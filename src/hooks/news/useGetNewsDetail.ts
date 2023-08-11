import { myApi } from "@/utils/axios";
import QueryString from "qs";
import { createQuery } from "react-query-kit";

type Response = {
  data: ArticleResponseData
};

type Variables = {
  newsId: string;
};

  const query = QueryString.stringify(
    {
      populate: {
        image: {
          fields: ["url"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );


const useGetNewsDetail = createQuery<Response, Variables>({
  primaryKey: "/api/articles",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const res = await myApi.get(`${primaryKey}/${variables.newsId}`);
    return res.data;
  },
});

export default useGetNewsDetail;
