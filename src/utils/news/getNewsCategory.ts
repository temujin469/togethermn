import myFetch from "../myFetch";

type Response = {
  data: ArticleCategoryData[];
};

export default async function getNewsCategory(): Promise<Response | undefined> {
  return await myFetch(
    `/api/niitleliin-angilals`,
    {
      next: {
        revalidate: 5,
      },
    }
  );
}
