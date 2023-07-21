import React from "react";
import RightLinks from "./rightLinks";
import LeftLinks from "./leftLinks";
import getProfessions from "@/utils/fetch/getProfessions";
import getQueryClient from "@/utils/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import getHeaderContents from "@/utils/fetch/getHeaderContents";

async function Header() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["headerContents"], getHeaderContents)
  const dehydratedState = dehydrate(queryClient)

  return (
    <div className="mt-[70px] md:mt-[75px]">
      <div className="fixed top-0 select-none h-[70px] z-20 md:h-[75px] text-lg w-[100%] text-white flex items-center justify-between bg-primary"
      >
        <Hydrate state={dehydratedState}>
          <LeftLinks />
          <RightLinks  />
        </Hydrate>
      </div>
    </div>
  );
}

export default Header;
