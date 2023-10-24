import AdminLayout from "@/components/Layout/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useShipping } from "@/store/shipping/useShipping";
import { getCookie } from "cookies-next";
import React, { ReactElement, useEffect } from "react";

const index: NextPageWithLayout = () => {
  const { getShippings } = useShipping.getState();

  useEffect(() => {
    const token = getCookie("accessToken");
    // getShippings(token as string);
  }, []);
  return <div>Shippings</div>;
};

index.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default index;
