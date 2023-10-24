import React from "react";
import { ToastContainer } from "react-toastify";
import SideBar from "../SideBar/SideBar";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

interface IAdminLayout {
  children: React.ReactNode;
}

function AdminLayout({ children }: IAdminLayout) {
  return (
    <div className={`flex min-h-screen flex-col`}>
      <SideBar />
      <LoadingScreen />
      <div className="w-full">{children}</div>
      <ToastContainer />
    </div>
  );
}

export default AdminLayout;
