import { create } from "zustand";
import { createZusSelector } from "../createZusSelector";
import { toastifyError } from "@/utils/toastifyError";
import { useLoading } from "../loading/useLoading";
import { ICombinedShippingWithUserData, IReview } from "@/interface/shippings";
import { IPagination } from "@/interface/allshipping";
import { IPayment } from "@/interface/payments";
import { toastifySuccess } from "@/utils/toastifySuccess";

type State = {
  allShippingsData: ICombinedShippingWithUserData[] | undefined;
  selectedShippingId: string | undefined;
  shippingDetails: ICombinedShippingWithUserData | undefined;
  pagination: IPagination | undefined;
  paymentDetail: IPayment | undefined;
  shippingReview: IReview | undefined;
};

type Actions = {
  getAllShippings: (
    token: string,
    page: number,
    limit: number,
    sort: string,
    order: string,
    search?: string,
  ) => void;
  setSelectedShippingId: (shippingId: string) => void;
  getShippingDetails: (token: string, shippingId: string) => void;
  getPaymentDetails: (token: string, shippingId: string) => void;
  resetPaymentDetails: () => void;
  changeShippingStatus: (
    token: string,
    shippingId: string,
    cancel?: boolean,
    shipped?: boolean,
    delivered?: boolean,
  ) => void;
  getAdminReview: (token: string, shipping_id: string) => void;
};

const useAdminShippingBase = create<State & Actions>((set) => ({
  allShippingsData: undefined,
  selectedShippingId: undefined,
  shippingDetails: undefined,
  pagination: undefined,
  paymentDetail: undefined,
  shippingReview: undefined,
  getAdminReview: async (token: string, shipping_id: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch(`/api/review?shipping_id=${shipping_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        set(() => ({
          shippingReview: data[0],
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
  changeShippingStatus: async (
    token: string,
    shippingId: string,
    cancel?: boolean,
    shipped?: boolean,
    delivered?: boolean,
  ) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch(`/api/allshippings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          shipping_id: shippingId,
          cancel,
          shipped,
          delivered,
        }),
      });
      if (response.ok) {
        const data = await response.json();

        toastifySuccess(data.message);
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
  resetPaymentDetails: () => {
    set(() => ({ paymentDetail: undefined }));
  },
  getPaymentDetails: async (token: string, shippingId: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch(
        `/api/adminpayments?shipping_id=${shippingId}`,
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
          paymentDetail: data[0],
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
        toastifyError(data.error);
      }
    } catch (error) {
      hideLoading();
      toastifyError(String(error));
    }
  },
  setSelectedShippingId: (shippingId: string) => {
    set(() => ({ selectedShippingId: shippingId }));
  },
  getAllShippings: async (
    token: string,
    page: number = 1,
    limit: number = 7,
    sort: string = "createdAt",
    order: string = "asc",
    search: string = "",
  ) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch(
        `/api/allshippings?page=${page}&limit=${limit}&sort=${sort}&order=${order}${
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
          allShippingsData: [...data.shippingList],
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
}));

export const useAdminShipping = createZusSelector(useAdminShippingBase);
