import React, { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import Layout from "@/components/Layout/Layout";
import { usePayment } from "@/store/payment/usePayment";
import { IPaginationProps } from "@/interface/pagination";
import useDebounce from "@/hooks/useDebounce";
import { getCookie } from "cookies-next";
import UniPagination from "@/components/UniPagination/UniPagination";
import PaymentList from "@/components/PaymentList/PaymentList";
import FilterByPayment from "@/components/FilterByPayment/FilterByPayment";

const index: NextPageWithLayout = () => {
  const { getPayments } = usePayment.getState();
  const pageInformation = usePayment.use.pagination();
  console.log(pageInformation);
  const [search, setSearch] = useState<string>("");
  const [pageManagement, setPageManagement] = useState<IPaginationProps>({
    page: 1,
    limit: 8,
    sort: "date",
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
    getPayments(
      token as string,
      pageManagement.page,
      pageManagement.limit,
      pageManagement.sort,
      pageManagement.order,
      searchValue,
    );
  }, [pageManagement, searchValue]);

  return (
    <main className="relative min-h-screen max-w-[1000px] px-10 pt-24 tablet:max-w-none">
      <div className="px-10 text-sm tablet:px-20 tablet:text-base semitablet:px-48">
        <FilterByPayment
          search={search}
          onChangeSearch={onChangeSearch}
          pageManagement={pageManagement}
          onChangePageManagement={onChangePageManagement}
        />
      </div>
      <div className="h-fit min-h-[70vh]">
        <PaymentList />
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
  );
};

index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default index;
