import React, { useState } from "react";
import { useRouter } from "next/router";
import List from "../List/List";
import { FaRegUserCircle } from "react-icons/fa";
import styles from "./UserNavigation.module.scss";
import classNames from "classnames";
import { IoClose } from "react-icons/io5";
import { LiaAddressBookSolid } from "react-icons/lia";
import SeaCargo from "../SVG/SeaCargo";
import HomeNavBar from "./UserNavBar/HomeNavBar";

function HomeNavigation() {
  const [asideHide, setAsideHide] = useState(true);
  const router = useRouter();

  const toggleAside = () => {
    setAsideHide(!asideHide);
  };

  const clickOutSide = (e: any) => {
    e.stopPropagation();
  };

  const HomeNavigationContainerClasses = classNames(styles.asideContainer);
  const listWrapperClasses = classNames(styles.listWrapper);

  return (
    <>
      <HomeNavBar toggleAside={toggleAside} />
      <div
        onClick={toggleAside}
        className={`${HomeNavigationContainerClasses} ${
          asideHide
            ? "-translate-x-[110%] bg-transparent tablet:-translate-x-full"
            : "translate-x-0 bg-black/20 tablet:-translate-x-full"
        }`}
      >
        <div
          onClick={(e) => clickOutSide(e)}
          id="aside-navigation"
          className="relative h-full w-[70vw] overflow-y-scroll border-r-[0.5px] border-prim-light bg-white px-7 py-5 dark:border-prim-dark dark:bg-prim-dkbg dark:text-white"
        >
          <div className="relative  py-12">
            <div className="fixed left-0 top-0 flex w-[70vw] items-center justify-between border-b-[0.5px] border-r-[0.5px] border-prim-light bg-prim-libg px-10 py-5 dark:border-prim-dark dark:bg-prim-dkbg">
              {/* <h1 className="text-[24px]">SeaCargo</h1> */}
              <SeaCargo className="h-auto w-16 fill-prim-light dark:fill-prim-dark" />
              <IoClose
                onClick={toggleAside}
                className="cursor-pointer text-xl text-prim-litext transition-colors hover:text-prim-light hover:transition-colors dark:text-white dark:hover:text-prim-dark"
              />
            </div>
            <nav className="px-3">
              <ul className={listWrapperClasses}>
                <h2 className="mb-3 font-bold">Main</h2>
                <List
                  onClick={toggleAside}
                  name="Main"
                  to="/user"
                  icon={<FaRegUserCircle />}
                  isActive={router.pathname === "/user"}
                />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeNavigation;
