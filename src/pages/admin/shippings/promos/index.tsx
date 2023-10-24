import AdminLayout from "@/components/Layout/AdminLayout";
import MakeNewPromoForm from "@/components/MakeNewPromoForm/MakeNewPromoForm";
import { IPromos, IPromosForm } from "@/interface/promos";
import { NextPageWithLayout } from "@/pages/_app";
import { useAdmin } from "@/store/admin/useAdmin";
import { getCookie } from "cookies-next";
import React, { ReactElement, useState } from "react";

const index: NextPageWithLayout = () => {
  const [promoData, setPromoData] = useState<IPromosForm>({
    name: "",
    value: 0,
    max: 0,
    expired: 0,
    description: "",
    count: 0,
  });

  const onChangePromoData = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
    key: string,
  ) => {
    setPromoData({
      ...promoData,
      [key]: event.target.value,
    });
  };

  const resetForm = () => {
    setPromoData({
      name: "",
      value: 0,
      max: 0,
      expired: 0,
      description: "",
      count: 0,
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-10 py-5 tablet:ml-[20vw]">
      <MakeNewPromoForm
        promoData={promoData}
        onChangePromoData={onChangePromoData}
        resetForm={resetForm}
      />
    </main>
  );
};

index.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default index;
