import { myApi } from "@/utils/axios";
// import QueryString from "qs";
import { createQuery } from "react-query-kit";

type Response = {
  id:number
  username:string;
  bookedJobs:{
    user:{
      id:number
      username:string
    },
    bookedBy:{
      id:number
    }
  }[]
}

type Variables = {
  query:string
};

const useGetAllUsers = createQuery<Response[], Variables>({
  primaryKey: "/api/users",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    // const query = QueryString.stringify(
    //   {
    //     fields: ["title", "user"],
    //   },
    //   { encodeValuesOnly: true }
    // );

    const res = await myApi.get(`${primaryKey}?${variables.query}`);
    return res.data;
  },
});

export default useGetAllUsers;
