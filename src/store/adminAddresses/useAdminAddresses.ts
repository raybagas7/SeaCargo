import { create } from "zustand";
import { createZusSelector } from "../createZusSelector";
import { toastifyError } from "@/utils/toastifyError";
import { useLoading } from "../loading/useLoading";
import { IAddress, ICombinedAddressWithUserData } from "@/interface/addresses";
import { IPaginationResponse } from "@/interface/pagination";

type State = {
  allUserAddresses: ICombinedAddressWithUserData[] | undefined;
  selectedAddress: ICombinedAddressWithUserData | undefined;
  pagination: IPaginationResponse | undefined;
};

type Actions = {
  getAllUserAddresses: (
    token: string,
    page: number,
    limit: number,
    sort: string,
    order: string,
    search?: string,
  ) => void;
  changeSelectedAddress: (address: ICombinedAddressWithUserData) => void;
};

const useAdminAddressesBase = create<State & Actions>((set) => ({
  allUserAddresses: undefined,
  selectedAddress: undefined,
  pagination: undefined,

  getAllUserAddresses: async (
    token: string,
    page: number,
    limit: number,
    sort: string,
    order: string,
    search?: string,
  ) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch(
        `/api/alladdress?page=${page}&limit=${limit}&sort=${sort}&order=${order}${
          search && `&q=${search}`
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );
      if (response.ok) {
        const data = await response.json();

        set(() => ({
          allUserAddresses: [...data.addressList],
          pagination: data.pagination,
        }));
        hideLoading();
      } else {
        hideLoading();
        const data = await response.json();

        toastifyError(data.error);
      }
    } catch (error) {
      hideLoading();

      toastifyError(String(error));
    }
  },
  changeSelectedAddress: (address: ICombinedAddressWithUserData) => {
    set(() => ({ selectedAddress: { ...address } }));
  },
}));

export const useAdminAddresses = createZusSelector(useAdminAddressesBase);
