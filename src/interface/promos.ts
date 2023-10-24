export interface IPromos {
  id: string;
  name: string;
  value: number;
  max: number;
  expired: number;
  description: string;
  count: number;
}

export interface IPromosForm {
  name: string;
  value: number;
  max: number;
  expired: number;
  description: string;
  count: number;
}
