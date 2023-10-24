import { create } from "zustand";
import { createZusSelector } from "../createZusSelector";
import { IAdminData, IAdminDataEdit } from "@/interface/users";
import { toastifySuccess } from "@/utils/toastifySuccess";
import { toastifyError } from "@/utils/toastifyError";
import { useLoading } from "../loading/useLoading";
import { postImage } from "@/utils/cloudinaryPost";
import { IPromos, IPromosForm } from "@/interface/promos";

type State = {
  adminData: IAdminData | undefined;
  editData: IAdminData | undefined;
  edit: boolean;
  editImage: boolean;
};

type Actions = {
  setAdminData: (adminDataPayload: IAdminData) => void;
  updateImage: (token: string, imgFile: File) => void;
  getAdminData: (token: string) => void;
  toggleEdit: () => void;
  toggleEditImg: () => void;
  updateAdminData: (token: string, editedData: IAdminDataEdit) => void;
  resetState: () => void;
  createPromo: (token: string, promoData: IPromosForm) => void;
};

const useAdminBase = create<State & Actions>((set) => ({
  adminData: undefined,
  editData: undefined,
  edit: false,
  editImage: false,
  createPromo: async (token: string, promoData: IPromosForm) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch("/api/promos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          promo_data: promoData,
        }),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toastifySuccess(
          `New Promo ${data.name}, Discount for ${data.value}% has been added`,
        );
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
  toggleEditImg: () => {
    set((state) => ({ editImage: !state.editImage }));
  },
  setAdminData: (adminDataPayload: IAdminData) =>
    set(() => ({ adminData: adminDataPayload, editData: adminDataPayload })),
  updateImage: async (token: string, imgFile: File) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const imgUrl = await postImage(imgFile);
      const response = await fetch("/api/admindata", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ photo: imgUrl }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.user);

        toastifySuccess("Image Updated");
        set(() => ({
          adminData: {
            ...data.user,
          },
          edit: false,
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
  getAdminData: async (token: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch("/api/admindata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        set(() => ({
          adminData: {
            ...data.user,
          },
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
  toggleEdit: () => {
    set((state) => ({ edit: !state.edit }));
  },
  updateAdminData: async (token: string, editedData: IAdminDataEdit) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch("/api/userdata", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ ...editedData }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.user);

        console.log(data.message);
        toastifySuccess(data.message);
        set(() => ({
          adminData: {
            ...data.user,
          },
          edit: false,
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
  resetState: () => {
    set({ adminData: undefined });
  },
}));

export const useAdmin = createZusSelector(useAdminBase);
