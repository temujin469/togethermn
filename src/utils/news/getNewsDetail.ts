import QueryString from "qs";
import myFetch from "../myFetch";

type Response = {
  data: ArticleResponseData;
};

  const query = QueryString.stringify(
    {
      populate: {
        image: {
          fields: ["url"],
        },
        categories:true
      },
    },
    {
      encodeValuesOnly: true,
    }
  );


export default async function getNewsDetail(newsId:number): Promise<Response | undefined> {
  return await myFetch(`/api/articles/${newsId}?${query}`,{next:{
    revalidate:5
  }});
}
