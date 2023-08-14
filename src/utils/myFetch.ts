

type MyFetch = (
  endpoint: RequestInfo | URL,
  config?: RequestInit | undefined
) => Promise<any>;

const initialConfig: RequestInit = {
  headers: { Accept: "*/*", "Content-Type": "application/json" },
  cache:"force-cache",
  next:{
    revalidate:3600
  }
};


const myFetch:MyFetch = async (endpoint, config) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}${endpoint}`,{...initialConfig,...config}
    );
    if (!response.ok) {
      // throw new Error("Өгөгдлийг дуудаж чадсангүй");
      console.log("Өгөгдлийг дуудаж чадсангүй");
    }
    return await response.json();
  } catch (err) {
    console.log("myFetch ERROR ===>", err);
  }
};

export default myFetch;
