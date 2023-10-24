export interface IUserRegister {
  email: string | undefined;
  password: string | undefined;
  fullname: string | undefined;
  phone: string | undefined;
}

export interface IUserLogin {
  email: string | undefined;
  password: string | undefined;
}

export interface IResponseApi<T> {
  error?: boolean;
  data?: T | null;
  message?: string;
  code?: number;
}

export interface IAdminData {
  email: string;
  fullname: string;
  phone: number;
  photo: string;
  referal: string;
  usereferal: string;
  role: string;
}

export interface IUserData {
  email: string;
  fullname: string;
  phone: number;
  photo: string;
  referal: string;
  usereferal: string;
  role: string;
}

export interface IUserDataResponse {
  email: string;
  password: string;
  fullname: string;
  phone: number;
  photo: string;
  referal: string;
  usereferal: string;
  role: string;
}

export interface IReferalDataResponse {
  email: string;
  password: string;
  fullname: string;
  phone: number;
  photo: string;
  referal: string;
  usereferal: string;
  role: string;
  id: string;
}

export interface IAllUserDataResponse {
  email: string;
  password: string;
  fullname: string;
  phone: number;
  photo: string;
  referal: string;
  usereferal: string;
  role: string;
  id: string;
}

export interface IAdminDataEdit {
  email?: string | undefined;
  fullname?: string | undefined;
  phone?: number | undefined;
}

export interface IUserDataEdit {
  email?: string | undefined;
  fullname?: string | undefined;
  phone?: number | undefined;
}

export interface IWalletData {
  balance: number;
  userId: string;
  id: string;
}
