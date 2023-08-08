import { myApi } from "@/utils/axios";
import { createQuery } from "react-query-kit";

type Response = JobDetailResponse;

type Variables = {
  jobId:number
};

const useGetJobFullInfo = createQuery<Response, Variables>({
  primaryKey: "/api/azhils",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const res = await myApi.get(`${primaryKey}/${variables.jobId}?populate=*`);
    return res.data;
  },
  // suspense: true,
});

export default useGetJobFullInfo;
