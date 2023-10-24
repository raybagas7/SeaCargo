import Layout from "@/components/Layout/Layout";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import SeaCargo from "@/components/SVG/SeaCargo";

const index: NextPageWithLayout = () => {
  return (
    <main className="relative min-h-screen max-w-[1000px] pt-24 tablet:max-w-none">
      <p>a</p>
      <SeaCargo className="w-10 fill-prim-light" />
    </main>
  );
};

index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default index;
