export interface IItemProperties {
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  category: string;
  description: string;
  others: string;
  insurance: boolean;
  gogreen: boolean;
  donation: boolean;
}

export interface IShippingOrigin {
  province_id: string;
  province: string;
  city_id: string;
  city: string;
  postal_code: string;
  address: string;
  detail_address: string;
}

export interface INewShippingData {
  name: string;
  from: IShippingOrigin;
  to: IShippingOrigin;
  item_props: IItemProperties;
}

export interface INewAddressPayload {
  newAddressPayload: INewShippingData;
}

export interface IShippingDataPayload {
  name: string;
  id: string;
  userId: string;
  from: IShippingOrigin;
  to: IShippingOrigin;
  item_props: IItemProperties;
  createdAt: number;
  updatedAt: number;
  delivered: boolean;
  paid: boolean;
  shipped: boolean;
  cancel: boolean;
  courier: string;
  service: string;
  etd: string;
  cost: number;
  totalCost: number;
}

export interface ICombinedShippingWithUserData {
  name: string;
  id: string;
  userId: string;
  from: IShippingOrigin;
  to: IShippingOrigin;
  item_props: IItemProperties;
  createdAt: number;
  updatedAt: number;
  delivered: boolean;
  paid: boolean;
  shipped: boolean;
  cancel: boolean;
  courier: string;
  service: string;
  etd: string;
  cost: number;
  totalCost: number;
  owner: string;
  email: string;
  photo: string;
}

export interface IReview {
  id: string;
  userId: string;
  shipping_id: string;
  review: string;
  createdAt: number;
  updatedAt: number;
}

export interface IPromosData {
  id: string;
  name: string;
  value: number;
  max: number;
  expired: number;
  description: string;
  count: number;
}
