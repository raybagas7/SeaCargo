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

interface IUserNavBar {
  toggleAside: () => void;
}

function UserNavBar({ toggleAside }: IUserNavBar) {
  const router = useRouter();
  const userData = useUser.use.userData();

  const handleUserLogout = () => {
    deleteCookie("accessToken", { path: "/" });
    router.push("/entry");
  };
  return (
    <div className="fixed top-0 z-10 flex w-full items-center justify-between border-none bg-prim-libg px-5 py-5 shadow-md dark:bg-prim-dkbg dark:text-prim-dktext tablet:px-20 semitablet:px-48">
      <GiHamburgerMenu
        className="cursor-pointer text-xl text-prim-litext transition-colors hover:text-prim-light hover:transition-colors tablet:hidden"
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
                router.pathname === "/user/addresses"
                  ? "bg-prim-light/20 text-prim-light dark:bg-prim-dark/20 dark:text-prim-dark"
                  : ""
              } rounded-lg px-3 py-1 transition-colors hover:bg-prim-light/20 hover:text-prim-light hover:transition-colors dark:text-white dark:hover:bg-prim-dark/20 dark:hover:text-prim-dark`}
              href="/user/addresses"
            >
              Addresses
            </Link>
            <Link
              className={`${
                router.pathname === "/user/topup"
                  ? "bg-prim-light/20 text-prim-light dark:bg-prim-dark/20 dark:text-prim-dark"
                  : ""
              } rounded-lg px-3 py-1 transition-colors hover:bg-prim-light/20 hover:text-prim-light hover:transition-colors dark:text-white dark:hover:bg-prim-dark/20 dark:hover:text-prim-dark`}
              href="/user/topup"
            >
              Topup
            </Link>
            <Link
              className={`${
                router.pathname === "/user/payments"
                  ? "bg-prim-light/20 text-prim-light dark:bg-prim-dark/20 dark:text-prim-dark"
                  : ""
              } rounded-lg px-3 py-1 transition-colors hover:bg-prim-light/20 hover:text-prim-light hover:transition-colors dark:text-white dark:hover:bg-prim-dark/20 dark:hover:text-prim-dark`}
              href="/user/payments"
            >
              Payments
            </Link>
            <div
              className={`${
                router.pathname === "/user/shipping" ||
                router.pathname === "/user/shipping/create"
                  ? "bg-prim-light/20 text-prim-light dark:bg-prim-dark/20 dark:text-prim-dark"
                  : "dark:text-white"
              } group relative cursor-pointer rounded-lg px-3 py-1 transition-colors hover:bg-prim-light/20 hover:text-prim-light hover:transition-colors dark:hover:bg-prim-dark/20 dark:hover:text-prim-dark`}
            >
              <p>Shipping</p>
              {/*top-[3.250rem]*/}
              <div className="absolute -left-0 top-full hidden cursor-default flex-col gap-3 rounded-lg border-[0.5px] border-border-light bg-white p-5 shadow-xl hover:flex group-hover:flex group-hover:animate-default_quantum_bouncing">
                <Link
                  className="group/ship flex flex-1 gap-3"
                  href="/user/shipping"
                >
                  <div className=" rounded-lg bg-cyan-500/20 p-2 text-cyan-500 transition group-hover/ship:bg-cyan-500 group-hover/ship:text-white group-hover/ship:transition">
                    <LiaShipSolid className="h-10 w-10" />
                  </div>
                  <div className="flex flex-col justify-evenly text-sm text-prim-litext">
                    <p className="whitespace-nowrap font-bold hover:text-cyan-500">
                      View Shipping
                    </p>
                    <p className="whitespace-nowrap text-xs">
                      See all your shipping status
                    </p>
                  </div>
                </Link>
                <Link
                  className="group/ship flex flex-1 gap-3"
                  href="/user/shipping/create"
                >
                  <div className="rounded-lg bg-yellow-500/20 p-2 text-yellow-500 transition group-hover/ship:bg-yellow-500 group-hover/ship:text-white group-hover/ship:transition">
                    <GiCargoShip className="h-10 w-10" />
                  </div>
                  <div className="flex flex-col justify-evenly text-sm text-prim-litext">
                    <p className="whitespace-nowrap font-bold hover:text-yellow-500">
                      Create Shipping
                    </p>
                    <p className="whitespace-nowrap text-xs">
                      Make your new shipping
                    </p>
                  </div>
                </Link>
                {/* <Link className="flex flex-1 gap-3" href="/user/shipping">
                  <div className="rounded-lg bg-cyan-500/20 p-2 text-cyan-500">
                    <GiCargoShip className="h-10 w-10" />
                  </div>
                  <div className="flex flex-col justify-evenly text-sm">
                    <p className="whitespace-nowrap font-bold">
                      Create Shipping
                    </p>
                    <p className="whitespace-nowrap text-xs">
                      Make your new shipping
                    </p>
                  </div>
                </Link> */}
              </div>
            </div>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggler />
        <div className="group relative h-[2.25rem] w-[2.25rem] cursor-pointer rounded-full">
          <Image
            alt="profile-pict"
            src={userData ? userData?.photo : ""}
            height="100"
            width="100"
            className="h-full w-full rounded-full object-cover"
          />
          <div className="absolute right-0 top-full hidden cursor-default flex-col gap-3 rounded-lg border-[0.5px] border-border-light bg-white p-5 shadow-xl hover:flex group-hover:flex group-hover:animate-default_quantum_bouncing">
            <Link className="group/ship flex flex-1 gap-3" href="/user/profile">
              <div className=" rounded-lg bg-prim-light/20 p-2 text-prim-light transition group-hover/ship:bg-prim-light group-hover/ship:text-white group-hover/ship:transition">
                <div className="h-10 w-10">
                  <Image
                    alt="profile-pict"
                    src={userData ? userData?.photo : ""}
                    height="100"
                    width="100"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-evenly text-sm text-prim-litext">
                <p className="whitespace-nowrap font-bold hover:text-prim-light">
                  My Profile
                </p>
                <p className="whitespace-nowrap text-xs">
                  {userData ? userData.email : ""}
                </p>
                <p className="whitespace-nowrap text-xs">Account Settings</p>
              </div>
            </Link>
            <Button
              type="button"
              onClick={handleUserLogout}
              name="web-logout"
              secondary
              small
              wmax
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNavBar;
