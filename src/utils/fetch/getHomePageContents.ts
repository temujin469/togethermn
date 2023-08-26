// http://localhost:1337/api/home-page?populate=*

import QueryString from "qs";
import myFetch from "../myFetch";



const query = QueryString.stringify(
  {
    populate: {
      banner_images: {
        fields: ["url"],
      },
      section1_image: {
        fields: ["url"],
      },
      section2_video: {
        fields: ["url"],
      },
      featured_talents: {
        populate: {
          profileImage: {
            fields: ["url"],
          },
        },
      },
      user_comments: true,
      featured_articles:{
        populate:{
          image:{
            fields:["url"]
          }
        }
      }
    },
  },
  { encodeValuesOnly: true }
);

type Response = ContentsResponse


export default async function getHomePageContents(): Promise<
  Response| undefined
> {
    const data = await myFetch(`/api/home-page?${query}`,{
      next:{
        revalidate:5
      }
    });
    return data?.data;
}
