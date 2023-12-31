import FilterBy from "@/components/FilterBy/FilterBy";
import Layout from "@/components/Layout/Layout";
import ShippingsList from "@/components/ShippingsList/ShippingsList";
import UniPagination from "@/components/UniPagination/UniPagination";
import useDebounce from "@/hooks/useDebounce";
import { IPaginationProps } from "@/interface/pagination";
import { NextPageWithLayout } from "@/pages/_app";
import { useShipping } from "@/store/shipping/useShipping";
import { getCookie } from "cookies-next";
import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";

const index: NextPageWithLayout = () => {
  const { getShippings } = useShipping.getState();
  const pageInformation = useShipping.use.pagination();
  const [search, setSearch] = useState<string>("");
  const [pageManagement, setPageManagement] = useState<IPaginationProps>({
    page: 1,
    limit: 15,
    sort: "createdAt",
    order: "asc",
  });

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickChangePage = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string,
    value: number,
  ) => {
    setPageManagement({
      ...pageManagement,
      [key]: value,
    });
  };
  const searchValue = useDebounce(search);

  const onClickNextChangePage = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string,
  ) => {
    setPageManagement({
      ...pageManagement,
      [key]: pageManagement.page + 1,
    });
  };

  const onChangePageManagement = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string,
  ) => {
    setPageManagement({
      ...pageManagement,
      [key]: e.target.value,
    });
  };

  useEffect(() => {
    const token = getCookie("accessToken");
    getShippings(
      token as string,
      pageManagement.page,
      pageManagement.limit,
      pageManagement.sort,
      pageManagement.order,
      searchValue,
    );
  }, [pageManagement, searchValue]);

  return (
    <>
      <Head>
        <title>SeaCargo | User Shippings</title>
        <meta name="seacargo" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative min-h-screen max-w-[1000px] pt-24 tablet:max-w-none">
        <div className="px-10 text-sm tablet:px-20 tablet:text-base semitablet:px-48">
          <FilterBy
            search={search}
            onChangeSearch={onChangeSearch}
            pageManagement={pageManagement}
            onChangePageManagement={onChangePageManagement}
          />
        </div>
        <div className="h-fit min-h-[70vh]">
          <ShippingsList />
        </div>
        <div className="mt-5 flex justify-center semitablet:mt-0">
          {pageInformation ? (
            <UniPagination
              pageInformation={pageInformation}
              onClickChangePage={onClickChangePage}
              onClickNextChangePage={onClickNextChangePage}
            />
          ) : null}
        </div>
      </main>
    </>
  );
};

index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default index;
