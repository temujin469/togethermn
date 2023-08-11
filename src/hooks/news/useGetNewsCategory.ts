import { myApi } from "@/utils/axios";
import { createQuery } from "react-query-kit";

type Response = {
  data: ArticleCategoryData;
};

type Variables = {
  catId: string;
};

const useGetNewsCategory = createQuery<Response, Variables>({
  primaryKey: "/api/niitleliin-angilals",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const res = await myApi.get(`${primaryKey}/${variables.catId}`);
    return res.data;
  },
  // suspense: true,
});

export default useGetNewsCategory;
