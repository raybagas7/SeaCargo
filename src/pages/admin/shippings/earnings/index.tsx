import AdminLayout from "@/components/Layout/AdminLayout";
import TotalIncome from "@/components/TotalIncome/TotalIncome";
import TotalRecap from "@/components/TotalRecap/TotalRecap";
import { NextPageWithLayout } from "@/pages/_app";
import { useAdminEarnings } from "@/store/adminEarnings/useAdminEarnings";
import { getCookie } from "cookies-next";
import React, { ReactElement, useEffect } from "react";

const index: NextPageWithLayout = () => {
  const { getEarning } = useAdminEarnings.getState();

  useEffect(() => {
    const token = getCookie("accessToken");
    getEarning(token as string);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col px-10 py-5 tablet:ml-[20vw]">
      <TotalRecap />
      <TotalIncome />
    </main>
  );
};

index.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default index;
