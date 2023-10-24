import SeaCargo from "@/components/SVG/SeaCargo";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { SlOptionsVertical } from "react-icons/sl";

interface IMiniNavBar {
  toggleAside: () => void;
}

function MiniNavBar({ toggleAside }: IMiniNavBar) {
  return (
    <div className="fixed top-0 z-10 flex w-full items-center justify-between border-b-[0.5px] border-sec-light bg-prim-libg px-5 py-5 tablet:hidden">
      <GiHamburgerMenu
        className="cursor-pointer text-xl text-prim-litext transition-colors hover:text-prim-light hover:transition-colors"
        onClick={toggleAside}
      />
      <SeaCargo className="w-16 fill-prim-light dark:fill-prim-dark" />
      <SlOptionsVertical className="cursor-pointer text-xl text-prim-litext transition-colors hover:text-prim-light hover:transition-colors" />
    </div>
  );
}

export default MiniNavBar;
