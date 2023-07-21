type ResponseProfession = {
  id: number;
  attributes: {
    name: string;
    category: string;
    background_image:{
      data:{
        id:number,
        attributes:{
          url:string
        }
      }
    }
  };
};

export default async function getProfessions(): Promise<
  ResponseProfession[] | undefined
> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/professions?populate=*`,
      {
        headers: { Accept: "*/*" },
      }
    );
    console.log("here");
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);
  }
}
