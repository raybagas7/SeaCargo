import { create } from "zustand";
import { createZusSelector } from "../createZusSelector";
import { IUserDataEdit, IUserData, IWalletData } from "@/interface/users";
import { toastifySuccess } from "@/utils/toastifySuccess";
import { toastifyError } from "@/utils/toastifyError";
import { useLoading } from "../loading/useLoading";
import { postImage } from "@/utils/cloudinaryPost";
import { ITopUp } from "@/interface/wallet";
import { IAddress, IAddressInput } from "@/interface/addresses";

type State = {
  userData: IUserData | undefined;
  editData: IUserData | undefined;
  edit: boolean;
  editImage: boolean;
  walletData: IWalletData | undefined;
  topUpData: ITopUp[] | undefined;
  addressData: IAddress[] | undefined;
};

type Actions = {
  setUserData: (userDataPayload: IUserData) => void;
  updateImage: (token: string, imgFile: File) => void;
  getUserData: (token: string) => void;
  getWalletData: (token: string) => void;
  toggleEdit: () => void;
  toggleEditImg: () => void;
  updateUserData: (token: string, editedData: IUserDataEdit) => void;
  resetState: () => void;
  updateWalletBalance: (token: string, balance: number) => void;
  postTopUp: (token: string, balance: number) => void;
  getTopUp: (token: string) => void;
  postAddress: (token: string, payload: IAddressInput) => void;
  editAddress: (
    token: string,
    payload: IAddressInput,
    addressId: string,
  ) => void;
};

const useUserBase = create<State & Actions>((set) => ({
  userData: undefined,
  editData: undefined,
  edit: false,
  editImage: false,
  walletData: undefined,
  topUpData: undefined,
  addressData: undefined,
  editAddress: async (
    token: string,
    payload: IAddressInput,
    addressId: string,
  ) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch("/api/addresses", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          address_id: addressId,
          address: payload.address,
          province: payload.province,
          province_id: payload.provCode,
          city: payload.city,
          city_id: payload.cityCode,
          postal_code: payload.postalCode,
          detail_address: payload.detailAddress,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        toastifySuccess(`Your Address Updated!`);
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
  postAddress: async (token: string, payload: IAddressInput) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          address: payload.address,
          province: payload.province,
          province_id: payload.provCode,
          city: payload.city,
          city_id: payload.cityCode,
          postal_code: payload.postalCode,
          detail_address: payload.detailAddress,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        set((state) => ({
          addressData: state.addressData
            ? [...state.addressData, data]
            : [data],
          edit: false,
        }));

        toastifySuccess(`New address added to your address list`);
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
  getTopUp: async (token: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch("/api/topup", {
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
          topUpData: [...data],
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
  toggleEditImg: () => {
    set((state) => ({ editImage: !state.editImage }));
  },
  setUserData: (userDataPayload: IUserData) =>
    set(() => ({ adminData: userDataPayload, editData: userDataPayload })),
  updateImage: async (token: string, imgFile: File) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const imgUrl = await postImage(imgFile);
      const response = await fetch("/api/userdata", {
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
          userData: {
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
  getWalletData: async (token: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch("/api/wallet", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        set(() => ({
          walletData: {
            ...data.wallet,
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
  getUserData: async (token: string) => {
    const { showLoading, hideLoading } = useLoading.getState();
    try {
      showLoading();
      const response = await fetch("/api/userdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        set(() => ({
          userData: {
            ...data.user,
          },
        }));
        hideLoading();
      } else {
        hideLoading();
        const data = await response.json();
        console.log(data);

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
  updateUserData: async (token: string, editedData: IUserDataEdit) => {
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
          userData: {
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
    set({ userData: undefined });
  },
  updateWalletBalance: async (token: string, balance: number) => {
    const { showLoading, hideLoading } = useLoading.getState();
    const { walletData } = useUser.getState();
    try {
      showLoading();
      const response = await fetch("/api/wallet", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          walletId: walletData?.id,
          currentBalance: walletData?.balance,
          balance: balance,
        }),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data.wallet);

        console.log(data.message);
        toastifySuccess(data.message);
        set(() => ({
          walletData: {
            ...data.wallet,
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
  postTopUp: async (token: string, balance: number) => {
    const { showLoading, hideLoading } = useLoading.getState();
    const { walletData } = useUser.getState();
    try {
      showLoading();
      const response = await fetch("/api/topup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          walletId: walletData?.id,
          balance: balance,
        }),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data.wallet);

        set((state) => ({
          topUpData: state.topUpData
            ? [...state.topUpData, data.wallet]
            : [data.wallet],
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
}));

export const useUser = createZusSelector(useUserBase);
