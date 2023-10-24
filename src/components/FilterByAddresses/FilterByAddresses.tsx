import React from "react";
import UniSelect from "../UniSelect/UniSelect";
import Input from "../Input/Input";
import { IPaginationProps } from "@/interface/pagination";

interface IFilterByAddresses {
  search: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pageManagement: IPaginationProps;
  onChangePageManagement: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string,
  ) => void;
}

function FilterByAddresses({
  search,
  onChangeSearch,
  pageManagement,
  onChangePageManagement,
}: IFilterByAddresses) {
  return (
    <div className="mb-5 flex justify-between">
      <div className="flex items-end">
        <Input
          value={search}
          onChange={(e) => onChangeSearch(e)}
          name="search-shipping"
          label="Search by Anything"
          normal
        />
      </div>
      <div className="flex w-[50%] gap-3">
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
            { value: "createdAt", option: "Created" },
            { value: "updatedAt", option: "Updated" },
            { value: "province", option: "Province" },
            { value: "city", option: "City" },
            { value: "postal_code", option: "Postal Code" },
            { value: "address", option: "Address Name" },
          ]}
          value={pageManagement.sort}
          onChange={(e) => onChangePageManagement(e, "sort")}
          wFull
        />
      </div>
    </div>
  );
}

export default FilterByAddresses;
