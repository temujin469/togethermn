import React from "react";
import RightLinks from "./rightLinks";
import LeftLinks from "./leftLinks";

function Header() {

  const isAuth = false

  return (
    <nav className="fixed top-0 select-none h-[70px] z-20 md:h-[75px] text-lg w-[100%] text-white flex items-center justify-between bg-primary"
    >
      <LeftLinks />
      <RightLinks />
    </nav>
  );
}

export default Header;
