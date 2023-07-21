// http://localhost:1337/api/home-page?populate=*

import QueryString from "qs";


type ContentsResponse = {
  id: number;
  attributes: {
    banner_images: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      }[];
    };
    section1_image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    section2_video: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    featured_talents:{
      data:{
        id:number,
        attributes:User
      }
    }[]
  };
};

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
        headers: { Accept: "*/*" },
      }
    );
    const data = await res.json();

    return data.data;
  } catch (err) {
    console.log(err);
    throw new Error();
  }
}
