import { myApi } from "@/utils/axios";
import QueryString from "qs";
import { createQuery } from "react-query-kit";

type Response = UserResponse;

type Variables = {
  talentId?: number;
};

const useGetTalentRate = createQuery<Response, Variables>({
  primaryKey: "/api/users",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const query = QueryString.stringify(
      {
        fields: ["reviews"],
        filters: {
          // isClosed: {
          //   $eq: true,
          // },
        },
        populate: {
          reviews: {
            fields: ["rate"],
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const res = await myApi.get<UserResponse>(`${primaryKey}/${variables.talentId}?${query}`);


    // const talentRate = rates?.reduce((avg,num)=>(avg+num)/rates.length)
    // console.log(rates);

    return res.data;
  },
});

export default useGetTalentRate;
