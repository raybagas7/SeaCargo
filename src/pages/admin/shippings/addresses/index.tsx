import AllUserAddressList from "@/components/AllUserAddressList/AllUserAddressList";
import FilterByAddresses from "@/components/FilterByAddresses/FilterByAddresses";
import FilterByPayment from "@/components/FilterByPayment/FilterByPayment";
import AdminLayout from "@/components/Layout/AdminLayout";
import UniPagination from "@/components/UniPagination/UniPagination";
import useDebounce from "@/hooks/useDebounce";
import { IPaginationProps } from "@/interface/pagination";
import { NextPageWithLayout } from "@/pages/_app";
import { useAdminAddresses } from "@/store/adminAddresses/useAdminAddresses";
import { getCookie } from "cookies-next";
import React, { ReactElement, useEffect, useState } from "react";

const index: NextPageWithLayout = () => {
  const pageInformation = useAdminAddresses.use.pagination();
  const { getAllUserAddresses } = useAdminAddresses.getState();
  const [search, setSearch] = useState<string>("");
  const [pageManagement, setPageManagement] = useState<IPaginationProps>({
    page: 1,
    limit: 8,
    sort: "createdAt",
    order: "asc",
  });

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchValue = useDebounce(search);

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
    getAllUserAddresses(
      token as string,
      pageManagement.page,
      pageManagement.limit,
      pageManagement.sort,
      pageManagement.order,
      searchValue,
    );
  }, [pageManagement, searchValue]);

  return (
    <main className="relative min-h-screen px-10 py-5 tablet:ml-[20vw]">
      <div>
        <FilterByAddresses
          search={search}
          onChangeSearch={onChangeSearch}
          pageManagement={pageManagement}
          onChangePageManagement={onChangePageManagement}
        />
      </div>
      <div className="h-fit">
        <AllUserAddressList />
      </div>
      <div className="mt-5 flex justify-center">
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
  return <AdminLayout>{page}</AdminLayout>;
};

export default index;