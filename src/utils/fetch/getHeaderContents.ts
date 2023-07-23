import QueryString from "qs";

type Content = {
  id: number;
  title: string;
  background_image:{
    data:{
      attributes:{
        url:string
      }
    }
  }
};

type ContentsResponse = {
  id: number;
  attributes: {
    cast_talent: Content
    influencer: Content
    content_creator: Content
    creative_production: Content
  };
};

const query = QueryString.stringify(
  {
    populate: {
      cast_talent: {
        populate: "background_image",
        fields: "url",
      },
      influencer: {
        populate: "background_image",
        fields: "url",
      },
      content_creator: {
        populate: "background_image",
        fields: "url",
      },
      creative_production: {
        populate: "background_image",
        fields: "url",
      },
    },
  },
  { encodeValuesOnly: true }
);

export default async function getHeaderContents(): Promise<ContentsResponse | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/header?${query}`,
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
