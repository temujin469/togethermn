"use client";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";
import { myApi } from "@/utils/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useUser = () => {
  const auth = useAuth();
  const user = auth.user;
  const token = auth.token;
  const isAuth = auth.isAuth;
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = () => {
    router.push("/");
    localStorage.removeItem("token");
    auth.setToken(undefined);
    auth.setIsAuth(false);
    auth.setUser(undefined);
    queryClient.invalidateQueries(["jobs"]);
    queryClient.invalidateQueries(["closedJobs"]);
  };

  useEffect(() => {
    const token =
      Boolean(localStorage.getItem("token")) &&
      JSON.parse(localStorage.getItem("token") as string);

    auth.setToken(token);
    token && auth.setIsAuth(true);
  }, []);

  console.log("token", token);

  // const getUser = async () => {
  //   setIsLoading(true);
  //   setIsError(false);

  //   try {
  //     const user = await myApi.get("/users/me", {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //     auth.setUser(user.data);
  //     auth.setIsAuth(true);
  //     console.log(user);
  //   } catch (error) {
  //     console.log(error);
  //     setIsError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const getUser = async () => {
    const user = await myApi.get<User>("/users/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    auth.setUser(user.data);
    auth.setIsAuth(true);

    return user.data;
  };

  
  useEffect(() => {
    if (token && !auth.user) {
      getUser();
    }
  }, [token]);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["me"],
    queryFn: getUser,
    onSuccess: (user) => {
      auth.setUser(user);
      auth.setIsAuth(true);
    },
  });

  return { user, isError, isLoading, getUser, token, logout, isAuth };
};
