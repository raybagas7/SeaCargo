import React from "react";
import SeaCargo from "../SVG/SeaCargo";
import { GiBrokenSkull } from "react-icons/gi";

function Footer() {
  return (
    <div className="flex h-fit w-full max-w-[1000px] flex-col items-center justify-center bg-prim-light py-5 dark:bg-prim-dark tablet:max-w-none">
      <div className="flex items-center gap-3 font-bold text-white">
        <p className=" self-end">SeaCargo, Sail</p>
        <SeaCargo className="h-auto w-12 fill-white" />
        <p className=" self-end">Across The Sea</p>
      </div>
    </div>
  );
}

export default Footer;
