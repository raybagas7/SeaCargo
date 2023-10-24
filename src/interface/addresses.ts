export interface IAddress {
  owner: string;
  id: string;
  address: string;
  province: string;
  province_id: string;
  city: string;
  city_id: string;
  postal_code: string;
  detail_address: string;
  createdAt: number;
  updatedAt: number;
}

export interface IAddressInput {
  provCode: string;
  province: string;
  cityCode: string;
  city: string;
  postalCode: string;
  address: string;
  detailAddress: string;
}

export interface ICombinedAddressWithUserData extends IAddress {
  owner: string;
  email: string;
  photo: string;
}
