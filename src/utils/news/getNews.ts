import myFetch from "../myFetch";

type Response = {
  data:ArticleResponseData[]
  meta:Meta
}


export default async function getNews(query?:string): Promise<
Response | undefined
> {
    return await myFetch(
      `/api/articles?${query}`,
      {
        next:{
          revalidate:5
        }
      }
    );
}
