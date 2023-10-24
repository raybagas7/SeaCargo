import Layout from "@/components/Layout/Layout";
import TopUp from "@/components/TopUp/TopUp";
import TopUpUserData from "@/components/TopUpUserData/TopUpUserData";
import { NextPageWithLayout } from "@/pages/_app";
import { useUser } from "@/store/user/useUser";
import React, { ReactElement } from "react";
import { ToastContainer } from "react-toastify";

const index: NextPageWithLayout = () => {
  const userData = useUser.use.userData();
  const walletData = useUser.use.walletData();
  return (
    <main className="min-h-screen w-full">
      <div className="flex h-fit w-full max-w-[1000px] flex-col items-center justify-center bg-prim-light pb-5 pt-24 tablet:max-w-none">
        <TopUpUserData
          photo={userData?.photo as string}
          fullname={userData?.fullname as string}
          phone={userData?.phone as number}
          referal={userData?.referal as string}
          balance={walletData?.balance as number}
        />
      </div>
      <div className="flex h-fit w-full max-w-[1000px] flex-col items-center justify-center px-10 pt-5 tablet:max-w-none">
        <TopUp />
      </div>
    </main>
  );
};

index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default index;
