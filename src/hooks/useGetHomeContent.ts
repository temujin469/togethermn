import QueryString from "qs";
import { createQuery } from "react-query-kit";

type Response = ContentsResponse;

const query = QueryString.stringify({
  populate:{
    banner_images:true,
    section1_image:true,
    section2_image:true,
    user_comments:true,
    featured_talents:{
      populate:{
        profileImage:true
      }
    }
  }
})


const useGetHomeContent = createQuery<Response>({
  primaryKey: "/api/home-page",
  queryFn: async ({ queryKey: [primaryKey ]}) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}${primaryKey}?${query}`,
        {
          headers: { Accept: "*/*", "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      return data.data;
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  },
  // suspense: true,
});

export default useGetHomeContent;
