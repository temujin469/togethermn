export default async function getProfessions(): Promise<
  ResponseProfession[] | undefined
> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/professions?populate=*`,
      {
        headers: { Accept: "*/*", "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    console.log(data);

    return data.data;
  } catch (err) {
    console.log(err);
  }
}
