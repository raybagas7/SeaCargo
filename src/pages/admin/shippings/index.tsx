import React, { ReactElement, useEffect, useState } from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import { getCookie } from "cookies-next";
import { NextPageWithLayout } from "@/pages/_app";
import AdminShippingsList from "@/components/AdminShippingsList/AdminShippingsList";
import { useAdminShipping } from "@/store/adminShipping/useAdminShipping";
import TablePagination from "@/components/TablePagination/TablePagination";
import UniSelect from "@/components/UniSelect/UniSelect";
import FilterBy from "@/components/FilterBy/FilterBy";
import useDebounce from "@/hooks/useDebounce";
import Modal from "@/components/Modal/Modal";
import AdminShippingDetails from "@/components/ShippingDetails/AdminShippingDetails";
import { IPaginationProps } from "@/interface/pagination";

const index: NextPageWithLayout = () => {
  const { getAllShippings } = useAdminShipping.getState();
  const [search, setSearch] = useState<string>("");
  const [pageManagement, setPageManagement] = useState<IPaginationProps>({
    page: 1,
    limit: 8,
    sort: "createdAt",
    order: "asc",
  });
  const [trigger, setTrigger] = useState<boolean>(false);

  const triggerUseEffect = () => {
    setTrigger(!trigger);
  };

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
    getAllShippings(
      token as string,
      pageManagement.page,
      pageManagement.limit,
      pageManagement.sort,
      pageManagement.order,
      searchValue,
    );
  }, [pageManagement, searchValue, trigger]);
  return (
    <>
      <Modal
        component={
          <AdminShippingDetails
            trigger={trigger}
            triggerUseEffect={triggerUseEffect}
          />
        }
      />
      <main className="relative min-h-screen px-10 py-5 tablet:ml-[20vw]">
        <FilterBy
          search={search}
          onChangeSearch={onChangeSearch}
          pageManagement={pageManagement}
          onChangePageManagement={onChangePageManagement}
        />
        <AdminShippingsList />
        <TablePagination
          onClickChangePage={onClickChangePage}
          onClickNextChangePage={onClickNextChangePage}
        />
      </main>
    </>
  );
};

index.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default index;
