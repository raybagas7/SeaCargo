export interface IPayment {
  id: string;
  userId: string;
  shipping_id: string;
  promo_id: string;
  shipping_name: string;
  base_cost: number;
  final_cost: number;
  date: number;
  discount?: number;
  max_discount?: number;
  promo_name?: string;
  referal?: string;
}

export interface IEarning {
  total_paid: number;
  total_unpaid: number;
  total_cancel: number;
  total_delivered: number;
  total_shipped: number;
  total_shippings: number;
  total_shipping_cost: number;
  total_shipping_paid: number;
  total_pending: number;
  total_insurance: number;
  total_gogreen: number;
  total_donation: number;
  total_topup: number;
  total_topup_amount: number;
  total_payment: number;
  total_payment_amount: number;
  total_cutted_amount: number;
  total_base_amount: number;
  total_final_cost: number;
}
