import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import List from "../List/List";
import { FaRegUserCircle } from "react-icons/fa";
import styles from "./SideBar.module.scss";
import classNames from "classnames";
import { LuView } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import {
  LiaAddressBookSolid,
  LiaCoinsSolid,
  LiaShipSolid,
} from "react-icons/lia";
import { TbDiscount } from "react-icons/tb";
import MiniNavBar from "./MiniNavBar/MiniNavBar";
import { useAdmin } from "@/store/admin/useAdmin";
import SeaCargo from "../SVG/SeaCargo";

function SideBar() {
  const [asideHide, setAsideHide] = useState(true);
  const router = useRouter();
  const token = getCookie("accessToken");
  const { getAdminData } = useAdmin.getState();

  useEffect(() => {
    getAdminData(token as string);
  }, []);

  const handleAdminLogout = () => {
    deleteCookie("accessToken", { path: "/" });
    router.push("/entry");
  };

  const toggleAside = () => {
    setAsideHide(!asideHide);
  };

  const containerClasses = classNames(styles.asideContainer);
  const listWrapperClasses = classNames(styles.listWrapper);

  return (
    <>
      <MiniNavBar toggleAside={toggleAside} />
      <div
        className={`${containerClasses} ${
          asideHide
            ? "-translate-x-[110%] tablet:translate-x-0"
            : "translate-x-0"
        }`}
      >
        <div className="relative overflow-y-scroll py-12" id="aside-navigation">
          <div className="fixed left-0 top-0 flex w-full items-center justify-between border-b-[0.5px] border-prim-light bg-prim-libg px-12 py-5">
            <SeaCargo
              onClick={() => router.push("/admin")}
              className="w-16 cursor-pointer fill-prim-light dark:fill-prim-dark"
            />
            <div className="tablet:hidden">
              <IoClose
                onClick={toggleAside}
                className="cursor-pointer text-xl text-prim-litext transition-colors hover:text-prim-light hover:transition-colors"
              />
            </div>
          </div>
          <nav className="px-3">
            <ul className={listWrapperClasses}>
              <h2 className="mb-3 font-bold">Home</h2>
              <List
                name="Overview"
                to="/admin"
                icon={<LuView />}
                isActive={router.pathname === "/admin"}
              />
            </ul>
            <ul className={listWrapperClasses}>
              <h2 className="mb-3 font-bold">Shipping</h2>
              <List
                name="Shippings"
                to="/admin/shippings"
                icon={<LiaShipSolid />}
                isActive={router.pathname === "/admin/shippings"}
              />
              <List
                name="Addresses"
                to="/admin/shippings/addresses"
                icon={<LiaAddressBookSolid />}
                isActive={router.pathname === "/admin/shippings/addresses"}
              />
              <List
                name="Earnings"
                to="/admin/shippings/earnings"
                icon={<LiaCoinsSolid />}
                isActive={router.pathname === "/admin/shippings/earnings"}
              />
              <List
                name="Promos"
                to="/admin/shippings/promos"
                icon={<TbDiscount />}
                isActive={router.pathname === "/admin/shippings/promos"}
              />
            </ul>
            <ul className={listWrapperClasses}>
              <h2 className="mb-3 font-bold">Profile</h2>
              <List
                name="Settings"
                to="/admin/profile"
                icon={<FaRegUserCircle />}
                isActive={router.pathname === "/admin/profile"}
              />
            </ul>
          </nav>
        </div>
        <div className=" flex items-center justify-center rounded-lg bg-prim-libg p-5 shadow">
          <Button onClick={handleAdminLogout} name="logout-admin" primary large>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}

export default SideBar;
