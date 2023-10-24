import React from "react";
import { ToastContainer } from "react-toastify";
import HomeNavigation from "../UserNavigation/HomeNavigation";
import Footer from "../Footer/Footer";

interface IHomeLayout {
  children: React.ReactNode;
}

function HomeLayout({ children }: IHomeLayout) {
  return (
    <div className={`flex min-h-screen flex-col`}>
      <HomeNavigation />
      <div className="w-full">{children}</div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default HomeLayout;
