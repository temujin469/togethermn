import { myApi } from '@/utils/axios';
import React from 'react';

type Props = {
  params: {
    provider: string
  }
}

function Auth({params}:Props) {
  const signinWithProvider = async ({ token, provider }: { token: string, provider: "google" | "facebook" | string }) => {
    const response = await myApi.get(
      `/auth/${provider}/callback?access_token=${token}`
    );
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  };
  return (
    <div>
      
    </div>
  );
}

export default Auth;
