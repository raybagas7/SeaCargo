import React, { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import List from "../List/List";
import { FaRegUserCircle } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import styles from "./UserNavigation.module.scss";
import classNames from "classnames";
import { IoClose } from "react-icons/io5";
import {
  LiaWalletSolid,
  LiaAddressBookSolid,
  LiaShipSolid,
} from "react-icons/lia";
import { GiCargoShip } from "react-icons/gi";
import UserNavBar from "./UserNavBar/UserNavBar";
import Button from "../Button/Button";
import { useUser } from "@/store/user/useUser";
import SeaCargo from "../SVG/SeaCargo";

function UserNavigation() {
  const [asideHide, setAsideHide] = useState(true);
  const router = useRouter();
  const token = getCookie("accessToken");
  const { getUserData, getWalletData } = useUser.getState();

  useEffect(() => {
    getUserData(token as string);
    getWalletData(token as string);
  }, []);

  const handleUserLogout = () => {
    deleteCookie("accessToken", { path: "/" });
    router.push("/entry");
  };

  const toggleAside = () => {
    setAsideHide(!asideHide);
  };

  const clickOutSide = (e: any) => {
    e.stopPropagation();
  };

  const userNavigationContainerClasses = classNames(styles.asideContainer);
  const listWrapperClasses = classNames(styles.listWrapper);

  return (
    <>
      <UserNavBar toggleAside={toggleAside} />
      <div
        onClick={toggleAside}
        className={`${userNavigationContainerClasses} ${
          asideHide
            ? "-translate-x-[110%] bg-transparent tablet:-translate-x-full"
            : "translate-x-0 bg-black/20 tablet:-translate-x-full"
        }`}
      >
        <div
          onClick={(e) => clickOutSide(e)}
          id="aside-navigation"
          className="relative h-full w-[70vw] overflow-y-scroll border-r-[0.5px] border-sec-light bg-white px-7 py-5"
        >
          <div className="relative  py-12">
            <div className="fixed left-0 top-0 flex w-[70vw] items-center justify-between border-b-[0.5px] border-r-[0.5px] border-prim-light  bg-prim-libg px-10 py-5">
              {/* <h1 className="text-[24px]">SeaCargo</h1> */}
              <SeaCargo className="h-auto w-16 fill-prim-light dark:fill-prim-dark" />
              <IoClose
                onClick={toggleAside}
                className="cursor-pointer text-xl text-prim-litext transition-colors hover:text-prim-light hover:transition-colors"
              />
            </div>
            <nav className="px-3">
              <ul className={listWrapperClasses}>
                <h2 className="mb-3 font-bold">Profile</h2>
                <List
                  onClick={toggleAside}
                  name="Settings"
                  to="/user/profile"
                  icon={<FaRegUserCircle />}
                  isActive={router.pathname === "/user/profile"}
                />
                <List
                  onClick={toggleAside}
                  name="Addresses"
                  to="/user/addresses"
                  icon={<LiaAddressBookSolid />}
                  isActive={router.pathname === "/user/addresses"}
                />
              </ul>
              <ul className={listWrapperClasses}>
                <h2 className="mb-3 font-bold">Wallet</h2>
                <List
                  onClick={toggleAside}
                  name="Topup"
                  to="/user/topup"
                  icon={<LiaWalletSolid />}
                  isActive={router.pathname === "/user/topup"}
                />
                <List
                  onClick={toggleAside}
                  name="Payments"
                  to="/user/payments"
                  icon={<MdPayment />}
                  isActive={router.pathname === "/user/payments"}
                />
              </ul>
              <ul className={listWrapperClasses}>
                <h2 className="mb-3 font-bold">Shippings</h2>
                <List
                  onClick={toggleAside}
                  name="Create Shipping"
                  to="/user/shipping/create"
                  icon={<GiCargoShip />}
                  isActive={router.pathname === "/user/shipping/create"}
                />
                <List
                  onClick={toggleAside}
                  name="View Shipping"
                  to="/user/shipping"
                  icon={<LiaShipSolid />}
                  isActive={router.pathname === "/user/shipping"}
                />
              </ul>
            </nav>
          </div>
          <div className="flex items-center justify-center rounded-lg bg-prim-libg p-5 shadow">
            <Button
              type="button"
              onClick={handleUserLogout}
              name="logout-user"
              primary
              normal
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserNavigation;
