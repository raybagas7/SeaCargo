import { IPayment } from "@/interface/payments";
import { IShippingDataPayload } from "@/interface/shippings";
import { BASE_JSON_URL } from "@/utils/connection";
import axios from "axios";

const service = (() => {
  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const putAccessToken = (accessToken: string) => {
    return localStorage.setItem("accessToken", accessToken);
  };

  const postUserRegister = async (payload: any) => {
    try {
      const response = await axios.post(
        `${BASE_JSON_URL}/register`,
        payload,
      );

      const userData = response.data;
      return {
        error: false,
        data: userData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      console.log(error);

      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const postUserLogin = async (payload: any) => {
    try {
      const response = await axios.post(
        `${BASE_JSON_URL}/login`,
        payload,
      );

      const userData = response.data;
      return {
        error: false,
        data: userData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      console.log(error.response);

      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const postMakeWallet = async (payload: any) => {
    try {
      const response = await axios.post(
        `${BASE_JSON_URL}/wallets`,
        payload,
      );

      const userWallet = response.data;
      return {
        error: false,
        data: userWallet,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getUserData = async (id: string, token: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { id },
        },
      );

      const userData = response.data;
      return {
        error: false,
        data: userData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      // console.log(error.response);
      // console.log(error.response.statusText);

      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const updateUserData = async (id: string, token: string, payload: any) => {
    console.log(id);
    console.log(payload);
    console.log(token);

    try {
      const response = await axios.patch(
        `${BASE_JSON_URL}/660/users/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const userData = response.data;
      return {
        error: false,
        data: userData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      console.log(error.response);
      console.log(error.response.statusText);

      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getWalletUserData = async (id: string, token: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/wallets`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId: id },
        },
      );

      const walletData = response.data;
      return {
        error: false,
        data: walletData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      // console.log(error.response);
      // console.log(error.response.statusText);

      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const patchWallet = async (
    walletId: string,
    token: string,
    balance: number,
  ) => {
    try {
      console.log(walletId, balance, token);

      const response = await axios.patch(
        `${BASE_JSON_URL}/640/wallets/${walletId}`,
        { balance },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const userWallet = response.data;
      return {
        error: false,
        data: userWallet,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const postPromo = async (token: string, payload: any) => {
    console.log(payload);

    try {
      const response = await axios.post(
        `${BASE_JSON_URL}/660/promos`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const promoData = response.data;
      return {
        error: false,
        data: promoData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const patchPromo = async (promoId: string, token: string, count: number) => {
    try {
      const response = await axios.patch(
        `${BASE_JSON_URL}/660/promos/${promoId}`,
        { count },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const promoData = response.data;
      return {
        error: false,
        data: promoData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const patchShippingToPaid = async (shippingId: string, token: string) => {
    try {
      console.log(shippingId, token);

      const response = await axios.patch(
        `${BASE_JSON_URL}/640/shippings/${shippingId}`,
        { paid: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const shippingDetail = response.data;
      return {
        error: false,
        data: shippingDetail,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const patchShippingToCanceled = async (shippingId: string, token: string) => {
    try {
      console.log(shippingId, token);

      const response = await axios.patch(
        `${BASE_JSON_URL}/660/shippings/${shippingId}`,
        { cancel: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const shippingDetail = response.data;
      return {
        error: false,
        data: shippingDetail,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const patchShippingToShipped = async (shippingId: string, token: string) => {
    try {
      console.log(shippingId, token);

      const response = await axios.patch(
        `${BASE_JSON_URL}/660/shippings/${shippingId}`,
        { shipped: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const shippingDetail = response.data;
      return {
        error: false,
        data: shippingDetail,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const patchShippingToDelivered = async (
    shippingId: string,
    token: string,
  ) => {
    try {
      console.log(shippingId, token);

      const response = await axios.patch(
        `${BASE_JSON_URL}/660/shippings/${shippingId}`,
        { delivered: true, shipped: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const shippingDetail = response.data;
      return {
        error: false,
        data: shippingDetail,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const patchReferalWallet = async (
    walletId: string,
    token: string,
    balance: number,
  ) => {
    try {
      console.log(walletId, balance, token);

      const response = await axios.patch(
        `${BASE_JSON_URL}/660/wallets/${walletId}`,
        { balance },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const userWallet = response.data;
      return {
        error: false,
        data: userWallet,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const postTopUp = async (token: string, payload: any) => {
    try {
      const response = await axios.post(
        `${BASE_JSON_URL}/660/topups`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const topupData = response.data;
      return {
        error: false,
        data: topupData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getTopUpData = async (token: string, userId: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/topups`,
        {
          params: { owner: userId },
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const topupData = response.data;
      console.log("wallet data", topupData);
      return {
        error: false,
        data: topupData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getAllTopUp = async (token: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/topups`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const topupData = response.data;
      console.log("wallet data", topupData);
      return {
        error: false,
        data: topupData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getProvice = async () => {
    try {
      const response = await axios.get(
        `https://api.rajaongkir.com/starter/province`,
        {
          headers: {
            key: "4acc68474d7b20b55df2534dc61458d2",
          },
        },
      );

      const rajaongkirProvinces = response.data.rajaongkir.results;
      return {
        error: false,
        data: rajaongkirProvinces,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getCities = async (provinceCode: string) => {
    try {
      const response = await axios.get(
        `https://api.rajaongkir.com/starter/city`,
        {
          params: { province: provinceCode },
          headers: {
            key: "4acc68474d7b20b55df2534dc61458d2",
          },
        },
      );
      //4acc68474d7b20b55df2534dc61458d2

      const rajaongkirCities = response.data.rajaongkir.results;
      return {
        error: false,
        data: rajaongkirCities,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getCost = async (
    origin: string,
    destination: string,
    weight: string,
    courier: string,
  ) => {
    try {
      const bodyParameters = {
        key: "4acc68474d7b20b55df2534dc61458d2",
        origin,
        destination,
        weight,
        courier: courier,
      };
      const response = await axios.post(
        `https://api.rajaongkir.com/starter/cost`,
        bodyParameters,
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        },
      );

      const rajaongkirProvinces = response.data.rajaongkir.results[0];
      return {
        error: false,
        data: rajaongkirProvinces,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const postNewAddress = async (token: string, payload: any) => {
    try {
      const response = await axios.post(
        `${BASE_JSON_URL}/660/addresses`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const addressData = response.data;
      return {
        error: false,
        data: addressData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const patchAddress = async (
    token: string,
    payload: any,
    addressId: string,
  ) => {
    try {
      const response = await axios.patch(
        `${BASE_JSON_URL}/660/addresses/${addressId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const addressData = response.data;
      return {
        error: false,
        data: addressData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getUserAddresses = async (token: string, userId: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/addresses`,
        {
          params: { owner: userId },
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const userAddresses = response.data;
      return {
        error: false,
        data: userAddresses,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getAllUserAddresses = async (token: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/addresses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const userAddresses = response.data;
      return {
        error: false,
        data: userAddresses,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getAllUserAddressesPerPage = async (
    token: string,
    page: number,
    limit: number,
    sort: string,
    order: string,
    search?: string,
  ) => {
    try {
      const params: any = {
        _page: page,
        _limit: limit,
        _sort: sort,
        _order: order,
      };

      if (search) {
        params.q = search;
      }

      const response = await axios.get(
        `${BASE_JSON_URL}/660/addresses`,
        {
          params,
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const addressData = response.data;
      return {
        error: false,
        data: addressData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const postNewShipping = async (
    token: string,
    payload: IShippingDataPayload,
  ) => {
    try {
      const response = await axios.post(
        `${BASE_JSON_URL}/660/shippings`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const addressData = response.data;
      return {
        error: false,
        data: addressData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getUserShippings = async (
    token: string,
    userId: string,
    page: number,
    limit: number,
    sort: string,
    order: string,
    search?: string,
  ) => {
    const params: any = {
      userId,
      _page: page,
      _limit: limit,
      _sort: sort,
      _order: order,
    };

    if (search) {
      params.q = search;
    }

    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/shippings`,
        {
          params,
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const shippingsData = response.data;
      return {
        error: false,
        data: shippingsData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getUserPayments = async (
    token: string,
    userId: string,
    page: number,
    limit: number,
    sort: string,
    order: string,
    search?: string,
  ) => {
    const params: any = {
      userId,
      _page: page,
      _limit: limit,
      _sort: sort,
      _order: order,
    };

    if (search) {
      params.q = search;
    }

    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/payments`,
        {
          params,
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const paymentsData = response.data;
      return {
        error: false,
        data: paymentsData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getAllUserPayments = async (token: string, userId: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/payments`,
        {
          params: { userId },
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const paymentsData = response.data;
      return {
        error: false,
        data: paymentsData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getAllPayments = async (token: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/payments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const paymentsData = response.data;
      return {
        error: false,
        data: paymentsData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getAllUserShippings = async (token: string, userId: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/shippings`,
        {
          params: { userId },
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const shippingsData = response.data;
      return {
        error: false,
        data: shippingsData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getAdminDetailPayment = async (token: string, shippingId: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/payments`,
        {
          params: { shipping_id: shippingId },
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const shippingsData = response.data;
      return {
        error: false,
        data: shippingsData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getAllShippingsPerPage = async (
    token: string,
    page: number,
    limit: number,
    sort: string,
    order: string,
    search?: string,
  ) => {
    try {
      const params: any = {
        _page: page,
        _limit: limit,
        _sort: sort,
        _order: order,
      };

      if (search) {
        params.q = search;
      }

      const response = await axios.get(
        `${BASE_JSON_URL}/660/shippings`,
        {
          params,
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const shippingsData = response.data;
      return {
        error: false,
        data: shippingsData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getAllShippings = async (token: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/shippings`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const shippingsData = response.data;
      return {
        error: false,
        data: shippingsData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getAllUsers = async (token: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const usersData = response.data;
      return {
        error: false,
        data: usersData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getShippingDetail = async (token: string, shippingCode: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/shippings/${shippingCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const shippingDetail = response.data;
      console.log(shippingDetail);

      return {
        error: false,
        data: shippingDetail,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getPromos = async (token: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/promos`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const promos = response.data;

      return {
        error: false,
        data: promos,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getReferalData = async (token: string, referalCode: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/users`,
        {
          params: { referal: referalCode },
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const referalData = response.data;
      console.log(referalData);

      return {
        error: false,
        data: referalData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const getSelectedPromo = async (token: string, promoId: string) => {
    try {
      const response = await axios.get(
        `${BASE_JSON_URL}/660/promos/${promoId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const promo = response.data;

      return {
        error: false,
        data: promo,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  const postNewPayment = async (token: string, payload: IPayment) => {
    try {
      const response = await axios.post(
        `${BASE_JSON_URL}/660/payments`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const paymentData = response.data;
      return {
        error: false,
        data: paymentData,
        message: response.statusText,
        code: response.status,
      };
    } catch (error: any) {
      return {
        error: true,
        data: null,
        message: error.response.data,
        code: error.response.status,
      };
    }
  };

  return {
    postNewShipping,
    getAccessToken,
    putAccessToken,
    postUserRegister,
    postUserLogin,
    postMakeWallet,
    getUserData,
    updateUserData,
    getWalletUserData,
    patchWallet,
    postPromo,
    patchPromo,
    patchShippingToPaid,
    patchShippingToCanceled,
    patchShippingToDelivered,
    patchShippingToShipped,
    postTopUp,
    getTopUpData,
    getProvice,
    getCities,
    postNewAddress,
    patchAddress,
    getUserAddresses,
    getUserShippings,
    getCost,
    getShippingDetail,
    getPromos,
    getReferalData,
    getSelectedPromo,
    patchReferalWallet,
    postNewPayment,
    getAllShippings,
    getAllShippingsPerPage,
    getAllUsers,
    getAdminDetailPayment,
    getAllUserShippings,
    getUserPayments,
    getAllUserPayments,
    getAllUserAddresses,
    getAllUserAddressesPerPage,
    getAllPayments,
    getAllTopUp,
  };
})();

export default service;
