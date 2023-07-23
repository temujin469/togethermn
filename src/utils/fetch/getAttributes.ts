type Attribute = {
  id: number;
  value: string;
};

type AttributesResponse = {
  id: number;
  attributes: {
    bodyTypes: Attribute[];
    shirtSizes: Attribute[];
    maritalStatus: Attribute[];
    genders: Attribute[];
    diets: Attribute[];
    professions: any[];
    eyeColors: Attribute[];
    hairColors: Attribute[];
    locations: Attribute[];
  };
};

export default async function getAttributes(): Promise<
  AttributesResponse | undefined
> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/attribute?populate=*`,
      {
        headers: { Accept: "*/*", "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    console.log("get attributes here");

    return data.data;
  } catch (err) {
    console.log(err);
    throw new Error();
  }
}
