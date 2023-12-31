import React from "react";
import UserNavigation from "../UserNavigation/UserNavigation";
import { ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <div className={`flex min-h-screen flex-col`}>
      <UserNavigation />
      <div className="mb-10 w-full">{children}</div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Layout;
