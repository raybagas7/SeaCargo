import React from "react";
import UniSelect from "../UniSelect/UniSelect";
import Input from "../Input/Input";
import { IPaginationProps } from "@/interface/pagination";

interface IFilterBy {
  search: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pageManagement: IPaginationProps;
  onChangePageManagement: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string,
  ) => void;
}

function FilterBy({
  search,
  onChangeSearch,
  pageManagement,
  onChangePageManagement,
}: IFilterBy) {
  return (
    <div className="mb-5 flex justify-between max-md:flex-col">
      <div className="flex items-end max-md:mb-3">
        <Input
          value={search}
          onChange={(e) => onChangeSearch(e)}
          name="search-shipping"
          label="Search by Anything"
          normal
        />
      </div>
      <div className="flex w-[50%] gap-3 max-md:w-full">
        <UniSelect
          name="sort-order"
          label="Order"
          labelOnTop
          data={[
            { value: "asc", option: "Ascending" },
            { value: "desc", option: "Descending" },
          ]}
          value={pageManagement.order}
          onChange={(e) => onChangePageManagement(e, "order")}
          wFull
        />
        <UniSelect
          name="sort-by"
          label="Sort By"
          labelOnTop
          data={[
            { value: "createdAt", option: "Date" },
            { value: "name", option: "Shipping Name" },
            { value: "cost", option: "Cost" },
          ]}
          value={pageManagement.sort}
          onChange={(e) => onChangePageManagement(e, "sort")}
          wFull
        />
      </div>
    </div>
  );
}

export default FilterBy;
