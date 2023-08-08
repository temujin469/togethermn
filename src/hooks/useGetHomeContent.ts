import { createQuery } from "react-query-kit";

type Response = ContentsResponse;


const useGetHomeContent = createQuery<Response>({
  primaryKey: "/api/home-page",
  queryFn: async ({ queryKey: [primaryKey ]}) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}${primaryKey}?populate=*`,
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
