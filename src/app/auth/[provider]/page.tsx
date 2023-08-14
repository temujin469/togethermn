"use client"
import useAuth from '@/hooks/useAuth';
import { myApi } from '@/utils/axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {
  params: {
    provider: string
  }
}

function Auth({params}:Props) {
  const auth = useAuth();
  const router = useRouter()
  const urlParams = useSearchParams()
  const token = urlParams.get("access_token")

  // console.log(token)
  // const qr = urlParam
  const signinWithProvider = async ({ token, provider }: { token: string, provider: "google" | "facebook" | string }) => {
  try {
    const response = await myApi.get<any>(
      `/api/auth/${provider}/callback?access_token=${token}`
    );
    if (response.data) {
      const data = response.data;
      // localStorage.setItem("user", JSON.stringify(response.data));
        auth.setToken(data.jwt);
        auth.setIsAuth(true);
        localStorage.setItem("token", JSON.stringify(data.jwt));
        // loginModal.afterUrl && router.push(loginModal.afterUrl);
        // loginModal.onClose()
      // console.log(response.data)
      router.push("/")
    }

    return response.data;
  }catch(err){
    console.log(err)
    router.back()
  }
  };

  useEffect(()=>{
    signinWithProvider({provider:params.provider ,token:token as string})
  },[])
  

  return (
    <div>
      
    </div>
  );
}

export default Auth;
