import { create } from "zustand";
import { createZusSelector } from "../createZusSelector";
import { ICity, IProvice } from "@/interface/rajaongkir";
import { useLoading } from "../loading/useLoading";
import { toastifyError } from "@/utils/toastifyError";
import { stringify } from "querystring";

type State = {
  provinces: IProvice[] | undefined;
  cities: ICity[] | undefined;
  provincesEdit: IProvice[] | undefined;
  citiesEdit: ICity[] | undefined;
};

type Actions = {
  getProvince: () => void;
  getCities: (provinceCode: string) => void;
  getProvinceEdit: () => void;
  getCitiesEdit: (provinceCode: string) => void;
  resetEdit: () => void;
};

const useRajaOngkirBase = create<State & Actions>((set) => ({
  provinces: undefined,
  cities: undefined,
  provincesEdit: undefined,
  citiesEdit: undefined,
  resetEdit: () => {
    set(() => ({ provincesEdit: undefined, citiesEdit: undefined }));
  },
  getCities: async (provinceCode: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch(
        `/api/rajaongkircities?province=${provinceCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const data = await response.json();

        set(() => ({
          cities: data,
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
  getProvince: async () => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch("/api/rajaongkirprov", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();

        set(() => ({
          provinces: data,
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
  getCitiesEdit: async (provinceCode: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch(
        `/api/rajaongkircities?province=${provinceCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const data = await response.json();

        set(() => ({
          citiesEdit: data,
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
  getProvinceEdit: async () => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch("/api/rajaongkirprov", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();

        set(() => ({
          provincesEdit: data,
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

export const useRajaOngkir = createZusSelector(useRajaOngkirBase);
