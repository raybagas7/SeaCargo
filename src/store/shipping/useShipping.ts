import { create } from "zustand";
import { createZusSelector } from "../createZusSelector";
import { toastifyError } from "@/utils/toastifyError";
import { useLoading } from "../loading/useLoading";
import { IAddress } from "@/interface/addresses";
import {
  INewShippingData,
  IPromosData,
  IShippingDataPayload,
} from "@/interface/shippings";
import { toastifySuccess } from "@/utils/toastifySuccess";
import { useUser } from "../user/useUser";
import { toastifyInfo } from "@/utils/toastifyInfo";
import { useModal } from "../modal/useModal";
import { IPayment } from "@/interface/payments";
import { IPagination } from "@/interface/allshipping";

type State = {
  userAddresses: IAddress[] | undefined;
  selectedAddress: IAddress | undefined;
  shippingsData: IShippingDataPayload[] | undefined;
  selectedShippingId: string | undefined;
  shippingDetails: IShippingDataPayload | undefined;
  promosData: IPromosData[] | undefined;
  selectedPromo: IPromosData | undefined;
  appliedReferal: string | undefined;
  paymentDetail: IPayment | undefined;
  pagination: IPagination | undefined;
};

type Actions = {
  getUserAddresses: (token: string) => void;
  changeSelectedAddress: (address: IAddress) => void;
  postShipping: (token: string, payload: INewShippingData) => void;
  getShippings: (
    token: string,
    page: number,
    limit: number,
    sort: string,
    order: string,
    search?: string,
  ) => void;
  setSelectedShippingId: (shippingId: string) => void;
  getShippingDetails: (token: string, shippingId: string) => void;
  getPromosData: (token: string) => void;
  setSelectedPromo: (promo: IPromosData) => void;
  resetPromo: () => void;
  checkReferal: (token: string, referalCode: string) => void;
  payShipping: (
    token: string,
    totalCost: number,
    shippingId: string,
    shippingName: string,
    promoId?: string,
    referal?: string,
  ) => void;
};

const useShippingBase = create<State & Actions>((set) => ({
  userAddresses: undefined,
  selectedAddress: undefined,
  shippingsData: undefined,
  selectedShippingId: undefined,
  shippingDetails: undefined,
  promosData: undefined,
  selectedPromo: undefined,
  appliedReferal: undefined,
  paymentDetail: undefined,
  pagination: undefined,
  payShipping: async (
    token: string,
    totalCost: number,
    shippingId: string,
    shippingName: string,
    promoId?: string,
    referal?: string,
  ) => {
    const { showLoading, hideLoading } = useLoading.getState();
    const { showModal3 } = useModal.getState();

    try {
      showLoading();
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          total_cost: totalCost,
          promo_id: promoId,
          referal: referal,
          shipping_id: shippingId,
          shipping_name: shippingName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        set(() => ({ paymentDetail: data.data }));
        toastifySuccess(data.message);
        showModal3();
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
  checkReferal: async (token: string, referalCode: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    const { userData } = useUser.getState();
    try {
      showLoading();
      const response = await fetch(`/api/referal?referal=${referalCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.user.fullname);
        if (data.user.email === userData?.email) {
          toastifyInfo(`Referal code belong to yourself`);
          set(() => ({ appliedReferal: undefined }));
        } else {
          toastifySuccess(`Referal code belong to ${data.user.fullname}`);
          set(() => ({ appliedReferal: referalCode }));
        }
        hideLoading();
      } else {
        hideLoading();
        const data = await response.json();
        console.log(data.error);
        toastifyError(data.error);
        set(() => ({ appliedReferal: undefined }));
      }
    } catch (error) {
      hideLoading();
      console.log(String(error));
      toastifyError(String(error));
      set(() => ({ appliedReferal: undefined }));
    }
  },
  resetPromo: () => {
    set(() => ({ selectedPromo: undefined }));
  },
  setSelectedPromo: async (promo: IPromosData) => {
    set(() => ({ selectedPromo: promo }));
  },
  getPromosData: async (token: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch(`/api/promos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        set(() => ({
          promosData: data,
        }));
        hideLoading();
      } else {
        hideLoading();
        const data = await response.json();
        console.log(data.error);
        toastifyError(data.error);
      }
    } catch (error) {
      hideLoading();
      console.log(String(error));
      toastifyError(String(error));
    }
  },
  getShippingDetails: async (token: string, shippingId: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch(
        `/api/shippingdetails?shippingid=${shippingId}`,
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
          shippingDetails: data,
        }));
        hideLoading();
      } else {
        hideLoading();
        const data = await response.json();
        console.log(data.error);
        toastifyError(data.error);
      }
    } catch (error) {
      hideLoading();
      console.log(String(error));
      toastifyError(String(error));
    }
  },
  setSelectedShippingId: (shippingId: string) => {
    set(() => ({ selectedShippingId: shippingId }));
  },
  getShippings: async (
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
        `/api/shippings?page=${page}&limit=${limit}&sort=${sort}&order=${order}${
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
          shippingsData: [...data.shippingList],
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
  postShipping: async (token: string, payload: INewShippingData) => {
    const { showLoading, hideLoading } = useLoading.getState();

    try {
      showLoading();
      const response = await fetch("/api/shippings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ newAddressPayload: payload }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        toastifySuccess(`New shipping added to your shipping list`);
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
  getUserAddresses: async (token: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch("/api/addresses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        set(() => ({
          userAddresses: [...data],
          selectedAddress: { ...data[0] },
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
  changeSelectedAddress: (address: IAddress) => {
    set(() => ({ selectedAddress: { ...address } }));
  },
}));

export const useShipping = createZusSelector(useShippingBase);
