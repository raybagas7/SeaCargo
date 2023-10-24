import AddressesUser from "@/components/AddressesList/AddressesUser";
import EditAddress from "@/components/EditAddress/EditAddress";
import Layout from "@/components/Layout/Layout";
import Modal from "@/components/Modal/Modal";
import SelectAddress from "@/components/SelectAddress/SelectAddress";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement, useState } from "react";

const index: NextPageWithLayout = () => {
  const [trigger, setTrigger] = useState<boolean>(false);

  const triggerUseEffect = () => {
    setTrigger(!trigger);
  };
  return (
    <>
      <Modal component={<EditAddress triggerUseEffect={triggerUseEffect} />} />
      <main className="min-h-screen max-w-[1000px] pt-24 tablet:max-w-none tablet:pt-28">
        <div className="flex flex-col px-10 tablet:flex-row tablet:gap-5">
          <SelectAddress triggerUseEffect={triggerUseEffect} />
          <AddressesUser trigger={trigger} />
        </div>
      </main>
    </>
  );
};

index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default index;