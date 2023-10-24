import { create } from "zustand";
import { createZusSelector } from "../createZusSelector";
import { toastifyError } from "@/utils/toastifyError";
import { useLoading } from "../loading/useLoading";
import { IPayment } from "@/interface/payments";
import { IPaginationResponse } from "@/interface/pagination";

type State = {
  userPayments: IPayment[] | undefined;
  paymentDetail: IPayment | undefined;
  pagination: IPaginationResponse | undefined;
};

type Actions = {
  getPayments: (
    token: string,
    page: number,
    limit: number,
    sort: string,
    order: string,
    search?: string,
  ) => void;
};

const usePaymentBase = create<State & Actions>((set) => ({
  userPayments: undefined,
  paymentDetail: undefined,
  pagination: undefined,
  getPayments: async (
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
        `/api/userpayments?page=${page}&limit=${limit}&sort=${sort}&order=${order}${
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
          userPayments: [...data.paymentList],
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

export const usePayment = createZusSelector(usePaymentBase);
