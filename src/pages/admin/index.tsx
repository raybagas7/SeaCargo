import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import SideBar from "@/components/SideBar/SideBar";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import AdminLayout from "@/components/Layout/AdminLayout";

const index: NextPageWithLayout = () => {
  return <div>a</div>;
};

index.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default index;
