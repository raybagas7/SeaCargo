import ThemeToggler from "@/components/Layout/ThemeToggler";
import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaShipSolid } from "react-icons/lia";
import { FaRegUserCircle } from "react-icons/fa";
import { GiCargoShip } from "react-icons/gi";
import { useRouter } from "next/router";
import Image from "next/image";
import { useUser } from "@/store/user/useUser";
import Button from "@/components/Button/Button";
import { deleteCookie } from "cookies-next";
import SeaCargo from "@/components/SVG/SeaCargo";

interface IHomeNavBar {
  toggleAside: () => void;
}

function HomeNavBar({ toggleAside }: IHomeNavBar) {
  const router = useRouter();

  return (
    <div className="fixed top-0 z-10 flex w-full items-center justify-between border-none bg-prim-libg px-5 py-5 shadow-md dark:bg-prim-dkbg dark:text-prim-dktext tablet:px-20 semitablet:px-48">
      <GiHamburgerMenu
        className="cursor-pointer text-xl text-prim-litext transition-colors hover:text-prim-light hover:transition-colors dark:text-white dark:hover:text-prim-dark tablet:hidden"
        onClick={toggleAside}
      />
      <div className="flex items-center gap-10">
        <SeaCargo
          onClick={() => router.push("/user")}
          className="h-auto w-16 cursor-pointer fill-prim-light dark:fill-prim-dark"
        />
        <nav className="hidden text-sec-litext tablet:block">
          <ul className="flex space-x-5">
            <Link
              className={`${
                router.pathname === "/user"
                  ? "bg-prim-light/20 text-prim-light"
                  : ""
              } rounded-lg px-3 py-1 font-bold transition-colors hover:bg-prim-light/20 hover:text-prim-light hover:transition-colors`}
              href="/user"
            >
              Main
            </Link>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggler />
      </div>
    </div>
  );
}

export default HomeNavBar;
