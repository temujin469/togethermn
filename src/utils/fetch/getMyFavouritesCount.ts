import QueryString from "qs";
import { myApi } from "../axios";

const query = QueryString.stringify(
  {
    fields: ["favourites", "id"],
    populate: {
      favourites: {
        fields: ["favourite"],
        populate: {
          favourite: {
            fields: ["id"],
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

export default async function getMyFavouritesCount(token:string): Promise<number> {
  const res = await myApi.get<User>(`/api/users/me?${query}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.data.favourites.length;
}
