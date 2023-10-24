import React from "react";
import UserNavigation from "../UserNavigation/UserNavigation";
import { ToastContainer } from "react-toastify";

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <div className={`flex min-h-screen flex-col`}>
      <UserNavigation />
      <div className="w-full">{children}</div>
      <div className="mt-10 flex h-fit w-full max-w-[1000px] flex-col items-center justify-center bg-prim-light tablet:max-w-none">
        Footer
      </div>
      <ToastContainer />
    </div>
  );
}

export default Layout;
