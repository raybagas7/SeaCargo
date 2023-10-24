import CreateShippingForm from "@/components/CreateShippingForm/CreateShippingForm";
import Layout from "@/components/Layout/Layout";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { NextPageWithLayout } from "@/pages/_app";
import { useShipping } from "@/store/shipping/useShipping";
import { getCookie } from "cookies-next";
import React, { ReactElement, useEffect } from "react";

const index: NextPageWithLayout = () => {
  const userAddresses = useShipping.use.userAddresses();
  const selectedAddress = useShipping.use.selectedAddress();
  const { getUserAddresses } = useShipping.getState();

  useEffect(() => {
    const token = getCookie("accessToken");
    getUserAddresses(token as string);
  }, []);
  return (
    <main className="min-h-screen max-w-[1000px] pt-24">
      <LoadingScreen />
      <CreateShippingForm
        userAddresses={userAddresses}
        selectedAddress={selectedAddress}
      />
    </main>
  );
};

index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default index;
