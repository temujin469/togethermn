import axios from "axios"

export const myApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
})
