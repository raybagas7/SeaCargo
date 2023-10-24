import { create } from "zustand";
import { createZusSelector } from "../createZusSelector";
import { toastifyError } from "@/utils/toastifyError";
import { useLoading } from "../loading/useLoading";
import { IEarning } from "@/interface/payments";

type State = {
  earningSeaCargo: IEarning | undefined;
};

type Actions = {
  getEarning: (token: string) => void;
};

const useAdminEarningsBase = create<State & Actions>((set) => ({
  earningSeaCargo: undefined,
  getEarning: async (token: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch(`/api/earnings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        set(() => ({
          earningSeaCargo: data,
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

export const useAdminEarnings = createZusSelector(useAdminEarningsBase);
