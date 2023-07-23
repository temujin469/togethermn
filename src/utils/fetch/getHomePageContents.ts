// http://localhost:1337/api/home-page?populate=*

import QueryString from "qs";



// const query = QueryString.stringify(
//   {
//     populate:"*"
//   },
//   { encodeValuesOnly: true }
// );

export default async function getHomePageContents(): Promise<
  ContentsResponse | undefined
> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate=*`,
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
}
